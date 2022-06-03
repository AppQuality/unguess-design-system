import styled from "styled-components";
import { CardMetaProps } from "../_types";

export const CardMeta = styled.div<CardMetaProps>`
  ${({ theme, direction, justifyContent }) => `
      display: flex;
      align-items: center;
      flex-direction: ${direction || "row"};
      justify-content: ${justifyContent || "space-between"};
      height: ${theme.space.base * 6}px;
      padding: ${theme.space.xxs} 0;
      margin-bottom: ${theme.space.xs};
    `}
`;
