import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";
import { getColor } from "../theme/utils";
import { HighlightArgs, Observation, WordProps } from "./_types";
import { HighlightContextProvider } from "./highlightContext";
import { Searchable } from "./searchable";
import { Tooltip } from "../tooltip";
import { theme } from "../theme";
import { ReactComponent as TagIcon } from "../../assets/icons/tag-stroke.svg";
import { CreateObservationButton } from "./CreateObservationButton";

const getFocusedObs = (observations: Observation[]) => {
  return observations.find((obs) => obs.isFocused);
};

const StyledWord = styled.div<WordProps & { observations?: Observation[] }>`
  display: inline-block;
  font-size: ${({ theme, size }) => theme.fontSizes[size ?? "md"]};
  padding: ${({ theme }) => theme.space.xxs} 0;
  position: relative;
  color: ${({ theme }) => theme.palette.grey[700]};
  white-space: pre;

  ${({ observations, theme }) =>
    observations &&
    observations.length > 0 &&
    `
      color: ${
        observations[observations.length - 1].color ?? theme.palette.grey[600]
      };
      box-sizing: border-box;
      font-weight: ${
        getFocusedObs(observations)
          ? theme.fontWeights.extrabold
          : theme.fontWeights.semibold
      };
      font-style: ${getFocusedObs(observations) ? "italic" : "normal"};
      z-index: 1;
      &:focus {
        outline: none;
      }
    `}
`;

const ActiveWord = styled.span`
  position: relative;
  z-index: 2;
  background-color: ${({ theme }) =>
    getColor(theme.palette.fuschia, 400, undefined, 0.4)};
`;

const WordsContainer = styled.div`
  box-sizing: border-box;
  ${StyledWord}, span {
    &::selection {
      background-color: ${({ theme }) =>
        getColor(theme.palette.grey, 400, undefined, 0.5)};
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
  background-color: ${({ color }) =>
    getColor(color, undefined, undefined, 0.2)};
`;

/**
 *  Use Highlight to use highlight interation on any text element
 */

const Highlight = (props: PropsWithChildren<HighlightArgs>) => {
  const { onSelectionButtonClick, search, i18n, children } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [position, setPosition] = useState<{
    x: number;
    y: number;
  }>();
  const [selection, setSelection] = useState<{
    from: number;
    to: number;
    text: string;
  }>();
  const activeSelection = document.getSelection();

  const extractText = (selection: Selection) => {
    if (selection.anchorNode === null || selection.focusNode === null)
      return "";
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
    if (activeSelection && activeSelection.toString().length > 0) {
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
        if (onSelectionButtonClick) {
          setIsSelecting(true);

          const range = activeSelection.getRangeAt(0);
          const rects = range.getClientRects();
          const lastRect = rects[rects.length - 1];
          const containerRect =
            ref && ref.current ? ref.current.getBoundingClientRect() : null;

          if (!lastRect || !containerRect) return;

          const relativeY =
            lastRect.bottom - containerRect.top + ref.current.scrollTop;
          const relativeX =
            lastRect.right - containerRect.left + ref.current.scrollLeft;

          if (relativeY > 0 || relativeX > 0)
            // Fix to avoid the button to be placed sometimes at the top left corner of the screen (X: 0, Y: 0)
            setPosition({
              x: relativeX,
              y: relativeY + 15,
            });
        } else {
          setIsSelecting(false);
        }

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

        setSelection({ ...selectionPart, text });
      } else {
        setIsSelecting(false);
      }
    } else {
      setIsSelecting(false);
    }
  }, [onSelectionButtonClick, activeSelection]);

  useEffect(() => {
    if (ref.current === null) return;
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [ref, props, handleSelectionChange]);

  return (
    <HighlightContextProvider term={search}>
      <WordsContainer ref={ref}>{children}</WordsContainer>
      {onSelectionButtonClick && isSelecting && selection && (
        <CreateObservationButton
          isAccent
          isPrimary
          position={
            position ?? {
              x: 0,
              y: 0,
            }
          }
          onClick={() => onSelectionButtonClick(selection)}
        >
          <CreateObservationButton.StartIcon>
            <TagIcon />
          </CreateObservationButton.StartIcon>
          {i18n?.selectionButtonLabel ?? "Create observation"}
        </CreateObservationButton>
      )}
    </HighlightContextProvider>
  );
};

const Word = (props: WordProps) => {
  const isActive =
    props.currentTime &&
    props.currentTime >= props.start &&
    props.currentTime < props.end;

  // Are there any observations containing this word?
  const foundObservations = useMemo(
    () =>
      props.observations?.filter(
        (obs) =>
          Number(props.start.toFixed(8)) >= Number(obs.start.toFixed(8)) &&
          Number(props.end.toFixed(8)) <= Number(obs.end.toFixed(8))
      ) ?? [],
    [props.observations, props.start, props.end]
  );

  const ObsWord = useMemo(
    () => (
      <StyledWord
        {...props}
        data-start={props.start}
        data-end={props.end}
        className={foundObservations.length > 0 ? "highlighted" : ""}
        {...(foundObservations && { observations: foundObservations })}
      >
        {foundObservations.length > 0 &&
          foundObservations.map((obs) => (
            <Layer key={obs.id} color={obs.hue ?? theme.palette.grey[600]} />
          ))}
        {isActive ? (
          <ActiveWord data-start={props.start} data-end={props.end}>
            <Searchable text={props.text} />
          </ActiveWord>
        ) : (
          <Searchable text={props.text} />
        )}{" "}
      </StyledWord>
    ),
    [props, foundObservations, isActive]
  );

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
