import { Extension, Range } from "@tiptap/core";
import { Node as PMNode } from "@tiptap/pm/model";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

/**
 * Transcript keyword search.
 *
 * The transcript renders every word as its own inline node, each holding a text
 * node that already carries a trailing space (see getParsedContent). The stock
 * `@memfoldai/tiptap-search-and-replace` starts a fresh text buffer at every
 * non-text node, so each buffer ends up being a single word: any query that
 * contains a space then matches nothing ("mi piace" -> 0 results, while "mi"
 * and "piace" on their own -> results).
 *
 * This extension rebuilds one continuous string per textblock, paired with a
 * char -> ProseMirror-position map, matches against that string and maps the
 * ranges back. Matches never cross a block boundary. Whitespace inside the
 * query is matched as "one or more whitespace", so "mi piace" also matches a
 * double space or a line break between the two words.
 *
 * It also exposes the current match index and total count (via storage) plus
 * next/previous commands, so the UI can show "3/12" and let the user jump
 * between matches.
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
}

const processSearches = (
  doc: PMNode,
  regex: RegExp | null,
  searchResultClass: string,
  resultIndex: number,
): ProcessedSearches => {
  if (!regex) {
    return { decorationsToReturn: DecorationSet.empty, results: [] };
  }

  const results: Range[] = [];

  doc.descendants((block, blockPos) => {
    if (!block.isTextblock) return true;

    let text = "";
    const posMap: number[] = []; // posMap[i] = PM position before char i

    block.descendants((child, childPos) => {
      if (child.isText && child.text) {
        const base = blockPos + 1 + childPos;
        for (let i = 0; i < child.text.length; i += 1) {
          text += child.text[i];
          posMap.push(base + i);
        }
      }
      return true;
    });

    if (text) {
      regex.lastIndex = 0;
      let match = regex.exec(text);
      while (match !== null) {
        const matched = match[0];
        if (matched && matched.trim()) {
          const from = posMap[match.index];
          const to = posMap[match.index + matched.length - 1];
          if (from !== undefined && to !== undefined) {
            results.push({ from, to: to + 1 });
          }
        }
        // guard against zero-length matches locking the loop
        if (regex.lastIndex === match.index) regex.lastIndex += 1;
        match = regex.exec(text);
      }
    }

    return false; // a match never spans across blocks
  });

  const safeIndex =
    results.length === 0
      ? 0
      : ((resultIndex % results.length) + results.length) % results.length;

  const decorations = results.map((range, i) =>
    Decoration.inline(range.from, range.to, {
      class:
        i === safeIndex
          ? `${searchResultClass} ${searchResultClass}-current`
          : searchResultClass,
    }),
  );

  return {
    decorationsToReturn: DecorationSet.create(doc, decorations),
    results,
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
        mutate(editor.storage.searchAndReplace as SearchStorage);
        // Setting storage does not create a transaction on its own; dispatch an
        // empty one so the decoration plugin recomputes right away.
        if (dispatch) dispatch(tr);
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

            const { decorationsToReturn, results } = processSearches(
              tr.doc,
              buildRegex(storage.searchTerm),
              searchResultClass,
              storage.resultIndex,
            );

            storage.results = results;
            if (storage.resultIndex >= results.length) {
              storage.resultIndex = 0;
              storage.lastIndex = 0;
            }

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
