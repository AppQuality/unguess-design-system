import { StreamDatum, StreamSvgProps } from "@nivo/stream";

export interface StreamChartProps extends Omit<StreamSvgProps<StreamDatum>, "width" | "height"> {
    data: StreamDatum[];
    width?: string;
    height?: string;
}