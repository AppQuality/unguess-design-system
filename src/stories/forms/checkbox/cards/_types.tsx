import { SpecialCardProps } from "../../../special-cards/_types";
import { CheckboxArgs } from "../_types";

export interface CheckboxCardArgs extends CheckboxArgs {
    card?: SpecialCardProps;
    label: string;
    icon: React.ReactNode;
    iconActive?: React.ReactNode;
    onToggle?: (checked: boolean) => void;
}