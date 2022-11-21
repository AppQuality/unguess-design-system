import { chartColors } from "../../theme/charts";

export interface CustomBulletChartMeasureProps {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
};

export const CustomMeasure = ({ x, y, width, height }: CustomBulletChartMeasureProps) => (
  <rect
    x={x + 2}
    y={y + 2}
    width={width - 4}
    height={height - 4}
    fill={chartColors.darkGrey}
  />
)