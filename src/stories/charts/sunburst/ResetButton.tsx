import { theme as globalTheme } from "../../theme";

const ResetButton = ({
  centerX,
  centerY,
  radius,
  theme,
  onClick,
}: {
  centerX: number;
  centerY: number;
  radius: number;
  theme: typeof globalTheme;
  onClick: () => void;
}) => (
  <g transform={`translate(${centerX - radius},${centerY - radius})`}>
    <text
      style={{
        fontSize:
          (parseInt(theme.fontSizes.md.replace("px", "")) * radius) / 130,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {`< Reset`}
    </text>
  </g>
);

export default ResetButton;
