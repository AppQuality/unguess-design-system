import {
  IStepperLabelProps,
  IStepperProps,
} from "@zendeskgarden/react-accordions";

export interface StepperArgs extends IStepperProps {
  /** Defines the currently active step, starting at 0 */
  activeIndex?: number;
  /** Applies horizontal layout styling */
  isHorizontal?: boolean;
  /** Title used for the accordion shown on mobile */
  accordionTitle?: string;
}

export interface StepperLabelArgs extends IStepperLabelProps {
  /** Replaces the label number with an icon */
  icon?: React.ReactElement;
  /** Hides the label text */
  isHidden?: boolean;
}
