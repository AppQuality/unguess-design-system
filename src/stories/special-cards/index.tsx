import { Well as ZendeskWell } from "@zendeskgarden/react-notifications";
import { CardProps } from "./_types";
import styled from "styled-components";
import { CardMeta } from "./styled/meta";
import { CardThumbnail } from "./styled/thumbnail";
import { CardHeader } from "./styled/header";
import { CardFooter } from "./styled/footer";

const UgContentCard = styled(ZendeskWell)`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => `${theme.space.base * 4}px ${theme.space.sm}`};
  border: 1px solid ${({ theme }) => theme.palette.grey["200"]};
  height: 100%;
  display: flex;
  flex-direction: column;
  ${({ isFloating, theme }) =>
    !isFloating &&
    `
      &:hover {
         box-shadow: ${theme.shadows.boxShadow(theme)};
      }`}
`;

/**
 * A SpecialCard is a spefic type of card with an opinionated set of default spaces and subcomponents order.
 * <hr>
 * Used for this:
    - Display products and services
    - As container of input (checkboxCard, radioCard)
 */
const SpecialCard = (props: CardProps) => <UgContentCard {...props} />;

SpecialCard.Meta = CardMeta;
SpecialCard.Thumb = CardThumbnail;
SpecialCard.Header = CardHeader;
SpecialCard.Footer = CardFooter;

export { SpecialCard };
