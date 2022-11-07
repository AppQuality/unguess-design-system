import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { PieChart } from ".";
import { PieChartProps } from "./_types";

const Template: Story<PieChartProps> = (args) => <PieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
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
      value: 300,
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
  borderWidth: 1,
  borderColor: {
    from: "color",
    modifiers: [["darker", 0.2]],
  },
  arcLinkLabelsThickness: 2,
  arcLinkLabelsTextColor: theme.palette.grey[600],
  legends: [
    {
      anchor: "bottom",
      direction: "row",
      justify: false,
      translateX: 0,
      translateY: 56,
      itemsSpacing: 0,
      itemWidth: 100,
      itemHeight: 16,
      itemTextColor: "#999",
      itemDirection: "left-to-right",
      itemOpacity: 1,
      symbolSize: 12,
      symbolShape: "square",
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
  title: "Charts/Pie",
  component: PieChart,
} as ComponentMeta<typeof PieChart>;
