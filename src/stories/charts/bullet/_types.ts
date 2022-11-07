import { BulletSvgProps, Datum } from "@nivo/bullet";

export interface BulletChartProps extends Omit<BulletSvgProps, "width" | "height"> {
    data: Datum[];
    lineHeight?: number;
    bulletRadius?: number;
    width?: string;
    height?: string;
}