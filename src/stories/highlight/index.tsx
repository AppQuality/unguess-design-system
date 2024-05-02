import { Span as ZendeskSpan } from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { HighlightArgs, Observation, WordProps } from "./_types";
import { PropsWithChildren, useCallback, useEffect, useRef } from "react";
import { getColor } from "../theme/utils";

const StyledWord = styled(ZendeskSpan)<
  WordProps & { observation?: Observation }
>`
  font-size: ${({ theme, size }) => theme.fontSizes[size ?? "md"]};
  padding: ${({ theme }) => theme.space.xxs} 0;

  ${({ observation, theme }) =>
    observation &&
    `
      user-select: none;
      background-color: ${
        observation.backgroundColor ??
        getColor(theme.palette.azure, 700, undefined, 0.5)
      };
      color: ${observation.color ?? "white"};
      padding: 0 2px;

      &:focus {
        outline: none;
      }

      + span:not([observation]) {
        margin-left: 2px;
      }
    `}
`;

const ActiveWord = styled.span`
  background-color: ${({ theme }) =>
    getColor(theme.palette.fuschia, 700, undefined, 0.5)};
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: 0 2px;
`;

const WordsContainer = styled.div`
  ${StyledWord}, span {
    &::selection {
      background-color: ${({ theme }) =>
        getColor(theme.palette.kale, 700, undefined, 0.5)};
    }
  }

  observation:first-of-type {
    border-top-left-radius: ${({ theme }) => theme.borderRadii.lg};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadii.lg};
  }

  observation:last-of-type {
    border-top-right-radius: ${({ theme }) => theme.borderRadii.lg};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadii.lg};
  }
`;

/**
 *  Use Highlight to use highlight interation on any text element
 */

const Highlight = (props: PropsWithChildren<HighlightArgs>) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectionChange = useCallback(() => {
    const activeSelection = document.getSelection();
    const text = activeSelection?.toString();

    if (!activeSelection || !text) {
      return;
    }

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

  return <WordsContainer ref={ref}>{props.children}</WordsContainer>;
};

const Word = (props: WordProps) => {
  const isActive =
    props.currentTime &&
    props.currentTime >= props.start &&
    props.currentTime < props.end;
  // Is there an observation that contains this word?
  const observation = props.observations?.find(
    (obs) => props.start >= obs.start && props.end <= obs.end
  );

  return (
    <StyledWord
      {...props}
      observation={observation}
      data-start={props.start}
      data-end={props.end}
      className={!!observation ? "highlighted" : ""}
      {...(!!observation ? { tag: "observation" } : {})}
    >
      {isActive ? <ActiveWord>{props.children}</ActiveWord> : props.children}
      {!observation && " "}
    </StyledWord>
  );
};

Highlight.Word = Word;

export { Highlight };