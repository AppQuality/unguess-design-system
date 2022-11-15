import { BulletMarkersItemProps } from "@nivo/bullet";
import { animated } from "@react-spring/web";

export const CustomBulletChartMarkers = ({
  x,
  y,
  size,
  animatedProps: { color, transform },
  data,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
  onClick,
}: BulletMarkersItemProps) => {
  return (
    <animated.circle
      transform={transform}
      cx={x}
      cy={y}
      fill={color}
      stroke={color}
      r={size}
      // @ts-ignore onMouseMove event for circle is not supported, but it works
      onMouseMove={(event) => onMouseMove(data, event)}
      // @ts-ignore onMouseEnter event for circle is not supported, but it works
      onMouseEnter={(event) => onMouseEnter(data, event)}
      // @ts-ignore onMouseLeave event for circle is not supported, but it works
      onMouseLeave={(event) => onMouseLeave(data, event)}
      // @ts-ignore onClick event for circle is not supported, but it works
      onClick={(event) => onClick(data, event)}
    />
  );
};
