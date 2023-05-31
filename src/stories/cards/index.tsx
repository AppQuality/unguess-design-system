import { Well as ZendeskWell } from "@zendeskgarden/react-notifications";
import { CardProps, ContainerCardProps } from "./_types";
import styled from "styled-components";
import { palette } from "../theme/palette";
import { retrieveComponentStyles } from "@zendeskgarden/react-theming";

export const CARD_COMPONENT_ID = "cards.card";

export const cardCmponentStyle = {
  [CARD_COMPONENT_ID]: {
    border: `1px solid ${palette.grey["200"]};`,
  }
}

const UgCard = styled(ZendeskWell)`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.space.xxl};
  cursor: pointer;

  ${({ isFloating, theme }) =>
    !isFloating &&
    `
      &:hover {
         box-shadow: ${theme.shadows.boxShadow(theme)};
      }`}
  ${(props) => retrieveComponentStyles(CARD_COMPONENT_ID, props)};
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
  cursor: default;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.space.xl} ${theme.space.md}`};
  }
  ${(props) => retrieveComponentStyles(CARD_COMPONENT_ID, props)};
`;

const ContainerCard = (props: ContainerCardProps) => <UgContainerCard {...props} />;

export { Card, ContainerCard };
