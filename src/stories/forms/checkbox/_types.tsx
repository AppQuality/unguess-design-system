import { ICheckboxProps, IFieldProps, ILabelProps } from "@zendeskgarden/react-forms";

export interface CheckboxArgs extends ICheckboxProps {
  /**
   * Sets the checkbox state to
   * [indeterminate](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Indeterminate_state_checkboxes)
   */
  indeterminate?: boolean;
  /** Applies compact styling */
  isCompact?: boolean;
}

export interface FieldArgs extends IFieldProps {
  
}

export interface LabelArgs extends ILabelProps {
  /** Applies regular (non-bold) font weight */
  isRegular?: boolean;
}