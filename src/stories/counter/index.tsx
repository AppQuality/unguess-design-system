import { Tag } from "../tags";
import { CounterArgs } from "./_types";
import styled from "styled-components";
import { ReactComponent as CompletedIcon } from "../../assets/icons/campaign-completed.svg";
import { ReactComponent as ProgressIcon } from "../../assets/icons/campaign-progress.svg";
import { ReactComponent as IncomingIcon } from "../../assets/icons/campaign-incoming.svg";
import { ReactComponent as FunctionalIcon } from "../../assets/icons/campaign-functional.svg";
import { ReactComponent as ExperientialIcon } from "../../assets/icons/campaign-experiential.svg";

const StyledTag = styled(Tag)<CounterArgs>`
  background-color: transparent;
  pointer-events: none;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
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

  span {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-left: ${({ theme }) => theme.space.xxs};
    color: ${({ theme }) => theme.palette.grey[700]};
  }
`;

/**
 * Counter let users categorize content using a keyword.
 */
const Counter = (props: CounterArgs) => {
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
      {props.children}
      {counter !== undefined && counter > 0 && <span>{counter}</span>}
    </StyledTag>
  );
};

Counter.Avatar = StyledTag.Avatar;

export { Counter };
