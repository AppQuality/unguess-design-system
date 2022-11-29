import { SunburstSvgProps } from "@nivo/sunburst";

export interface SunburstData {
  name: string;
  children?: SunburstData[];
  value?: number;
}

export interface SunburstChartProps {
  data: SunburstData;
  width?: string;
  height?: string;
  margin?: SunburstSvgProps<SunburstData>["margin"];
  theme?: SunburstSvgProps<SunburstData>["theme"];
  colors?: SunburstSvgProps<SunburstData>["colors"];
  centerItem?: { label?: string; value?: string; fontSizeMultiplier?: number };
  onChange?: (data:SunburstData ) => void
}
