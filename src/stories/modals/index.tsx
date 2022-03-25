import {
  Modal as ZendeskModal,
  Header as ModalHeader,
  Body as ModalBody,
  Footer as ModalFooter,
  FooterItem as ZendeskFooterItem,
  Close as ModalClose
} from "@zendeskgarden/react-modals";
import { ModalArgs } from "./_types";
import styled from "styled-components";

const ugModalBody = styled(ModalBody)`
  color: ${({ theme }) => theme.palette.grey["800"]};
`;

const Modal = (props: ModalArgs) => <ZendeskModal {...props} />;
const FooterItem = ZendeskFooterItem;
Modal.Header = ModalHeader;
Modal.Body = ugModalBody;
Modal.Footer = ModalFooter;

export { Modal, FooterItem, ModalClose };
