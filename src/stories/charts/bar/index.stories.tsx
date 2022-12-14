import { ComponentMeta, Story } from "@storybook/react";
import { BarChart } from ".";
import { BarChartProps } from "./_types";
import { data } from "./_data";

const Template: Story<BarChartProps> = (args) => (
  <BarChart
    width="100%"
    height="300px"
    axisBottomLabel="Bugs (Tot: 82)"
    axisLeftLabel="Typology"
    margin={{ top: 25, right: 25, bottom: 50, left: 150 }}
    colors={["#02807a", "#024780", "#c78430", "#800208"]}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  data: data,
};

export default {
  title: "Atoms/Charts/Bar",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;
