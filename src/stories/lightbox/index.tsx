import { forwardRef } from "react";
import { Modal, ModalClose } from "../modals";
import { ModalBody } from "./parts/body";
import { LightboxArgs } from "./_types";




/**
 * Lightbox is a special modal component used to enlarge some specific content or a list of contents with a slider as main content.
 */

const LightboxComponent = forwardRef<HTMLDivElement, LightboxArgs>((props, ref) => {
  return <Modal ref={ref} isExtraLarge {...props}/>;
});

export const Lightbox = LightboxComponent as typeof LightboxComponent & {
  Header: typeof Modal.Header;
  Body: typeof ModalBody;
  Footer: typeof Modal.Footer;
  Close: typeof ModalClose;
};


Lightbox.Header = Modal.Header;
Lightbox.Body = ModalBody; // Includes Main and Details
Lightbox.Footer = Modal.Footer;
Lightbox.Close = ModalClose;
