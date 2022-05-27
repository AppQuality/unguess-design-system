import { Well as ZendeskWell } from "@zendeskgarden/react-notifications";
import { CardProps } from "./_types";
import styled from "styled-components";

const UgContentCard = styled(ZendeskWell)`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.space.xxl};
  border: 1px solid ${({ theme }) => theme.palette.grey["200"]};
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
const Card = (props: CardProps) => <UgContentCard {...props} />;

const UgContainerCard = styled(ZendeskWell)`
  border-radius: ${({ theme }) => theme.borderRadii.xl};
  padding: ${({ theme }) => theme.space.xxl};
  border: 1px solid ${({ theme }) => theme.palette.grey["200"]};
`;

const ContainerCard = (props: CardProps) => <UgContainerCard {...props} />;

export { Card, ContainerCard };
