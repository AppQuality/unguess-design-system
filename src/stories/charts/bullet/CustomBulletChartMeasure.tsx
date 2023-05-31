import { theme } from "../../theme";
import { animated } from "@react-spring/web";

export interface CustomBulletChartMeasureProps {
  x: number;
  y: number;
  color: string;
  width: number;
  height: number;
};

export const CustomMeasure = ({ x, y, width, height }: CustomBulletChartMeasureProps) => (
  <animated.rect
    x={x + 2}
    y={y + 2}
    width={width - 4}
    height={height - 4}
    fill={theme.palette.grey[600]}
  />
)