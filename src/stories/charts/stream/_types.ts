import { StreamDatum, StreamSvgProps } from "@nivo/stream";

export interface StreamChartProps extends StreamSvgProps<StreamDatum> {
    data: StreamDatum[];
    width: number;
    height: number;
}