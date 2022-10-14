import { CompleteTheme } from "@nivo/core";
import { theme } from ".";

interface UnguessChartsTheme extends CompleteTheme {};

export const DEFAULT_CHARTS_THEME: UnguessChartsTheme = {
  background: theme.palette.white,
  textColor: theme.colors.primaryHue,
  fontSize: Number(theme.fontSizes.sm),
  crosshair: {
    line: {
      stroke: theme.colors.primaryHue,
      strokeWidth: 1,
      strokeOpacity: 0.75,
      strokeDasharray: "6 6",
    },
  },
  fontFamily: theme.fonts.system,
  labels: {
    text: {
      fill: theme.colors.primaryHue,
      fontSize: Number(theme.fontSizes.sm),
      fontFamily: theme.fonts.system,
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
  dots: {
    text: {
        fill: theme.colors.primaryHue,
        fontSize: Number(theme.fontSizes.sm),
        fontFamily: theme.fonts.system,
    }
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
  grid: {
    line: {
      stroke: theme.palette.grey["300"],
      strokeWidth: 1,
    },
  },
  legends: {
    hidden: {
      symbol: {
        fill: theme.palette.grey["300"],
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
