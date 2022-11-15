interface WaffleDataItem {
    label: string;
    value: number;
};

export interface WaffleChartProps {
    data: WaffleDataItem;
    total: WaffleDataItem;
    width?: string;
    height?: string;
};