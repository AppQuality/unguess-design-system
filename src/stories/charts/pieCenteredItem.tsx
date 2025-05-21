import { theme as globalTheme } from "../theme";

const CenteredItem = ({
  centerX,
  centerY,
  theme,
  radius,
  label,
  value,
  fontSizeMultiplier,
}: {
  centerX: number;
  centerY: number;
  radius: number;
  theme: typeof globalTheme;
  label?: string;
  value?: string;
  fontSizeMultiplier?: number;
}) => {
  const parameter = 6;
  const fontSizeFactor =
    ((fontSizeMultiplier ? fontSizeMultiplier : 1) * radius) / (14 * parameter);
  const spacing = radius / 6.5;
  const shift = radius / 12;
  return (
    <>
      {label && (
        <g transform={`translate(${centerX},${centerY})`}>
          <text
            textAnchor="middle"
            fill={theme.palette.grey[600]}
            style={{
              fontSize:
                parseInt(theme.fontSizes.md.replace("px", "")) * fontSizeFactor,
            }}
          >
            <tspan dy={value ? shift - spacing : shift}>{label}</tspan>
          </text>
        </g>
      )}
      {value && (
        <g transform={`translate(${centerX},${centerY})`}>
          <text
            textAnchor="middle"
            fill={theme.palette.blue[600]}
            style={{
              fontSize:
                parseInt(theme.fontSizes.xxl.replace("px", "")) *
                fontSizeFactor,
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            <tspan dy={label ? shift + spacing : shift}>{value}</tspan>
          </text>
        </g>
      )}
    </>
  );
};

export default CenteredItem;
