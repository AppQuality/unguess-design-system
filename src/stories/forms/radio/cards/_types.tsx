import { SpecialCardProps } from "../../../special-cards/_types";
import { RadioArgs } from "../_types";

export interface RadioCardArgs extends RadioArgs {
    card?: SpecialCardProps;
    label: string;
    icon: React.ReactNode;
    iconActive?: React.ReactNode;
    value: string;
    onChecked?: (value: string) => void;
}