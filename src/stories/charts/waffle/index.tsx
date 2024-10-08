import { ResponsiveWaffle, TooltipProps } from "@nivo/waffle";
import {
  CHARTS_COLOR_SCHEME_MONO,
  DEFAULT_CHARTS_THEME,
} from "../../theme/charts";
import { ChartContainer } from "../ChartContainer";
import { CustomCell } from "./CustomCell";
import { WaffleChartProps } from "./_types";

const WaffleChart = ({
  height,
  width,
  data,
  total,
  tooltip,
}: WaffleChartProps) => {
  return (
    <ChartContainer width={width} height={height}>
      <ResponsiveWaffle
        theme={
          tooltip
            ? {
                ...DEFAULT_CHARTS_THEME,
                tooltip: {
                  ...DEFAULT_CHARTS_THEME.tooltip,
                  container: {
                    padding: 0,
                  },
                },
              }
            : DEFAULT_CHARTS_THEME
        }
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
        tooltip={({
          data: { label, value },
        }: TooltipProps<{ id: string; value: number; label: string }>) =>
          tooltip ? (
            tooltip({ label: data.label, value: data.value })
          ) : (
            <div style={{ background: "#fff" }}>{`${label}: ${value}`}</div>
          )
        }
        fillDirection="top"
        total={total.value}
        rows={6}
        columns={8}
        padding={2}
        colors={CHARTS_COLOR_SCHEME_MONO}
        cellComponent={({ borderWidth, ...rest }) => (
          <CustomCell borderWidth={2} {...rest} />
        )}
      />
    </ChartContainer>
  );
};

export { WaffleChart };
