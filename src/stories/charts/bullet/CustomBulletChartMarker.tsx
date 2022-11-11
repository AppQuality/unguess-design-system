interface CustomBulletChartMarkerProps {
  x: number;
  y: number;
  bulletRadius: number;
  fill: string;
}

export const CustomBulletChartMarker = ({ x, y, bulletRadius, fill }: CustomBulletChartMarkerProps) => (
 <circle
    r={bulletRadius}
    fill={fill}
    transform={`translate(${x},${y})`}
 />
);