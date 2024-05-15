import styled from "styled-components";
import { IconButton } from "../../buttons/icon-button";

export const ControlButton = styled(IconButton)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;
