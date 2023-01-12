import { Modal, ModalClose } from "../modals";
import { ModalBody } from "./parts/body";
import { LightboxArgs } from "./_types";




/**
 * Lightbox is a special modal component used to enlarge some specific content or a list of contents with a slider as main content.
 */

export const Lightbox = (props: LightboxArgs) => {
  return <Modal isExtraLarge {...props}/>;
};

Lightbox.Header = Modal.Header;
Lightbox.Body = ModalBody; // Includes Main and Details
Lightbox.Footer = Modal.Footer;
Lightbox.Close = ModalClose;
