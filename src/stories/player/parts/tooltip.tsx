import { HTMLAttributes } from "react";
import styled from "styled-components";

interface TooltipArgs extends HTMLAttributes<HTMLDivElement> {}

const Wrapper = styled.div`
  position: absolute;
  bottom: 64px;
`;

const Content = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.palette.grey[800]};
  border-radius: 2px;
  width: auto;
  padding: 2px 4px;
  display: inline-flex;
  color: white;
  align-items: center;
  justify-content: center;
  min-height: 16px;
`;

export const PlayerTooltip = ({ children, ...props }: TooltipArgs) => (
  <Wrapper {...props}>
    <Content>{children}</Content>
  </Wrapper>
);
