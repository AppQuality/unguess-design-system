import { ComponentMeta, Story } from "@storybook/react";
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
  centerItem: {
    label: "Tot. bugs",
    value: "27",
  },
};

export default {
  title: "Atoms/Charts/Pie",
  component: PieChart,
} as ComponentMeta<typeof PieChart>;
