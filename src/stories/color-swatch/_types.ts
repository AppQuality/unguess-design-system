import { IColorSwatchDialogProps } from "@zendeskgarden/react-colorpickers";

export interface ColorSwatchProps extends Omit<IColorSwatchDialogProps, "colors"> {
    colors: { 
        label: string; 
        value: string;
    }[];
    children?: React.ReactNode | React.ReactNode[];
}

export interface ColorSwatchTriggerProps {
    color: string;
    style?: React.CSSProperties;
    children?: React.ReactNode | React.ReactNode[];
}