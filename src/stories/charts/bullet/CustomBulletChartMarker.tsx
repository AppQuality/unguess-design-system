interface CustomBulletChartMarkerProps {
  x: number;
  y: number;
  bulletRadius: number;
  fill: string;
  onMouseEnter: any;
  onMouseLeave: any;
  onMouseMove: any;
  onClick: any;
}

export const CustomBulletChartMarker = ({ x, y, bulletRadius, fill, onMouseEnter, onMouseMove, onMouseLeave, onClick }: CustomBulletChartMarkerProps) => (
 <circle
    r={bulletRadius}
    fill={fill}
    transform={`translate(${x},${y})`}
    onMouseEnter={onMouseEnter}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
 />
);