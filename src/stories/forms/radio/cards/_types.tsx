import { CardProps } from "../../../cards/_types";
import { RadioArgs } from "../_types";

export interface RadioCardArgs extends RadioArgs {
    card?: CardProps;
    label: string;
    icon: React.ReactNode;
    iconActive?: React.ReactNode;
    value: string;
    onChecked?: (value: string) => void;
}