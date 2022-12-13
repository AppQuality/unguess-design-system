import { BarDatum } from "@nivo/bar";

export interface BarChartProps {
    data: BarDatum[];
    keys: string[];
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    total?: number;
    indexBy: string;
    maxValue?: number;
    width?: string;
    height?: string;
};