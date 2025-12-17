import {
  IOptGroupProps,
  IOptionProps,
  Option,
} from "@zendeskgarden/react-dropdowns";
import { ReactComponent as EditIcon } from "@zendeskgarden/svg-icons/src/12/overflow-vertical-fill.svg";
import { ReactNode, RefObject, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TooltipModalOption } from "./TooltipModalOption";
export interface IOption extends IOptionProps {
  id?: string; // override the id prop because propr value can be an object
  label?: string; // override this, we need a label to filter the options
  actions?: (props: { option: IOption; closeModal: () => void }) => ReactNode;
  meta?: ReactNode;
  actionIcon?: ReactNode;
  onOptionActionClick?: (
    e?: React.MouseEvent<HTMLDivElement>,
    option?: IOption
  ) => void;
}
export interface IOptGroup extends IOptGroupProps {
  id: string; // override the id prop to have a key to iterate over the options
  options: Array<IOption>;
}

const OptionActionWrapper = styled.div`
  position: absolute;
  right: 4px;
  opacity: 0;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
`;

const StyledOption = styled(Option)`
  position: relative;

  &:hover {
    ${OptionActionWrapper} {
      opacity: 1;
    }
  }
`;

const EditAction = styled.div`
  cursor: pointer;
  border-radius: 50%;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.palette.grey[200]};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${(p) => p.theme.palette.grey[400]};
  }
`;

const SelectOption = ({
  actions,
  actionIcon,
  meta,
  children,
  onOptionActionClick,
  ...props
}: IOption) => {
  const refObject = useRef<HTMLLIElement>(null);
  const [modalRef, setModalRef] = useState<RefObject<HTMLElement> | null>(null);

  useEffect(() => {
    if (modalRef === null) return;
    // pointer event to none to the parent list item to avoid closing the modal when clicking inside
    if (modalRef.current && refObject.current) {
      const el = modalRef.current.closest('ul[role="listbox"]') as HTMLElement;
      if (el) {
        el.style.overflowY = "hidden";
      }
    }
    return () => {
      if (modalRef.current && refObject.current) {
        const el = modalRef.current.closest(
          'ul[role="listbox"]'
        ) as HTMLElement;
        if (el) {
          el.style.overflowY = "auto";
        }
      }
    };
  }, [modalRef]);

  const OptionAction = () => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // avoid select options to be closed when clicking on the edit icon
      e.stopPropagation();
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      e.bubbles = false;
      setModalRef(refObject);
      if (onOptionActionClick) {
        onOptionActionClick(e, props);
      }
    };

    return (
      <OptionActionWrapper
        onClick={handleClick}
        data-qa="select-option-actions"
      >
        <EditAction>{actionIcon || <EditIcon />}</EditAction>
      </OptionActionWrapper>
    );
  };

  return (
    <>
      <StyledOption {...props} ref={refObject}>
        {children || props.label}
        {actions && <OptionAction />}
        {meta && <Option.Meta>{meta}</Option.Meta>}
      </StyledOption>
      {actions && ( // here to avoid click events to propagate to the actual option
        <TooltipModalOption
          option={props}
          modalRef={modalRef}
          setModalRef={setModalRef}
        >
          {actions}
        </TooltipModalOption>
      )}
    </>
  );
};

SelectOption.Meta = Option.Meta;

export { SelectOption };
