import { CompleteTheme } from "@nivo/core";
import { theme } from ".";

interface UnguessChartsTheme extends CompleteTheme {}

export const DEFAULT_CHARTS_THEME: UnguessChartsTheme = {
  background: theme.palette.white,
  fontSize: Number(theme.fontSizes.sm), // Not used
  fontFamily: theme.fonts.system,
  textColor: theme.palette.grey[600],
  annotations: {
    text: {
      fontSize: Number(theme.fontSizes.sm),
      fill: theme.colors.primaryHue,
      outlineWidth: 2,
      outlineColor: theme.palette.white,
      outlineOpacity: 1,
    },
    link: {
      stroke: theme.colors.primaryHue,
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: theme.palette.white,
      outlineOpacity: 1,
    },
    outline: {
      stroke: theme.colors.primaryHue,
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: theme.palette.white,
      outlineOpacity: 1,
    },
    symbol: {
      fill: theme.colors.primaryHue,
      outlineWidth: 2,
      outlineColor: theme.palette.white,
      outlineOpacity: 1,
    },
  },
  axis: {
    domain: {
      line: {
        stroke: theme.palette.grey[600],
        strokeWidth: 2,
      },
    },
    legend: {
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.palette.grey[600],
      },
    },
    ticks: {
      line: {
        stroke: theme.palette.grey[600],
        strokeWidth: 3,
      },
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.palette.grey[600],
      },
    },
  },
  crosshair: {
    line: {
      stroke: theme.palette.grey[600],
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: "6 6",
    },
  },
  dots: {
    text: {
      fill: theme.palette.grey[600],
      fontSize: Number(theme.fontSizes.sm),
      fontFamily: theme.fonts.system,
    },
  },
  grid: {
    line: {
      stroke: theme.palette.grey[600],
      strokeWidth: .5,
    },
  },
  labels: {
    text: {
      fill: theme.palette.grey[600],
      fontSize: Number(theme.fontSizes.sm),
      fontFamily: theme.fonts.system,
    },
  },
  legends: {
    hidden: {
      symbol: {
        fill: theme.palette.grey[600],
        opacity: 0.5,
      },
      text: {
        opacity: 1,
      },
    },
    title: {
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.palette.grey[600],
      },
    },
    text: {
      fontWeight: theme.fontWeights.bold,
      fontSize: Number(theme.fontSizes.sm),
      fill: theme.palette.grey[600],
    },
    ticks: {
      line: {},
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.palette.grey[600],
      },
    },
  },
  markers: {
    lineColor: theme.palette.grey[600],
    lineStrokeWidth: 1,
    textColor: theme.palette.grey[600],
    fontSize: theme.fontSizes.sm,
    text: {
      fontFamily: theme.fonts.system,
    },
  },
  tooltip: {
    container: {
      background: theme.palette.white,
      color: theme.colors.primaryHue,
      fontSize: Number(theme.fontSizes.sm),
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

export const chartColors = {
  darkPine: "#02807A",
  lightGrey: theme.palette.grey[200],
  darkGrey: theme.palette.grey[600],
  mattone: "#800208",
  gubbioLight: "#C78430",
  blueRoyal: "#024780",
  greenLight: "#5FA41C",
  blue: "#020880",
  fucsia: "#CE2A7A",
  violet: "#573ECF",
  orchidea: "#B75CAD",
  sky: "#3392CE",
}

 export const CHARTS_COLOR_SCHEME_MONO = [
  chartColors.darkPine,
  chartColors.lightGrey,
 ];

export const CHARTS_COLOR_SCHEME_SEMANTIC = [
  chartColors.mattone, // Mattone 900
  chartColors.gubbioLight, // Gubbio light 600
  chartColors.blueRoyal, // Blue royal 900
  chartColors.darkPine, // Dark pine 900
  chartColors.lightGrey,
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL_5 = [
  chartColors.greenLight, // Green light 700
  chartColors.blue, // Blue 900
  chartColors.fucsia, // Fucsia 700
  chartColors.violet, // Violet 500
  chartColors.orchidea, // Orchidea 300
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL_8_A = [
  chartColors.darkPine, // Dark pine 900
  chartColors.fucsia, // Fucsia 700
  chartColors.violet, // Violet 500
  chartColors.greenLight, // Green light 700
  chartColors.mattone, // Mattone 900
  chartColors.sky, // Sky 500
  chartColors.orchidea, // Orchidea 300
  chartColors.blue, // Blue 900
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL_8_B = [
  chartColors.sky, // Sky 500
  chartColors.orchidea, // Orchidea 300
  chartColors.blue, // Blue 900
  chartColors.darkPine, // Dark pine 900
  chartColors.fucsia, // Fucsia 700
  chartColors.violet, // Violet 500
  chartColors.greenLight, // Green light 700
  chartColors.mattone, // Mattone 900
];
