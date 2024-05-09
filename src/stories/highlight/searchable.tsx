import styled from "styled-components";
import { useHighlightContext } from "./highlightContext";


const StyledSearchWord = styled.span`
background-color: ${({ theme }) => theme.palette.product.talk};
color: ${({ theme }) => theme.palette.grey[700]};`;
export const Searchable = ({
  start,
  text,
}: {
  start: number;
  text: string;
}) => {
  const { searchTerm } = useHighlightContext();

  if (searchTerm) {
    const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === searchTerm.toLowerCase() ? (
            <StyledSearchWord key={index}>{part}</StyledSearchWord>
          ) : (
            <>{part}</>
          )
        )}
      </>
    );
  }

  return <>{text}</>;
};
