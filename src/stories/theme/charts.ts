import { CompleteTheme } from "@nivo/core";
import { theme } from ".";

interface UnguessChartsTheme extends CompleteTheme {};

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
        stroke: theme.palette.grey["300"],
        strokeWidth: 1,
      },
    },
    legend: {
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.colors.primaryHue,
      },
    },
    ticks: {
      line: {
        stroke: theme.palette.grey["300"],
        strokeWidth: 1,
      },
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.colors.primaryHue,
      },
    },
  },
  crosshair: {
    line: {
      stroke: theme.colors.primaryHue,
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: "6 6",
    },
  },
  dots: {
    text: {
        fill: theme.colors.primaryHue,
        fontSize: Number(theme.fontSizes.sm),
        fontFamily: theme.fonts.system,
    }
  },
  grid: {
    line: {
      stroke: theme.palette.grey["300"],
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
        fill: theme.palette.grey[300],
        opacity: 0.5,
      },
      text: {
        opacity: 1,
      },
    },
    title: {
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.colors.primaryHue,
      },
    },
    text: {
      fontSize: Number(theme.fontSizes.sm),
      fill: theme.colors.primaryHue,
    },
    ticks: {
      line: {},
      text: {
        fontSize: Number(theme.fontSizes.sm),
        fill: theme.colors.primaryHue,
      },
    },
  },
  markers: {
    lineColor: theme.colors.primaryHue,
    lineStrokeWidth: 1,
    textColor: theme.colors.primaryHue,
    fontSize: theme.fontSizes.sm,
    text: {
        fontFamily: theme.fonts.system,
    }
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

export const CHARTS_COLOR_SCHEME_DARK = [
  "#B86B27",
  "#02803B",
  "#7A0280",
  "#800208",
  "#020880",
  "#02807A",
  "#024780",
];

export const CHARTS_COLOR_SCHEME_BRIGHT = [
  "#573ECF",
  "#CE2A7A",
  "#B327B8",
  "#B75CAD",
  "#C78430",
  "#BA261E",
  "#5FA41C",
  "#029E99",
  "#3392CE",
];