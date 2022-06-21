import { Modal } from "../.";
import { ModalArgs } from "../_types";
import styled from "styled-components";
import { ModalClose, FooterItem } from "../.";

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
  justify-content: space-between;
  flex-direction: row;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.base * 6}px`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.md};
  }
`;

const StyledBody = styled(Modal.Body)`
  background-color: ${({ theme }) => theme.palette.grey["100"]};
  padding: ${({ theme }) => `${theme.space.md} ${theme.space.base * 6}px`};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.space.md};
  }
`;

const StyledFooter = styled(Modal.Footer)`
  padding: ${({ theme }) => theme.space.base * 4}px
    ${({ theme }) => theme.space.base * 6}px;
`;

const StyledModalClose = styled(ModalClose)`
  position: relative;
  top: unset;
  right: unset;
`;

const ModalFullScreen = (props: ModalArgs) => <StyledModal {...props} />;
ModalFullScreen.Header = StyledHeader;
ModalFullScreen.Body = StyledBody;
ModalFullScreen.Footer = StyledFooter;
ModalFullScreen.Close = StyledModalClose;
ModalFullScreen.FooterItem = FooterItem;

export { ModalFullScreen };
