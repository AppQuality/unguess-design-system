import { PieSvgProps } from "@nivo/pie";

interface PieDatum {
  [key: string]: string | number;
}

export interface PieChartProps {
  data: PieDatum[];
  width?: string;
  height?: string;
  theme?: PieSvgProps<PieDatum>["theme"];
  colors?: string[];
  showArcLinks?: boolean;
  margin?:PieSvgProps<PieDatum>["theme"];
}
