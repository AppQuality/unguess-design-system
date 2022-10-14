import { PieSvgProps } from "@nivo/pie";

interface PieDatum {
    [key: string]: string | number;
}

export interface PieChartProps extends PieSvgProps<PieDatum> {
    data: PieDatum[];
    width: number;
    height: number;
}