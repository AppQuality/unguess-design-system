import { CompleteTheme } from "@nivo/core";
import { theme } from ".";
import { getColor } from "../theme/utils";

interface UnguessChartsTheme extends CompleteTheme {}

export const DEFAULT_CHARTS_THEME: UnguessChartsTheme = {
  background: theme.palette.white,
  text: {
    fontFamily: theme.fonts.system,
    outlineWidth: 0,
    outlineColor: "transparent",
    outlineOpacity: 0,
    fontSize: Number(theme.fontSizes.sm),
    fill: theme.palette.grey[600],
  },
  annotations: {
    text: {
      fontSize: Number(theme.fontSizes.sm),
      fill: getColor(theme.colors.primaryHue, 600) || theme.palette.blue[600],
      outlineWidth: 2,
      outlineColor: theme.palette.white,
      outlineOpacity: 1,
    },
    link: {
      stroke: getColor(theme.colors.primaryHue, 600) || theme.palette.blue[600],
      strokeWidth: 1,
      outlineWidth: 2,
      outlineColor: theme.palette.white,
      outlineOpacity: 1,
    },
    outline: {
      stroke: getColor(theme.colors.primaryHue, 600) || theme.palette.blue[600],
      strokeWidth: 2,
      outlineWidth: 2,
      outlineColor: theme.palette.white,
      outlineOpacity: 1,
    },
    symbol: {
      fill: getColor(theme.colors.primaryHue, 600) || theme.palette.blue[600],
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
        fontFamily: theme.fonts.system,
        outlineWidth: 0,
        outlineColor: "transparent",
        outlineOpacity: 0,
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
        fontFamily: theme.fonts.system,
        outlineWidth: 0,
        outlineColor: "transparent",
        outlineOpacity: 0,
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
      fontFamily: theme.fonts.system,
      outlineWidth: 0,
      outlineColor: "transparent",
      outlineOpacity: 0,
      fill: theme.palette.grey[600],
      fontSize: Number(theme.fontSizes.sm),
    },
  },
  grid: {
    line: {
      stroke: theme.palette.grey[600],
      strokeWidth: 0.5,
    },
  },
  labels: {
    text: {
      fontFamily: theme.fonts.system,
      outlineWidth: 0,
      outlineColor: "transparent",
      outlineOpacity: 0,
      fill: theme.palette.grey[600],
      fontSize: Number(theme.fontSizes.sm),
    },
  },
  legends: {
    hidden: {
      symbol: {
        fill: theme.palette.grey[600],
        opacity: 0.5,
      },
      text: {
        fontFamily: theme.fonts.system,
        outlineWidth: 0,
        outlineColor: "transparent",
        outlineOpacity: 0,
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.palette.grey[600],
        opacity: 1,
      },
    },
    title: {
      text: {
        fontFamily: theme.fonts.system,
        outlineWidth: 0,
        outlineColor: "transparent",
        outlineOpacity: 0,
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.palette.grey[600],
      },
    },
    text: {
      fontFamily: theme.fonts.system,
      outlineWidth: 0,
      outlineColor: "transparent",
      outlineOpacity: 0,
      fontWeight: theme.fontWeights.bold,
      fontSize: Number(theme.fontSizes.sm),
      fill: theme.palette.grey[600],
    },
    ticks: {
      line: {},
      text: {
        fontFamily: theme.fonts.system,
        outlineWidth: 0,
        outlineColor: "transparent",
        outlineOpacity: 0,
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
      outlineWidth: 0,
      outlineColor: "transparent",
      outlineOpacity: 0,
      fontFamily: theme.fonts.system,
      fontSize: Number(theme.fontSizes.sm),
      fill: theme.palette.grey[600],
    },
  },
  tooltip: {
    container: {
      background: theme.palette.white,
      color: getColor(theme.colors.primaryHue, 600),
      fontSize: Number(theme.fontSizes.sm),
    },
    basic: {},
    chip: {},
    table: {},
    tableCell: {},
    tableCellValue: {},
    wrapper: {},
  },
};

export const CHARTS_COLOR_SCHEME_MONO = [
  theme.palette.teal[700],
  theme.palette.grey[200],
];

export const CHARTS_COLOR_SCHEME_SEMANTIC = [
  theme.palette.red[900],
  theme.palette.yellow[700],
  theme.palette.azure[900],
  theme.palette.teal[700],
  theme.palette.grey[200],
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL = [
  theme.palette.teal[700],
  theme.palette.pink[900],
  theme.palette.purple[300],
  theme.palette.crimson[500],
  theme.palette.royal[900],
  theme.palette.lemon[700],
];
