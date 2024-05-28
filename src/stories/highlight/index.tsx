import { Span as ZendeskSpan } from "@zendeskgarden/react-typography";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { getColor } from "../theme/utils";
import { HighlightArgs, Observation, WordProps } from "./_types";
import { HighlightContextProvider } from "./highlightContext";
import { Searchable } from "./searchable";
import { Tooltip } from "../tooltip";

const StyledWord = styled(ZendeskSpan) <
  WordProps & { observations?: Observation[] }
>`
  font-size: ${({ theme, size }) => theme.fontSizes[size ?? "md"]};
  padding: ${({ theme }) => theme.space.xxs} 0;

  ${({ observations, theme }) =>
    observations && observations.length > 0 &&
    `
      background-color: ${
        observations[observations.length - 1].hue ?? getColor(theme.palette.azure, 700, undefined, 0.5)
      };
      color: ${observations[observations.length - 1].color ?? "white"};
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
  padding: 0 2px;
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

/**
 *  Use Highlight to use highlight interation on any text element
 */

const Highlight = (props: PropsWithChildren<HighlightArgs>) => {
  const ref = useRef<HTMLDivElement>(null);

  const extractText = (selection: Selection) => {
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
  const foundObservations = props.observations?.filter((obs) =>
    props.start >= obs.start && props.end <= obs.end
  ) ?? [];

  if (props.tooltipContent !== undefined && foundObservations.length > 0) {
    return (
      <Tooltip content={props.tooltipContent(foundObservations)} isTransparent>
        <StyledWord
          {...props}
          data-start={props.start}
          data-end={props.end}
          className={foundObservations.length > 0 ? "highlighted" : ""}
          {...(foundObservations && { observations: foundObservations })}
        >
          {isActive ? (
            <ActiveWord>
              <Searchable text={props.text} />
            </ActiveWord>
          ) : (
            <Searchable text={props.text} />
          )}{" "}
        </StyledWord>
      </Tooltip>
    );
  }

  return (
    <StyledWord
      {...props}
      data-start={props.start}
      data-end={props.end}
      className={foundObservations.length > 0 ? "highlighted" : ""}
      {...(foundObservations && { observations: foundObservations })}
    >
      {isActive ? (
        <ActiveWord>
          <Searchable text={props.text} />
        </ActiveWord>
      ) : (
        <Searchable text={props.text} />
      )}{" "}
    </StyledWord>
  );
};

Highlight.Word = Word;

export { Highlight };
