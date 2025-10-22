import {
  IOptGroupProps,
  IOptionProps,
  Option,
} from "@zendeskgarden/react-dropdowns.next";
import { ReactNode } from "react";
import styled from "styled-components";
export interface IOption extends IOptionProps {
  id: string; // override the id prop because propr value can be an object
  label: string; // override this, we need a label to filter the options
  action?: ReactNode;
  meta?: ReactNode;
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

  &:hover,
  &[hover="true"] {
    background-color: ${({ theme }) => theme.palette.green[100]};
    ${OptionActionWrapper} {
      opacity: 1;
    }
  }
`;
const OptionAction = ({ children }: { children: ReactNode }) => (
  <OptionActionWrapper>{children}</OptionActionWrapper>
);

export const SelectOption = ({ action, ...props }: IOption) => (
  <StyledOption {...props}>
    {props.label}
    {action && <OptionAction>{action}</OptionAction>}
    {props.meta && <Option.Meta>{props.meta}</Option.Meta>}
  </StyledOption>
);
