import { CompleteTheme } from "@nivo/core";
import { theme } from ".";

interface UnguessChartsTheme extends CompleteTheme {}

export const DEFAULT_CHARTS_THEME: UnguessChartsTheme = {
  background: theme.palette.white,
  fontSize: Number(theme.fontSizes.xs), // Not used
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
        strokeWidth: 1,
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
        strokeWidth: 1,
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
      strokeWidth: 1,
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
      color: theme.palette.grey[600],
      fontSize: Number(theme.fontSizes.sm),
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
  },
};

export const CHARTS_COLOR_SCHEME_MONO = [
  "#02807A", // Dark pine 900
  theme.palette.grey[200],
];

export const CHARTS_COLOR_SCHEME_SEMANTIC = [
  "#800208", // Mattone 900
  "#C78430", // Gubbio light 600
  "#024780", // Blue royal 900
  "#02807A", // Dark pine 900
  theme.palette.grey[200],
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL_5 = [
  "#5FA41C", // Green light 700
  "#020880", // Blue 900
  "#CE2A7A", // Fucsia 700
  "#573ECF", // Violet 500
  "#B75CAD", // Orchidea 300
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL_8_A = [
  "#02807A", // Dark pine 900
  "#CE2A7A", // Fucsia 700
  "#573ECF", // Violet 500
  "#5FA41C", // Green light 700
  "#800208", // Mattone 900
  "#3392CE", // Sky 500
  "#B75CAD", // Orchidea 300
  "#020880", // Blue 900
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL_8_B = [
  "#3392CE", // Sky 500
  "#B75CAD", // Orchidea 300
  "#020880", // Blue 900
  "#02807A", // Dark pine 900
  "#CE2A7A", // Fucsia 700
  "#573ECF", // Violet 500
  "#5FA41C", // Green light 700
  "#800208", // Mattone 900
];
