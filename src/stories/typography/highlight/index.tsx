import { Span as ZendeskSpan } from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { HighlightArgs, Observation, WordProps } from "./_types";
import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getColor } from "../../theme/utils";

const UgSpan = styled(ZendeskSpan)<WordProps & { observation?: Observation }>`
  font-size: ${({ theme, size }) => theme.fontSizes[size ?? "md"]};
  padding: ${({ theme }) => theme.space.xxs} 0;

  ${({ observation, theme }) =>
    observation &&
    `
      background-color: ${
        observation.backgroundColor ??
        getColor(theme.palette.azure, 700, undefined, 0.2)
      };};
      color: ${observation.color ?? getColor(theme.palette.azure, 700)}};
    `}
`;

const ActiveWord = styled.span`
  background-color: ${({ theme }) =>
    getColor(theme.palette.fuschia, 700, undefined, 0.3)};
`;

const StyledDiv = styled.div`
  ${UgSpan} {
    &::selection {
      background-color: ${({ theme }) =>
        getColor(theme.palette.kale, 700, undefined, 0.2)};
      border-radius: 0.25em;
    }
  }
`;

/**
 *  Use Highlight to use highlight interation on any text element
 */

const Highlight = (props: PropsWithChildren<HighlightArgs>) => {
  const [selection, setSelection] = useState<
    { from: number; to: number } | undefined
  >(undefined);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current === null) return;
    document.addEventListener("selectionchange", () => {
      const activeSelection = document.getSelection();
      const text = activeSelection?.toString();

      if (!activeSelection || !text) {
        setSelection(undefined);
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

        setSelection(selectionPart);
        props?.handleSelection?.({ ...selectionPart, text });
      }
    });

    return () => {
      document.removeEventListener("selectionchange", () => {});
    };
  }, [ref]);

  return <StyledDiv ref={ref}>{props.children}</StyledDiv>;
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
    <UgSpan
      {...props}
      observation={observation}
      data-start={props.start}
      data-end={props.end}
    >
      {props.start > 0 && " "}
      {isActive ? <ActiveWord>{props.children}</ActiveWord> : props.children}
    </UgSpan>
  );
};

Highlight.Word = Word;

export { Highlight };
