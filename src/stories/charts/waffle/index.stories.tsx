import { ComponentMeta, Story } from "@storybook/react";
import { WaffleChart } from ".";
import { WaffleChartProps } from "./_types";

const Template: Story<WaffleChartProps> = (args) => <WaffleChart {...args} />;
export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "90vh",
  data: [
    {
      label: "Unique bugs",
      value: 30,
    },
    {
      label: "Total bugs",
      value: 100,
    },
  ],
};

export default {
  title: "Atoms/Charts/Waffle",
  component: WaffleChart,
} as ComponentMeta<typeof WaffleChart>;
