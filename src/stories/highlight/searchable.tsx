import { useHighlightContext } from "./highlightContext";

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
            <mark key={index}>{part}</mark>
          ) : (
            <>{part}</>
          )
        )}
      </>
    );
  }

  return <>{text}</>;
};
