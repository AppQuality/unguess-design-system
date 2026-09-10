import { Editor, useEditorState } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as ChevronDownIcon } from "../../assets/icons/chevron-down-stroke.svg";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-stroke.svg";
import useDebounce from "../../hooks/useDebounce";
import { MediaInput } from "../forms/mediaInput";

const Nav = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.grey[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Count = styled.span`
  min-width: 2.5em;
  text-align: right;
  font-variant-numeric: tabular-nums;
`;

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  line-height: 0;

  svg {
    width: 14px;
    height: 14px;
  }

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.palette.grey[800]};
  }
`;

const PrevButton = styled(NavButton)`
  svg {
    transform: rotate(180deg);
  }
`;

const Search = ({
  editor,
  placeholder,
}: {
  editor: Editor;
  placeholder?: string;
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

  const { total, index } = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      total: e.storage.searchAndReplace?.results.length ?? 0,
      index: e.storage.searchAndReplace?.resultIndex ?? 0,
    }),
  });

  // Keep the current match in view as the user navigates or refines the query.
  useEffect(() => {
    if (!total) return;
    const current = editor.view.dom.querySelector<HTMLElement>(
      ".search-result-current",
    );
    current?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [editor, total, index, debouncedValue]);

  const hasQuery = debouncedValue.trim().length > 0;

  return (
    <MediaInput
      isCompact
      placeholder={placeholder ?? "Search"}
      type="text"
      start={<SearchIcon />}
      end={
        hasQuery ? (
          <Nav>
            <Count>{total ? `${index + 1}/${total}` : "0/0"}</Count>
            <PrevButton
              type="button"
              aria-label="Previous match"
              disabled={total < 2}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.commands.previousSearchResult()}
            >
              <ChevronDownIcon />
            </PrevButton>
            <NavButton
              type="button"
              aria-label="Next match"
              disabled={total < 2}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => editor.commands.nextSearchResult()}
            >
              <ChevronDownIcon />
            </NavButton>
          </Nav>
        ) : undefined
      }
      onChange={(e) => {
        setSearch(e.target.value);
      }}
    />
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
