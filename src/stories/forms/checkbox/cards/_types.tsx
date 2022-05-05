import { CardProps } from "../../../cards/_types";
import { CheckboxArgs } from "../_types";

export interface CheckboxCardArgs extends CheckboxArgs {
    card?: CardProps;
    label: string;
    icon: React.ReactNode;
    iconActive?: React.ReactNode;
    onToggle?: (checked: boolean) => void;
}