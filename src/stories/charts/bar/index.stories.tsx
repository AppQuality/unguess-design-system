import { ComponentMeta, Story } from "@storybook/react";
import { BarChart } from ".";
import { BarChartProps } from "./_types";
import { data } from "./_data";

const TemplateBar: Story<BarChartProps> = () => (
  <BarChart
    width="100%"
    height="300px"
    data={data}
    axisBottomLabel="Bugs (Tot: 82)"
    axisLeftLabel="Typology"
    margin={{ top: 25, right: 25, bottom: 50, left: 150 }}
  />
);
export const Default = TemplateBar.bind({});

export default {
  title: "Atoms/Charts/Bar",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;
