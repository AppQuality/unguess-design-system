import { Meta, StoryFn } from "@storybook/react";
import { HalfPieChart } from ".";
import { PieChartProps } from "./_types";

const Template: StoryFn<PieChartProps> = (args) => <HalfPieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  colors: ["#800208", "#c78430", "#024780", "#02807a"],
  data: [
    {
      id: "sass",
      label: "sass",
      value: 400,
    },
    {
      id: "make",
      label: "make",
      value: 108,
    },
    {
      id: "erlang",
      label: "erlang",
      value: 70,
    },
  ],
};

export default {
  title: "Atoms/Charts/HalfPie",
  component: HalfPieChart,
} as Meta<typeof HalfPieChart>;
