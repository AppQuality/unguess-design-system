import { BarDatum, BarTooltipProps } from "@nivo/bar";

export interface BarChartProps {
    data: BarDatum[];
    keys: string[];
    indexBy: string;
    tooltip?: React.FC<BarTooltipProps<BarDatum>>;
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
    padding?: number;
};