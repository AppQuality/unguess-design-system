export interface CustomBulletChartRangeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
};

export const CustomBulletChartRange = ({ x, y, width, height, fill }: CustomBulletChartRangeProps) => (
  <rect
      x={x}
      y={y}
      width={width - 2}
      height={height}
      fill={fill}
  />
);