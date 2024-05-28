import { PropsWithChildren, useCallback, useEffect, useMemo, useRef } from "react";
import styled from "styled-components";
import { getColor } from "../theme/utils";
import { HighlightArgs, Observation, WordProps } from "./_types";
import { HighlightContextProvider } from "./highlightContext";
import { Searchable } from "./searchable";
import { Tooltip } from "../tooltip";
import { theme } from "../theme";

const StyledWord = styled.div<
  WordProps & { observations?: Observation[] }
>`
  display: inline;
  font-size: ${({ theme, size }) => theme.fontSizes[size ?? "md"]};
  padding: ${({ theme }) => theme.space.xxs} 0;
  position: relative;

  ${({ observations, theme }) =>
    observations && observations.length > 0 &&
    `
      color: ${observations[observations.length - 1].color ?? theme.palette.grey[600]};
      box-sizing: border-box;
      font-weight: ${theme.fontWeights.semibold};

      &:focus {
        outline: none;
      }
    `}
`;

const ActiveWord = styled.span`
  background-color: ${({ theme }) =>
    getColor(theme.palette.fuschia, 400, undefined, 0.4)};
`;

const WordsContainer = styled.div`
  box-sizing: border-box;
  ${StyledWord}, span {
    &::selection {
      background-color: ${({ theme }) =>
    getColor(theme.palette.kale, 700, undefined, 0.5)};
    }
  }
`;

const Layer = styled.div<{
  color: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  background-color: ${({ color }) => getColor(color, undefined, undefined, 0.2)};
`;

/**
 *  Use Highlight to use highlight interation on any text element
 */

const Highlight = (props: PropsWithChildren<HighlightArgs>) => {
  const ref = useRef<HTMLDivElement>(null);

  const extractText = (selection: Selection) => {
    if(selection.anchorNode === null || selection.focusNode === null) return "";
    var range = selection.getRangeAt(0);

    var tempDiv = document.createElement("div");
    tempDiv.appendChild(range.cloneContents());

    var items = tempDiv.querySelectorAll("div");
    items.forEach(function (item) {
      if (item.getAttribute("data-unselectable")) {
        item.remove();
      }
    });

    var filteredText = tempDiv.textContent || tempDiv.innerText;
    return filteredText.length ? filteredText.trim() : selection.toString();
  };

  const handleSelectionChange = useCallback(() => {
    const activeSelection = document.getSelection();

    if (!activeSelection) {
      return;
    }

    // Extract the text from the selection cleaning unselectable items
    const text = extractText(activeSelection);
    if (!text) return;

    const anchorNode = activeSelection?.anchorNode?.parentElement;
    const focusNode = activeSelection?.focusNode?.parentElement;

    if (
      anchorNode &&
      focusNode &&
      ref.current?.contains(anchorNode) && // Selection starts inside the ref
      ref.current?.contains(focusNode) // Selection ends inside the ref
    ) {
      const selectionPart = {
        from: Math.min(
          Number.parseFloat(anchorNode.getAttribute("data-start") ?? "0"),
          Number.parseFloat(focusNode.getAttribute("data-start") ?? "0")
        ),
        to: Math.max(
          Number.parseFloat(anchorNode.getAttribute("data-end") ?? "0"),
          Number.parseFloat(focusNode.getAttribute("data-end") ?? "0")
        ),
      };

      props?.handleSelection?.({ ...selectionPart, text });
    }
  }, [props]);

  useEffect(() => {
    if (ref.current === null) return;
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [ref, props, handleSelectionChange]);

  return (
    <HighlightContextProvider term={props.search}>
      <WordsContainer ref={ref}>{props.children}</WordsContainer>
    </HighlightContextProvider>
  );
};

const Word = (props: WordProps) => {
  const isActive =
    props.currentTime &&
    props.currentTime >= props.start &&
    props.currentTime < props.end;

  // Are there any observations containing this word?
  const foundObservations = useMemo(() =>
    props.observations?.filter((obs) =>
      props.start >= obs.start && props.end <= obs.end
    ) ?? [], [props.observations, props.start, props.end]);

  const ObsWord = useMemo(() => (
    <StyledWord
      {...props}
      data-start={props.start}
      data-end={props.end}
      className={foundObservations.length > 0 ? "highlighted" : ""}
      {...(foundObservations && { observations: foundObservations })}
    >
      {foundObservations.length > 0 && foundObservations.map((obs) => (
        <Layer key={obs.id} color={obs.hue ?? theme.palette.grey[600]} />
      ))}
      {isActive ? (
        <ActiveWord>
          <Searchable text={props.text} />
        </ActiveWord>
      ) : (
        <Searchable text={props.text} />
      )}{" "}
    </StyledWord>
  ), [props, foundObservations, isActive]);

  if (props.tooltipContent !== undefined && foundObservations.length > 0) {
    return (
      <Tooltip content={props.tooltipContent(foundObservations)} isTransparent>
        {ObsWord}
      </Tooltip>
    );
  }

  return <>{ObsWord}</>;
};

Highlight.Word = Word;

export { Highlight };
