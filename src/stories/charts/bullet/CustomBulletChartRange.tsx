export interface CustomBulletChartRangeProps {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  onMouseEnter: any;
  onMouseLeave: any;
  onMouseMove: any;
}

export const CustomBulletChartRange = ({ x, y, width, height, fill, onMouseEnter, onMouseMove, onMouseLeave }: CustomBulletChartRangeProps) => (
  <rect
      x={x + 2}
      y={y + 2}
      width={width - 4}
      height={height - 4}
      fill={fill}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
  />
);