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
import { forwardRef } from "react";

const UgModalBody = styled(ModalBody)`
  color: ${({ theme }) => theme.palette.grey["800"]};
`;

const UgModal = styled(ZendeskModal)<ModalArgs>`
  ${({ isExtraLarge }) => isExtraLarge && "height: 90%; width: 90%;"}
`;

const ModalComponent = forwardRef<HTMLDivElement, ModalArgs>((props, ref) => (
  <UgModal ref={ref} {...props} />
));

const Modal = ModalComponent as typeof ModalComponent & {
  Header: typeof ModalHeader;
  Body: typeof UgModalBody;
  Footer: typeof ModalFooter;
};

const FooterItem = ZendeskFooterItem;
Modal.Header = ModalHeader;
Modal.Body = UgModalBody;
Modal.Footer = ModalFooter;

export { Modal, FooterItem, ModalClose };
