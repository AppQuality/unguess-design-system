export interface WaffleCellProps {
  position?: any;
  size?: any;
  x?: any;
  y?: any;
  color?: any;
  fill?: any;
  opacity?: any;
  borderWidth?: any;
  borderColor?: any;
  data?: any;
  onHover?: any;
  onLeave?: any;
  onClick?: any;
 }

export const CustomCell = ({
  position,
  size,
  x,
  y,
  color,
  fill,
  opacity,
  borderWidth,
  borderColor,
  data,
  onHover,
  onLeave,
  onClick,
}: WaffleCellProps) => (
  <circle
    r={size / 2}
    cx={x + size / 2}
    cy={y + size / 2}
    fill={fill || color}
    strokeWidth={borderWidth}
    stroke={borderColor}
    opacity={opacity}
    onMouseEnter={onHover}
    onMouseMove={onHover}
    onMouseLeave={onLeave}
    onClick={event => {
      onClick({ position, color, x, y, data }, event)
    }}
  />
)