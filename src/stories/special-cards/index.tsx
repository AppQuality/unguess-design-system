import { Well as ZendeskWell } from "@zendeskgarden/react-notifications";
import { componentStyles } from "@zendeskgarden/react-theming";
import styled from "styled-components";
import { CARD_COMPONENT_ID } from "../cards";
import { SpecialCardProps } from "./_types";
import { CardBody } from "./styled/Body";
import { CardFooter } from "./styled/footer";
import { CardHeader } from "./styled/header";
import { CardMeta } from "./styled/meta";
import { CardThumbnail } from "./styled/thumbnail";

const UgContentCard = styled(ZendeskWell)<SpecialCardProps>`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.base * 4}px`};
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  word-break: break-word;

  ${({ isFloating, theme }) =>
    !isFloating &&
    `
      &:hover {
         box-shadow: ${theme.shadows.card()};
      }`}

  ${({ isDisabled }) =>
    isDisabled &&
    `
    pointer-events: none;
    opacity: 0.7;
    `}
    ${(props) =>
    componentStyles({ theme: props.theme, componentId: CARD_COMPONENT_ID })};
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
