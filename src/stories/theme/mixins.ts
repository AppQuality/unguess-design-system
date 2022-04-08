import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
`;

export const flexColumnCenter = css`
  ${flexCenter};
  flex-direction: column;
`;

export const flexStart = css`
  display: flex;
  flex-direction: column;
  align-items: ${({ theme }) => (theme.rtl ? "flex-end" : "flex-start")};
`;
