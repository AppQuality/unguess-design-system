import { ComponentMeta, Story } from "@storybook/react";
import { HalfPieChart } from ".";
import { PieChartProps } from "./_types";
import { theme } from "../../theme";

const Template: Story<PieChartProps> = (args) => <HalfPieChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  colors: ["#800208", "#c78430", "#024780", theme.palette.teal[900]],
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
} as ComponentMeta<typeof HalfPieChart>;
