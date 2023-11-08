export interface ColorSwatchProps {
    colors: { 
        label: string; 
        value: string;
    }[];
    rowSize?: number;
    children?: React.ReactNode | React.ReactNode[];
    onSelect?: (color: string) => void;
}

export interface ColorSwatchTriggerProps {
    style?: React.CSSProperties;
    children?: React.ReactNode | React.ReactNode[];
}