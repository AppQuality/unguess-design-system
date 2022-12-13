import { ComponentMeta, Story } from "@storybook/react";
import { BarChart } from ".";
import { BarChartProps } from "./_types";
import { data, keys } from "./_data";

const TemplateBar: Story<BarChartProps> = (args) => (
  <BarChart
    width="430px"
    height="260px"
    data={data}
    keys={keys}
    indexBy="bugType"
    axisBottom={{legend: "Bugs (Tot: 60)", offset: 50}}
    axisLeft={{legend: "Typology", offset: -140}}
    margin={{ top: 0, right: 8, bottom: 60, left: 145 }} />
);
export const Default = TemplateBar.bind({});

export default {
  title: "Atoms/Charts/Bar",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;
