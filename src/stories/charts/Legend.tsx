import { SM } from "../typography/typescale";
import { Ellipsis } from "../typography/ellipsis";
import styled, { ThemeContext } from "styled-components";
import { useRef, useState, useEffect, useContext } from "react";

const StyledEllipsis = styled(Ellipsis)<{ width?: number }>`
  ${({ width }) => width && `max-width: ${width}px;`}
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

const LegendItemWrapper = styled.div<{ margin: number }>`
  display: flex;
  align-items: center;
  margin: ${({ margin }) => margin}px;
  flex: 0 0 auto;
`;

const LegendItem = ({
  color,
  value,
  width,
  columns,
}: {
  color: string;
  value: string | number;
  width: number;
  columns: number;
}) => {
  const theme = useContext(ThemeContext as React.Context<any>);

  const squareSide = theme.space.base * 3;
  const marginRight = theme.space.base * 2;
  const itemMargin = theme.space.base * 1.5;

  return (
    <LegendItemWrapper margin={itemMargin}>
      <LegendColoredSquare
        color={color}
        size={squareSide}
        marginRight={marginRight}
      />
      <SM>
        <StyledEllipsis
          width={
            width / columns - squareSide - marginRight - itemMargin * 2 - 1
          }
        >
          {value}
        </StyledEllipsis>
      </SM>
    </LegendItemWrapper>
  );
};

const LegendWrapper = styled.div`
  width: 75%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

const Legend = ({
  colors,
  data,
  columns = 2,
}: {
  colors: string[];
  data: (string | number)[];
  columns?: number;
}) => {
  const [width, setWidth] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);
  const colorScheme = data.map((d, index) => {
    return { value: d, color: colors[index % colors.length] };
  });

  useEffect(() => {
    if (ref.current) {
      setWidth(ref.current.clientWidth);
    }
  }, [ref]);

  return (
    <LegendWrapper ref={ref}>
      {width
        ? colorScheme.map((item, i) => (
            <LegendItem key={i} {...item} width={width} columns={columns} />
          ))
        : null}
    </LegendWrapper>
  );
};

export default Legend;
