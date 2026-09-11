import { Editor, useEditorState } from "@tiptap/react";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-stroke.svg";
import useDebounce from "../../hooks/useDebounce";
import { MediaInput } from "../forms/mediaInput";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const MatchesLabel = styled.span`
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.grey[700]};
  font-size: ${({ theme }) => theme.fontSizes.md};

  b {
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

const Search = ({
  editor,
  placeholder,
  matchesLabel = "matches",
}: {
  editor: Editor;
  placeholder?: string;
  matchesLabel?: string;
}) => {
  const [search, setSearch] = useState("");
  const debouncedValue = useDebounce(search, 300);

  const setSearchTerm = useCallback(
    (term: string) => {
      editor.commands.setSearchTerm(term);
    },
    [editor],
  );

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  const total = useEditorState({
    editor,
    selector: ({ editor: e }) =>
      e.storage.searchAndReplace?.results.length ?? 0,
  });

  const hasQuery = debouncedValue.trim().length > 0;

  // Enter scrolls to the first match, then advances to the next on every
  // further press, instead of jumping the page while the user is typing.
  const hasNavigatedRef = useRef(false);

  useEffect(() => {
    hasNavigatedRef.current = false;
  }, [debouncedValue]);

  const scrollToCurrentMatch = useCallback(() => {
    const current = editor.view.dom.querySelector<HTMLElement>(
      ".search-result-current",
    );
    current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [editor]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter" || !hasQuery || !total) return;
      e.preventDefault();
      if (hasNavigatedRef.current) {
        editor.commands.nextSearchResult();
      } else {
        hasNavigatedRef.current = true;
      }
      scrollToCurrentMatch();
    },
    [editor, hasQuery, total, scrollToCurrentMatch],
  );

  return (
    <Wrapper>
      <MediaInput
        isCompact
        placeholder={placeholder ?? "Search transcript... press ⏎"}
        type="text"
        start={<SearchIcon />}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      {hasQuery ? (
        <MatchesLabel>
          <b>{total}</b> {matchesLabel}
        </MatchesLabel>
      ) : null}
    </Wrapper>
  );
};

const SearchStyle = css`
  .search-result {
    background-color: rgba(255, 217, 0, 0.5);

    &-current {
      background-color: rgba(13, 255, 0, 0.5);
    }
  }
`;

Search.Style = SearchStyle;

export { Search };
