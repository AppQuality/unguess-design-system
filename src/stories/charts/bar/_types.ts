import { BarDatum } from "@nivo/bar";

export interface BarChartProps {
    data: BarDatum[];
    keys: string[];
    indexBy: string;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    axisLeft?: {legend?: string, offset?: number};
    axisBottom?: {legend?: string, offset?: number};
    width?: string;
    height?: string;
};