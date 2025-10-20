import {
  IOptGroupProps,
  IOptionProps, Option
} from "@zendeskgarden/react-dropdowns.next";
import { ReactNode } from "react";
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

export const SelectOption = ({action, ...props}: IOption) => (
  <Option {...props}>
    {props.label}
    {action && <div style={{float: 'right'}}>{action}</div>}
    {props.meta && <div style={{float: 'right', marginLeft: '8px', color: '#666'}}>{props.meta}</div>}
  </Option>
);
