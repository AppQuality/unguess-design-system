export interface CustomBulletChartRangeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

export const CustomBulletChartRange = ({ x, y, width, height, fill }: CustomBulletChartRangeProps) => (
  <rect
      x={x + 2}
      y={y + 2}
      width={width - 4}
      height={height - 4}
      fill={fill}
  />
);