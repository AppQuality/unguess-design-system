import { CellComponentProps, Datum } from "@nivo/waffle";
import { animated } from "@react-spring/web";
export interface WaffleCellProps
  extends CellComponentProps<{ id: string; value: number; label: string }> {
  borderColor: string;
}

// export const CustomCell = ({
//   animatedProps: { color, opacity, size, x, y },
//   borderRadius,
//   borderWidth,
//   borderColor,
//   padding,
//   ...props
// }: WaffleCellProps) => (
//   <circle
//     r={size.get() / 2}
//     cx={x.get() + size.get() / 2}
//     cy={y.get() + size.get() / 2}
//     fill={color.get()}
//     strokeWidth={borderWidth}
//     stroke={borderColor}
//     style={{ padding }}
//     opacity={opacity.get()}
//   />
// );

export const CustomCell = <D extends Datum>({
  cell,
  animatedProps,
  borderRadius,
  borderWidth,
  testIdPrefix,
}: CellComponentProps<D>) => (
  <animated.circle
    cx={animatedProps.x.get() + animatedProps.size.get() / 2}
    cy={animatedProps.y.get() + animatedProps.size.get() / 2}
    width={animatedProps.size}
    height={animatedProps.size}
    r={animatedProps.size.get() / 2}
    opacity={animatedProps.opacity}
    fill={cell.fill || animatedProps.color}
    data-test-id={testIdPrefix ? `${testIdPrefix}.cell_${cell.key}` : undefined}
  />
);
