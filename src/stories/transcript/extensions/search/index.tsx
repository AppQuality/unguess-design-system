import { Extension, Range } from "@tiptap/core";
import { Node as PMNode } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

/**
 * Ricerca di parole chiave multi-parola per l'editor del transcript.
 *
 * Le parole sono nodi inline separati, quindi la ricerca ricostruisce una
 * stringa per ogni textblock con una mappa carattere -> posizione nel
 * documento ProseMirror ("@tiptap/pm/model") e cerca i match su quella stringa. Gli spazi nella
 * query fanno match con uno o più caratteri di spaziatura; i match non
 * attraversano mai un confine tra blocchi.
 *
 * Indice/conteggio dei match vivono nello storage, con comandi next/previous
 * per spostarsi tra i risultati.
 */

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    transcriptSearch: {
      setSearchTerm: (searchTerm: string) => ReturnType;
      resetSearchIndex: () => ReturnType;
      nextSearchResult: () => ReturnType;
      previousSearchResult: () => ReturnType;
    };
  }
}

export interface SearchStorage {
  searchTerm: string;
  results: Range[];
  resultIndex: number;
  // internal: last inputs the decoration set was computed for
  lastTerm: string;
  lastIndex: number;
}

declare module "@tiptap/core" {
  interface Storage {
    searchAndReplace: SearchStorage;
  }
}

export interface SearchOptions {
  searchResultClass: string;
}

const buildRegex = (term: string): RegExp | null => {
  const trimmed = term.trim();
  if (!trimmed) return null;

  const escaped = trimmed
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");

  try {
    return new RegExp(escaped, "gui");
  } catch {
    return null;
  }
};

interface ProcessedSearches {
  decorationsToReturn: DecorationSet;
  results: Range[];
  resultIndex: number;
}

const processSearches = (
  doc: PMNode,
  searchRegex: RegExp | null,
  searchResultClass: string,
  requestedIndex: number,
): ProcessedSearches => {
  if (!searchRegex) {
    return {
      decorationsToReturn: DecorationSet.empty,
      results: [],
      resultIndex: 0,
    };
  }

  const matches: Range[] = [];

  // Ogni textblock viene scansionato come un'unica stringa, perché un match
  // può estendersi su più nodi inline (es. parole separate).
  doc.descendants((textBlock, blockStartPos) => {
    if (!textBlock.isTextblock) return true;

    let blockText = "";
    // charToPos[i] = posizione nel documento ProseMirror di blockText[i]
    const charToPos: number[] = [];

    // per ogni nodo di testo, accumula i suoi caratteri in blockText e
    // registra in charToPos la posizione ProseMirror di ciascun carattere
    textBlock.descendants((node, nodeOffset) => {
      if (node.isText && node.text) {
        const nodeStartPos = blockStartPos + 1 + nodeOffset;
        for (let i = 0; i < node.text.length; i += 1) {
          blockText += node.text[i];
          charToPos.push(nodeStartPos + i);
        }
      }
      return true;
    });

    // esegue la regex su blockText e converte ogni match trovato in un
    // range di posizioni ProseMirror tramite charToPos
    if (blockText) {
      searchRegex.lastIndex = 0;
      let match = searchRegex.exec(blockText);

      let iterations = 0;
      const maxIterations = blockText.length + 1;
      while (match !== null && iterations < maxIterations) {
        iterations++;
        const matchedText = match[0];
        if (matchedText && matchedText.trim()) {
          const from = charToPos[match.index];
          const to = charToPos[match.index + matchedText.length - 1];
          if (from !== undefined && to !== undefined) {
            matches.push({ from, to: to + 1 });
          }
        }
        // evita un loop infinito sui match di lunghezza zero
        if (searchRegex.lastIndex === match.index) searchRegex.lastIndex += 1;
        match = searchRegex.exec(blockText);
      }
    }

    return false; // un match non si estende mai su più blocchi
  });

  // normalizza/avvolge l'indice richiesto in una posizione di match valida
  const currentIndex =
    matches.length === 0
      ? 0
      : ((requestedIndex % matches.length) + matches.length) % matches.length;

  const decorations = matches.map((range, i) =>
    Decoration.inline(range.from, range.to, {
      class:
        i === currentIndex
          ? `${searchResultClass} ${searchResultClass}-current`
          : searchResultClass,
    }),
  );

  return {
    decorationsToReturn: DecorationSet.create(doc, decorations),
    results: matches,
    resultIndex: currentIndex,
  };
};

export const transcriptSearchPluginKey = new PluginKey("transcriptSearch");

export const Search = Extension.create<SearchOptions, SearchStorage>({
  name: "searchAndReplace",

  addOptions() {
    return {
      searchResultClass: "search-result",
    };
  },

  addStorage() {
    return {
      searchTerm: "",
      results: [],
      resultIndex: 0,
      lastTerm: "",
      lastIndex: 0,
    };
  },

  addCommands() {
    const bump =
      (mutate: (storage: SearchStorage) => void) =>
      ({ editor, tr, dispatch }: { editor: any; tr: any; dispatch?: any }) => {
        if (!dispatch) return true;
        mutate(editor.storage.searchAndReplace as SearchStorage);
        dispatch(tr);
        return true;
      };

    return {
      setSearchTerm: (searchTerm: string) =>
        bump((storage) => {
          storage.searchTerm = searchTerm;
          storage.resultIndex = 0;
        }),
      resetSearchIndex: () =>
        bump((storage) => {
          storage.resultIndex = 0;
        }),
      nextSearchResult: () =>
        bump((storage) => {
          if (!storage.results.length) return;
          storage.resultIndex =
            (storage.resultIndex + 1) % storage.results.length;
        }),
      previousSearchResult: () =>
        bump((storage) => {
          if (!storage.results.length) return;
          storage.resultIndex =
            (storage.resultIndex - 1 + storage.results.length) %
            storage.results.length;
        }),
    };
  },

  addProseMirrorPlugins() {
    const { editor } = this;
    const { searchResultClass } = this.options;

    return [
      new Plugin({
        key: transcriptSearchPluginKey,
        state: {
          init: () => DecorationSet.empty,
          apply(tr, oldDecorations) {
            const storage = editor.storage.searchAndReplace;

            const needsRecompute =
              tr.docChanged ||
              storage.searchTerm !== storage.lastTerm ||
              storage.resultIndex !== storage.lastIndex;

            if (!needsRecompute) {
              return oldDecorations.map(tr.mapping, tr.doc);
            }

            storage.lastTerm = storage.searchTerm;
            storage.lastIndex = storage.resultIndex;

            const { decorationsToReturn, results, resultIndex } =
              processSearches(
                tr.doc,
                buildRegex(storage.searchTerm),
                searchResultClass,
                storage.resultIndex,
              );

            storage.results = results;
            storage.resultIndex = resultIndex;
            storage.lastIndex = resultIndex;

            return decorationsToReturn;
          },
        },
        props: {
          decorations(state) {
            return this.getState(state);
          },
        },
      }),
    ];
  },
});

export default Search;
