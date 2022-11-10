import { ComponentMeta, Story } from "@storybook/react";
import { HalfPieChart } from ".";
import { PieChartProps } from "./_types";

const Template: Story<PieChartProps> = (args) => <HalfPieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  data: [
    {
      id: "sass",
      label: "sass",
      value: 108,
    },
    {
      id: "make",
      label: "make",
      value: 108,
    },
    {
      id: "erlang",
      label: "erlang",
      value: 108,
    },
    {
      id: "lisp",
      label: "lisp",
      value: 108,
    },
    {
      id: "go",
      label: "go",
      value: 108,
    },
    {
      id: "goo",
      label: "go",
      value: 108,
    },
    {
      id: "High",
      label: "go",
      value: 108,
    },
  ],
};

export default {
  title: "Atoms/Charts/HalfPie",
  component: HalfPieChart,
} as ComponentMeta<typeof HalfPieChart>;
