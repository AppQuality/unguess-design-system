import { SM } from "../typography/typescale";
import { Ellipsis } from "../typography/ellipsis";
import styled, { ThemeContext } from "styled-components";
import { useContext } from "react";

const StyledEllipsis = styled(Ellipsis)`
  max-width: 100%;
`;

const LegendColoredSquare = styled.div<{
  color: string;
  size: number;
  marginRight: number;
}>`
  background: ${({ color }) => color};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  margin-right: ${({ marginRight }) => marginRight}px;
`;

const LegendItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.space.base * 1.5}px;
  flex: 0 0 auto;
  overflow: hidden;
`;

const StyledSM = styled(SM)<{ squareSize: number }>`
  max-width: calc(100% - ${({ squareSize }) => squareSize}px);
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const LegendItem = ({
  color,
  value,
}: {
  color: string;
  value: string | number;
}) => {
  const theme = useContext(ThemeContext as React.Context<any>);

  const squareSide = theme.space.base * 3;
  const marginRight = theme.space.base * 2;

  return (
    <LegendItemWrapper>
      <LegendColoredSquare
        color={color}
        size={squareSide}
        marginRight={marginRight}
      />
      <StyledSM isBold squareSize={squareSide + marginRight}>
        <StyledEllipsis>{value}</StyledEllipsis>
      </StyledSM>
    </LegendItemWrapper>
  );
};

const LegendWrapper = styled.div<{
  columns: number;
  width: string;
  marginTop?: string;
}>`
  width: ${({ width }) => width};
  margin: 0 auto;
  margin-top: ${({ marginTop }) => marginTop || 0};
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns}, 1fr);
`;

const Legend = ({
  colors,
  data,
  columns = 2,
  width = "75%",
  marginTop,
}: {
  colors: string[];
  data: (string | number)[];
} & LegendType) => {
  const colorScheme = data.map((d, index) => {
    return { value: d, color: colors[index % colors.length] };
  });

  return (
    <LegendWrapper columns={columns} width={width} marginTop={marginTop}>
      {colorScheme.map((item) => (
        <LegendItem key={item.value} {...item} />
      ))}
    </LegendWrapper>
  );
};

export default Legend;

type LegendType = {
  columns?: number;
  width?: string;
  marginTop?: string;
};
export type { LegendType };
