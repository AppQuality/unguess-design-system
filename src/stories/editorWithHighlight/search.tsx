import { Editor } from "@tiptap/react";
import { useState } from "react";
import { css } from "styled-components";

const Search = ({ editor }: { editor: Editor }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <input
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button
        onClick={() => {
          editor.commands.setSearchTerm(search);
        }}
      >
        Search
      </button>
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
