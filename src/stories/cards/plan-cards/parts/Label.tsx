import styled from "styled-components";
import { SpecialCard } from "../../../special-cards";

export const LabelComponent = styled(SpecialCard.Header.Label)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;
