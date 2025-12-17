import { Editor } from "@tiptap/react";
import { useCallback, useEffect, useState } from "react";
import { css } from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/icons/search-stroke.svg";
import useDebounce from "../../hooks/useDebounce";
import { MediaInput } from "../forms/mediaInput";

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
    [editor]
  );

  useEffect(() => {
    setSearchTerm(debouncedValue);
  }, [debouncedValue, setSearchTerm]);

  return (
    <>
      <MediaInput
        isCompact
        placeholder={placeholder ?? "Search"}
        type="text"
        start={<SearchIcon />}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </>
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
