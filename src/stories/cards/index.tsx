import { Well as ZendeskWell } from "@zendeskgarden/react-notifications";
import { CardProps, ContainerCardProps } from "./_types";
import styled from "styled-components";

const UgCard = styled(ZendeskWell)`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.space.xxl};
  border: 1px solid ${({ theme }) => theme.palette.grey["200"]};
  cursor: pointer;

  ${({ isFloating, theme }) =>
    !isFloating &&
    `
      &:hover {
         box-shadow: ${theme.shadows.boxShadow(theme)};
      }`}
`;

/**
 * A Card is a container that groups related content.
 * <hr>
 * Used for this:
    - To group related content
 */
const Card = (props: CardProps) => <UgCard {...props} />;

const UgContainerCard = styled(ZendeskWell)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  padding: ${({ theme }) => theme.space.xxl};
  border: 1px solid ${({ theme }) => theme.palette.grey["200"]};
  cursor: default;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.space.xl} ${theme.space.md}`};
  }
`;

const ContainerCard = (props: ContainerCardProps) => <UgContainerCard {...props} />;

export { Card, ContainerCard };
