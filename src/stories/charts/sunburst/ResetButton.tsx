import { theme as globalTheme } from "../../theme";
import styled from "styled-components";

const ResetText = styled.text<{ radius: number }>`
  font-size: ${({ radius, theme }) =>
    (parseInt(theme.fontSizes.md.replace("px", "")) * radius) / 130}px;
  cursor: pointer;

  fill: ${({ theme }) => theme.palette.blue[500]};
  &:hover {
    fill: ${({ theme }) => theme.palette.blue[700]};
  }
`;

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
    <ResetText onClick={onClick} radius={radius}>{`< Reset`}</ResetText>
  </g>
);

export default ResetButton;
