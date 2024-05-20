import { theme } from "../../theme";
import { Span } from "../../typography/span";
import { ReactComponent as Sentiment1 } from "../../../assets/icons/sentiment-1.svg";
import { ReactComponent as Sentiment2 } from "../../../assets/icons/sentiment-2.svg";
import { ReactComponent as Sentiment3 } from "../../../assets/icons/sentiment-3.svg";
import { ReactComponent as Sentiment4 } from "../../../assets/icons/sentiment-4.svg";
import { ReactComponent as Sentiment5 } from "../../../assets/icons/sentiment-5.svg";
import styled from "styled-components";

const StyledDiv = styled.div`
  svg {
    width: ${({ theme }) => theme.space.sm};
    height: ${({ theme }) => theme.space.sm};
    margin-right: ${(p) => p.theme.space.xs};
    flex-shrink: 0;
  }
`;

export const getSentiment = (value: number) => {
  switch (value) {
    case 1:
      return {
        color: theme.palette.red[500],
        text: (
          <StyledDiv>
            <Sentiment1 />{" "}
            <Span style={{ whiteSpace: "nowrap" }}>Very Negative</Span>
          </StyledDiv>
        ),
      };
    case 2:
      return {
        color: theme.palette.red[500],
        text: (
          <StyledDiv>
            <Sentiment2 />{" "}
            <Span style={{ whiteSpace: "nowrap" }}>Negative</Span>
          </StyledDiv>
        ),
      };
    case 3:
      return {
        color: theme.palette.yellow[500],
        text: (
          <StyledDiv>
            <Sentiment3 /> <Span style={{ whiteSpace: "nowrap" }}>Neutral</Span>
          </StyledDiv>
        ),
      };
    case 4:
      return {
        color: theme.palette.green[500],
        text: (
          <StyledDiv>
            <Sentiment4 />{" "}
            <Span style={{ whiteSpace: "nowrap" }}>Positive</Span>
          </StyledDiv>
        ),
      };
    case 5:
      return {
        color: theme.palette.green[500],
        text: (
          <StyledDiv>
            <Sentiment5 />{" "}
            <Span style={{ whiteSpace: "nowrap" }}>Very Positive</Span>
          </StyledDiv>
        ),
      };

    default:
      return {
        color: theme.palette.yellow[500],
        text: "",
      };
  }
};
