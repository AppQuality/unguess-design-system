import { Modal } from '../.';
import { ModalArgs } from "../_types";
import styled from "styled-components";

const StyledModal = styled(Modal)`
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: 0;
  left: unset;
  right: unset;
  top: unset;
  bottom: unset;
`;

const StyledHeader = styled(Modal.Header)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  padding: ${({ theme }) => theme.space.base * 4}px ${({ theme }) => theme.space.base * 6}px;
`;

const StyledBody = styled(Modal.Body)`
  background-color: ${({ theme }) => theme.palette.grey["100"]};
`;

const StyledFooter = styled(Modal.Footer)`
  padding: ${({ theme }) => theme.space.base * 4}px ${({ theme }) => theme.space.base * 6}px;
`;

const ModalFullScreen = (props: ModalArgs) => <StyledModal {...props} />;
ModalFullScreen.Header = StyledHeader;
ModalFullScreen.Body = StyledBody;
ModalFullScreen.Footer = StyledFooter;

export { ModalFullScreen };