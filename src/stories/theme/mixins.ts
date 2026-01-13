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

export const cardStyle = css`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.components.notification.card.padding};
  border: 1px solid ${({ theme }) => theme.palette.grey["200"]};
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  overflow: hidden;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadow()};
  }

  cursor: pointer;
`;
