import { CHARTS_COLOR_SCHEME_CATEGORICAL } from "../../theme/charts";
import { PieChartProps } from "./_types";
import { ThemeContext } from "styled-components";
import { useContext, useState } from "react";
import { HalfPieChartComponent } from "./HalfPieChartComponent";

const HalfPieChart = ({
  theme,
  colors,
  width,
  height,
  data,
  margin,
  showArcLinks,
}: PieChartProps) => {
  const themeContext = useContext(ThemeContext as React.Context<any>);

  const activeColors = colors ?? CHARTS_COLOR_SCHEME_CATEGORICAL;

  while (activeColors.length < data.length) {
    activeColors.push(...activeColors);
  }

  const numberOfColors = activeColors.length;
  const grayOutColors = (index: number) => {
    const newColors = Array(numberOfColors).fill(
      themeContext.palette.grey[200]
    );
    newColors[index] = activeColors[index];
    return newColors;
  };

  const [currentColors, setCurrentColors] = useState(grayOutColors(0));

  return (
    <div style={{ width, height, position: "relative" }}>
      <HalfPieChartComponent
        theme={theme}
        colors={currentColors}
        height={height}
        data={data}
        onMouseEnter={(data) => {
          setCurrentColors(grayOutColors(data.arc.index));
        }}
        onMouseLeave={() => {
          setCurrentColors(grayOutColors(0));
        }}
        showArcLinks={showArcLinks}
        margin={margin}
        mode="front"
      />
      <HalfPieChartComponent
        theme={theme}
        colors={activeColors}
        height={height}
        data={data}
        margin={margin}
        showArcLinks={showArcLinks}
        onMouseEnter={(data) => {
          setCurrentColors(grayOutColors(data.arc.index));
        }}
        onMouseLeave={() => {
          setCurrentColors(grayOutColors(0));
        }}
        mode="back"
      />
    </div>
  );
};
export { HalfPieChart };
