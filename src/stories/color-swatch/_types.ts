import { IColorSwatchDialogProps } from "@zendeskgarden/react-colorpickers";


export interface ColorSwatchProps extends Omit<IColorSwatchDialogProps, "colors" | "onSelect"> {
  colors: {
    label?: string;
    value: string;
  }[];
  rowSize?: number;
  children?: React.ReactNode | React.ReactNode[];
  onSelect?: (color: string) => void;
  disableTooltip?: boolean;
}

export interface ColorSwatchTriggerProps {
  style?: React.CSSProperties;
  children?: React.ReactNode | React.ReactNode[];
}
