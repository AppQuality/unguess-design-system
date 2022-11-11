import { BulletSvgProps, Datum } from "@nivo/bullet";

export interface BulletChartProps {
    data: Datum[];
    minValue?: number;
    maxValue?: number;
    theme?: BulletSvgProps["theme"];
    width?: string;
    height?: string;
    markerColor?: string;
    markerSize?: number;
    rangeColor?: string;
    measureSize?: number;
    measureColor?: string;
};