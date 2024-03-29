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
  const spacing =
    ((fontSizeMultiplier ? fontSizeMultiplier : 1) * radius) /
    (parameter * 0.9);
  const shift = -radius / (parameter * 2.5);
  return (
    <>
      {label && (
        <g transform={`translate(${centerX},${centerY})`}>
          <text
            textAnchor="middle"
            baselineShift={shift + (value ? spacing : spacing / 2)}
            fill={theme.palette.grey[600]}
            style={{
              fontSize:
                parseInt(theme.fontSizes.md.replace("px", "")) * fontSizeFactor,
            }}
          >
            {label}
          </text>
        </g>
      )}
      {value && (
        <g transform={`translate(${centerX},${centerY})`}>
          <text
            textAnchor="middle"
            baselineShift={shift - (label ? spacing : spacing / 2)}
            fill={theme.palette.blue[600]}
            style={{
              fontSize:
                parseInt(theme.fontSizes.xxl.replace("px", "")) *
                fontSizeFactor,
              fontWeight: theme.fontWeights.semibold,
            }}
          >
            {value}
          </text>
        </g>
      )}
    </>
  );
};

export default CenteredItem;
