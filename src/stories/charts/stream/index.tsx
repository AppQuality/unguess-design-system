import { ResponsiveStream } from "@nivo/stream";
import { StreamChartProps } from "./_types";
import { DEFAULT_CHARTS_THEME } from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";

const StreamChart = ({ theme, ...props }: StreamChartProps) => (
    <ChartContainer width={props.width} height={props.height}>
        <ResponsiveStream
            theme={{
                ...DEFAULT_CHARTS_THEME,
                ...theme,
            }}
            {...props}
        />
    </ChartContainer>
);

export { StreamChart };