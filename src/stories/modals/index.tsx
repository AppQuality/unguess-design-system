import {
  Modal as ZendeskModal,
  Header as ModalHeader,
  Body as ModalBody,
  Footer as ModalFooter,
  FooterItem as ZendeskFooterItem,
  Close as ModalClose,
} from "@zendeskgarden/react-modals";
import { ModalArgs } from "./_types";
import styled from "styled-components";

const UgModalBody = styled(ModalBody)`
  color: ${({ theme }) => theme.palette.grey["800"]};
`;

const UgModal = styled(ZendeskModal)<ModalArgs>`
  ${({ isExtraLarge }) => isExtraLarge && "height: 90%; width: 90%;"}
`;

const Modal = (props: ModalArgs) => <UgModal {...props} />;
const FooterItem = ZendeskFooterItem;
Modal.Header = ModalHeader;
Modal.Body = UgModalBody;
Modal.Footer = ModalFooter;

export { Modal, FooterItem, ModalClose };
