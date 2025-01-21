import { SpecialCardProps } from "../../../special-cards/_types";
import { ICheckboxProps } from "@zendeskgarden/react-forms";

export interface CheckboxCardArgs extends ICheckboxProps {
    card?: SpecialCardProps;
    label: string;
    icon: React.ReactNode;
    iconActive?: React.ReactNode;
    onToggle?: (checked: boolean) => void;
}