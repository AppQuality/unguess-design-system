import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { PieChart } from ".";
import { PieChartProps } from "./_types";

const Template: Story<PieChartProps> = (args) => <PieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  theme: {
    textColor: theme.colors.primaryHue,
    fontFamily: theme.fonts.system,
  },
  data: [
    {
      id: "sass",
      label: "sass",
      value: 309,
      color: "hsl(162, 70%, 50%)",
    },
    {
      id: "make",
      label: "make",
      value: 420,
      color: "hsl(175, 70%, 50%)",
    },
    {
      id: "erlang",
      label: "erlang",
      value: 3,
      color: "hsl(159, 70%, 50%)",
    },
    {
      id: "lisp",
      label: "lisp",
      value: 491,
      color: "hsl(243, 70%, 50%)",
    },
    {
      id: "go",
      label: "go",
      value: 108,
      color: "hsl(163, 70%, 50%)",
    },
  ],
  margin: {
    top: 40,
    right: 80,
    bottom: 80,
    left: 80,
  },
  innerRadius: 0.5,
  padAngle: 0.7,
  cornerRadius: 3,
  activeOuterRadiusOffset: 8,
  borderWidth: 1,
  borderColor: {
    from: "color",
    modifiers: [["darker", 0.2]],
  },
  arcLinkLabelsSkipAngle: 10,
  arcLinkLabelsTextColor: theme.colors.primaryHue,
  arcLinkLabelsThickness: 1,
  arcLinkLabelsColor: theme.colors.primaryHue,
  arcLabelsSkipAngle: 10,
  arcLabelsTextColor: theme.colors.primaryHue,
  defs: [
    {
      id: "dots",
      type: "patternDots",
      background: "inherit",
      color: "rgba(255, 255, 255, 0.3)",
      size: 4,
      padding: 1,
      stagger: true,
    },
    {
      id: "lines",
      type: "patternLines",
      background: "inherit",
      color: "rgba(255, 255, 255, 0.3)",
      rotation: -45,
      lineWidth: 6,
      spacing: 10,
    },
  ],
  fill: [
    {
      match: {
        id: "ruby",
      },
      id: "dots",
    },
    {
      match: {
        id: "c",
      },
      id: "dots",
    },
    {
      match: {
        id: "go",
      },
      id: "dots",
    },
    {
      match: {
        id: "python",
      },
      id: "dots",
    },
    {
      match: {
        id: "scala",
      },
      id: "lines",
    },
    {
      match: {
        id: "lisp",
      },
      id: "lines",
    },
    {
      match: {
        id: "elixir",
      },
      id: "lines",
    },
    {
      match: {
        id: "javascript",
      },
      id: "lines",
    },
  ],
  legends: [
    {
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: 56,
      itemsSpacing: 0,
      itemWidth: 100,
      itemHeight: 18,
      itemTextColor: "#999",
      itemDirection: "left-to-right",
      itemOpacity: 1,
      symbolSize: 18,
      symbolShape: "circle",
      effects: [
        {
          on: "hover",
          style: {
            itemTextColor: "#000",
          },
        },
      ],
    },
  ],
};

export default {
  title: "Charts/PieChart",
  component: PieChart,
} as ComponentMeta<typeof PieChart>;
