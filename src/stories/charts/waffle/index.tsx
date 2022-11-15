import { ResponsiveWaffle } from "@nivo/waffle";
import { WaffleChartProps } from "./_types";
import {
  CHARTS_COLOR_SCHEME_MONO,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomCell } from "./CustomCell";

const WaffleChart = ({ height, width, data, total }: WaffleChartProps) => {

  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveWaffle
        theme={DEFAULT_CHARTS_THEME}
        data={[
          {
            id: "green-circles",
            label: data.label,
            value: data.value,
          },
          {
            id: "grey-circles",
            label: total.label,
            value: total.value,
          },
        ]}
        fillDirection="bottom"
        total={total.value}
        rows={8}
        columns={8}
        colors={CHARTS_COLOR_SCHEME_MONO}
        // @ts-ignore property cellComponent does not exist, but it does
        cellComponent={({ borderWidth, borderColor, ...rest }) => (
          <CustomCell borderWidth={2} borderColor={"white"} {...rest} />
        )}
      />
    </ChartContainer>
  );
};

export { WaffleChart };
