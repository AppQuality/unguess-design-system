import styled from "styled-components";
import { SpecialCard } from "../../../special-cards";

export const TitleComponent = styled(SpecialCard.Header.Title)<{
  color: string;
}>`
  color: inherit;
`;
