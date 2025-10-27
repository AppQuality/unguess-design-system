import {
  IOptGroupProps,
  IOptionProps,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import { ReactNode, RefObject, useRef, useState } from "react";
import { ReactComponent as EditIcon } from "@zendeskgarden/svg-icons/src/12/overflow-vertical-fill.svg";
import styled from "styled-components";
import { TooltipModalOption } from "./TooltipModalOption";
export interface IOption extends IOptionProps {
  id: string; // override the id prop because propr value can be an object
  label: string; // override this, we need a label to filter the options
  actions?: (props: { closeModal: () => void }) => ReactNode;
  meta?: ReactNode;
  actionIcon?: ReactNode;
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

export const SelectOption = ({
  actions,
  actionIcon,
  label,
  meta,
  ...props
}: IOption) => {
  const refObject = useRef<HTMLLIElement>(null);
  const [modalRef, setModalRef] = useState<RefObject<HTMLElement> | null>(null);

  const OptionAction = () => {
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      // avoid select options to be closed when clicking on the edit icon
      e.stopPropagation();
      e.preventDefault();
      e.nativeEvent.stopImmediatePropagation();
      setModalRef(refObject);
    };

    return (
      <OptionActionWrapper onClick={handleClick}>
        <EditAction>{actionIcon || <EditIcon />}</EditAction>
      </OptionActionWrapper>
    );
  };

  return (
    <>
      <StyledOption {...props} ref={refObject}>
        {label}
        {actions && (
          <>
            <OptionAction />
          </>
        )}
        {meta && <Option.Meta>{meta}</Option.Meta>}
      </StyledOption>
      {actions && ( // here to avoid click events to propagate to the actual option
        <TooltipModalOption modalRef={modalRef} setModalRef={setModalRef}>
          {actions}
        </TooltipModalOption>
      )}
    </>
  );
};
