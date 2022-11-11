interface CustomBulletChartMarkerProps {
  x: number;
  y: number;
  bulletRadius: number;
  fill: string;
  size: number;
};

export const CustomBulletChartMarker = ({
  x,
  y,
  bulletRadius,
  fill,
  size,
}: CustomBulletChartMarkerProps) => (
  <circle
    r={bulletRadius}
    fill={fill}
    transform={`translate(${x},${y}) scale(${size})`}
 />
);
