import { IButtonGroupProps } from "@zendeskgarden/react-buttons";

export interface ButtonGroupArgs extends IButtonGroupProps {
    /** Defines the currently selected button in the group */
    selectedItem?: any;
}