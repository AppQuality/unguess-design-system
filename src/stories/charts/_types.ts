import { BarDatum, BarSvgProps } from "@nivo/bar";

export interface BarChartProps extends BarSvgProps<BarDatum> {
    data: BarDatum[];
    width: number;
    height: number;
}