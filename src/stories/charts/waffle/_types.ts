interface WaffleData {
    label: string;
    value: number;
};

export interface WaffleChartProps {
    data: WaffleData[];
    width?: string;
    height?: string;
};