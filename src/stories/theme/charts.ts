import { CompleteTheme } from "@nivo/core";
import {getColor} from "../theme/utils";
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
      strokeWidth: 0.5,
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
      color: getColor(theme.colors.primaryHue, 600),
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
  theme.palette.teal[700],
  theme.palette.grey[200],
];

export const CHARTS_COLOR_SCHEME_SEMANTIC = [
  theme.palette.red[900],
  theme.palette.yellow[700],
  theme.palette.azure[900],
  theme.palette.teal[700],
  theme.palette.grey[200]
];

export const CHARTS_COLOR_SCHEME_CATEGORICAL = [
  theme.palette.teal[700],
  theme.palette.pink[900],
  theme.palette.purple[300],
  theme.palette.crimson[500],
  theme.palette.royal[900],
  theme.palette.lemon[700],
];
