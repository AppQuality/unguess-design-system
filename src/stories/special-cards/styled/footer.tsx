import styled from "styled-components";
import { CardFooterProps } from "../_types";

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin-top: ${({ theme }) => theme.space.xs};
  background-color: ${({ theme }) => theme.palette.grey["300"]};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const Container = styled.div<CardFooterProps>`
  ${({ theme, direction, justifyContent }) => `
      display: flex;
      align-items: center;
      flex-direction: ${direction || "row"};
      justify-content: ${justifyContent || "space-between"};
      padding: ${theme.space.xxs} 0;
      margin-top: ${theme.space.xs};
    `}
`;

export const CardFooter = (props: CardFooterProps) => (
  <Footer>
    {!props.noDivider && <Divider />}
    <Container {...props}>{props.children}</Container>
  </Footer>
);
