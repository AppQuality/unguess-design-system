import { ReactNode, RefObject, useEffect, useRef } from "react";
import { TooltipModal } from "../tooltip-modal";

export const TooltipModalOption = ({
  modalRef,
  setModalRef,
  children,
  inputSelector = "input",
}: {
  modalRef: RefObject<HTMLElement> | null;
  setModalRef: React.Dispatch<React.SetStateAction<RefObject<HTMLElement> | null>>;
  children: ReactNode;
  inputSelector?: string;
}) => {
  // search for a input field inside the modal to focus on it when the modal opens
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef && modalRef.current) {
      setTimeout(() => {
  (ref.current?.querySelector(inputSelector) as HTMLElement | null)?.focus();
      }, 0);
    }
  }, [modalRef?.current, inputSelector]);
  return (
    <TooltipModal
      referenceElement={modalRef?.current || undefined}
      focusOnMount={true}
      restoreFocus={true}
      appendToNode={modalRef?.current?.parentElement?.parentElement?.parentElement || undefined}
      onClose={() => setModalRef(null)}
      placement="auto"
      hasArrow={false}
      role="dialog"
      style={{ maxWidth: 300 }}
    >
      <div ref={ref}>
        {children}
      </div>
    </TooltipModal>
  );
};