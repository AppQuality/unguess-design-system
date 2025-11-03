import { ReactNode, RefObject, useEffect, useRef } from "react";
import { TooltipModal } from "../tooltip-modal";
import { IOption } from ".";

export const TooltipModalOption = ({
  modalRef,
  setModalRef,
  children,
  inputSelector = "input",
  option,
}: {
  modalRef: RefObject<HTMLElement> | null;
  setModalRef: React.Dispatch<
    React.SetStateAction<RefObject<HTMLElement> | null>
  >;
  children: (props: { option: IOption; closeModal: () => void }) => ReactNode;
  inputSelector?: string;
  option: IOption;
}) => {
  // search for a input field inside the modal to focus on it when the modal opens
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (modalRef && modalRef.current) {
      setTimeout(() => {
        (
          ref.current?.querySelector(inputSelector) as HTMLElement | null
        )?.focus();
      }, 0);
    }
  }, [modalRef?.current, inputSelector]);

  const closeModal = () => {
    setModalRef(null);
  };

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if (
        modalRef?.current &&
        (e.target instanceof Element && e.target.closest('[data-qa="tooltip-modal-option"]') === null)
      ) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [modalRef?.current]);

  return (
    <TooltipModal
      referenceElement={modalRef?.current || undefined}
      focusOnMount={true}
      appendToNode={
        document.body
      }
      onClose={closeModal}
      placement="auto"
      hasArrow={false}
      role="dialog"
      style={{ maxWidth: 300 }}
      data-qa="tooltip-modal-option"
    >
      <div ref={ref}>
        {typeof children === "function" ? children({ option, closeModal }) : children}
      </div>
    </TooltipModal>
  );
};
