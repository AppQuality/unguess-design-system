import { Tag } from "../tags";
import { CounterArgs } from "./_types";
import styled from "styled-components";
import { ReactComponent as CompletedIcon } from "../../assets/icons/campaign-completed.svg";
import { ReactComponent as ProgressIcon } from "../../assets/icons/campaign-progress.svg";
import { ReactComponent as IncomingIcon } from "../../assets/icons/campaign-incoming.svg";
import { ReactComponent as FunctionalIcon } from "../../assets/icons/campaign-functional.svg";
import { ReactComponent as ExperientialIcon } from "../../assets/icons/campaign-experiential.svg";
import { Span } from "../typography/span";
import useWindowSize from "../../hooks/useWindowSize";
import { theme } from "../theme";

const StyledSpan = styled(Span)``;
const StyledTag = styled(Tag)<CounterArgs>`
  background-color: transparent;
  pointer-events: none;
  ${({ status, theme }) => {
    switch (status) {
      case "completed":
        return `color: ${theme.palette.green[800]};`;
      case "progress":
        return `color: ${theme.palette.yellow[700]};`;
      case "incoming":
        return `color: ${theme.palette.azure[600]};`;
      default:
        return `color: ${theme.palette.grey[800]};`;
    }
  }}
  svg {
    margin-right: ${({ theme }) => theme.space.xxs} !important;
  }

  ${StyledSpan} {
    margin-left: ${({ theme }) => theme.space.xxs};
    color: ${({ theme }) => theme.palette.grey[700]};
    font-weight: ${({ theme }) => theme.fontWeights.medium};
  }
`;

/**
 * Counter let users categorize content using a keyword.
 */
const Counter = (props: CounterArgs) => {
  const { width } = useWindowSize();
  const { status, counter } = props;

  return (
    <StyledTag {...props} size={props.size || "large"}>
      <StyledTag.Avatar>
        <>
          {status === "completed" && <CompletedIcon />}
          {status === "progress" && <ProgressIcon />}
          {status === "incoming" && <IncomingIcon />}
          {status === "functional" && <FunctionalIcon />}
          {status === "experiential" && <ExperientialIcon />}
        </>
      </StyledTag.Avatar>
      {width > parseInt(theme.breakpoints.sm) && props.children}
      {counter !== undefined && <StyledSpan>{counter.toString()}</StyledSpan>}
    </StyledTag>
  );
};

Counter.Avatar = StyledTag.Avatar;

export { Counter };
