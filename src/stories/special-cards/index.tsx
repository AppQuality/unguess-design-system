import { Well as ZendeskWell } from "@zendeskgarden/react-notifications";
import { SpecialCardProps } from "./_types";
import styled from "styled-components";
import { CardMeta } from "./styled/meta";
import { CardThumbnail } from "./styled/thumbnail";
import { CardHeader } from "./styled/header";
import { CardFooter } from "./styled/footer";
import { CardBody } from "./styled/Body";
import { CARD_COMPONENT_ID } from "../cards";
import { retrieveComponentStyles } from "@zendeskgarden/react-theming";

const UgContentCard = styled(ZendeskWell)<SpecialCardProps>`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.base * 4}px`};
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  ${({ isFloating, theme }) =>
    !isFloating &&
    `
      &:hover {
         box-shadow: ${theme.shadows.boxShadow(theme)};
      }`}

  ${({ isDisabled }) =>
    isDisabled &&
    `
    pointer-events: none;
    opacity: 0.7;
    `}
    ${(props) => retrieveComponentStyles(CARD_COMPONENT_ID, props)};
`;

/**
 * A SpecialCard is a spefic type of card with an opinionated set of default spaces and subcomponents order.
 * <hr>
 * Used for this:
    - Display products and services
    - As container of input (checkboxCard, radioCard)
 */
const SpecialCard = (props: SpecialCardProps) => <UgContentCard {...props} />;

SpecialCard.Meta = CardMeta;
SpecialCard.Thumb = CardThumbnail;
SpecialCard.Header = CardHeader;
SpecialCard.Footer = CardFooter;
SpecialCard.Body = CardBody;

export { SpecialCard };
