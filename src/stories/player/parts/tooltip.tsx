import { HTMLAttributes } from "react";
import styled from "styled-components";

interface TooltipArgs extends HTMLAttributes<HTMLDivElement> {}

const Wrapper = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.space.sm};
  z-index: 1;
`;

const Content = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.grey[800]};
  border-radius: 2px;
  width: auto;
  padding: 2px 4px;
  display: inline-flex;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  align-items: center;
  justify-content: center;
  min-height: 14px;
`;

export const PlayerTooltip = ({ children, ...props }: TooltipArgs) => (
  <Wrapper {...props}>
    <Content>{children}</Content>
  </Wrapper>
);
