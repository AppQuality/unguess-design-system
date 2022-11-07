import { WaffleDatum, WaffleSvgProps } from "@nivo/waffle";



export interface WaffleChartProps extends Omit<WaffleSvgProps, "width" | "height"> {
    data: WaffleDatum[];
    width?: string;
    height?: string;
}