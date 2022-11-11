import { ResponsiveWaffle } from "@nivo/waffle";
import { WaffleChartProps } from "./_types";
import {
  CHARTS_COLOR_SCHEME_CATEGORICAL_5,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomCell } from "./CustomCell";

const WaffleChart = ({
  theme,
  colors,
  height,
  width,
  ...props
}: WaffleChartProps) => {
  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveWaffle
        theme={{
          ...DEFAULT_CHARTS_THEME,
          ...theme,
        }}
        colors={colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL_5}
        motionStiffness={90}
        motionDamping={11}
        // @ts-ignore property cellComponent does not exist, but it does
        cellComponent={CustomCell}
        {...props}
      />
    </ChartContainer>
  );
};

export { WaffleChart };
