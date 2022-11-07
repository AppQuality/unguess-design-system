import { SunburstSvgProps } from "@nivo/sunburst";

interface SunburstData {
    name: string;
    children?: SunburstData[];
    [key: string]: any;
}

export interface SunburstChartProps extends Omit<SunburstSvgProps<SunburstData>, "width"| "height" | "cornerRadius" | "childColor"> {
    data: SunburstData;
    width?: string;
    height?: string;
}