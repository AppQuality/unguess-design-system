import { PieSvgProps } from "@nivo/pie";

interface PieDatum {
    [key: string]: string | number;
}

export interface PieChartProps extends Omit<PieSvgProps<PieDatum>, "width"| "height"> {
    data: PieDatum[];
    width?: string;
    height?: string;
}