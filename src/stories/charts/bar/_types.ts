import { BarDatum, BarSvgProps } from "@nivo/bar";

export interface BarChartProps extends Omit<BarSvgProps<BarDatum>, "height" | "width"> {
    data: BarDatum[];
    width?: string;
    height?: string;
}