import { BulletSvgProps, Datum } from "@nivo/bullet";

export interface BulletChartDefaultProps extends Omit<BulletSvgProps, "width" | "height"> {
    data: Datum[];
    lineHeight?: number;
    bulletRadius?: number;
    width?: string;
    height?: string;
};

export interface BulletChartProps {
    data: Datum[];
    theme?: BulletSvgProps["theme"];
    width?: string;
    height?: string;
    markerColor?: string;
    markerSize?: number;
    rangeColor?: string;
    measureSize?: number;
    measureColor?: string;
};