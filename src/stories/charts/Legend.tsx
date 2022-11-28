import { SM } from "../typography/typescale";
import styled from "styled-components";

const LegendColoredSquare = styled.div<{ color: string }>`
  background: ${({ color }) => color};
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-right: ${({ theme }) => theme.space.xs};
`;

const LegendItem = ({
  color,
  value,
}: {
  color: string;
  value: string | number;
}) => {
  return (
    <div style={{ display: "flex" }}>
      <LegendColoredSquare color={color} />
      <SM>{value}</SM>
    </div>
  );
};

const LegendWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
`;
const Legend = ({
  colors,
  data,
}: {
  colors: string[];
  data: (string | number)[];
}) => {
  const colorScheme = data.map((d, index) => {
    return { value: d, color: colors[index % colors.length] };
  });

  return (
    <LegendWrapper>
      {colorScheme.map((item) => (
        <LegendItem {...item} />
      ))}
    </LegendWrapper>
  );
};

export default Legend;
