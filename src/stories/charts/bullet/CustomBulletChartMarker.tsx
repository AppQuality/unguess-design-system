import { BulletMarkersItemProps } from "@nivo/bullet";
import { animated } from "@react-spring/web";

export const CustomBulletChartMarkers = ({
  x,
  y,
  size,
  animatedProps: { color, transform }
}: BulletMarkersItemProps) => {
  return (
    <animated.circle
      transform={transform}
      cx={x}
      cy={y}
      fill={color}
      stroke={color}
      r={size}
    />
  );
};
