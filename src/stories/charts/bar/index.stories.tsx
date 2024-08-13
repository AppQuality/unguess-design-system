import { Meta, StoryFn } from "@storybook/react";
import { BarChart } from ".";
import { BarChartProps } from "./_types";
import { data } from "./_data";

const Template: StoryFn<BarChartProps> = (args) => (
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
  legend: { columns: 4, marginTop: "200px" },
};

export const WithCustomTooltip = Template.bind({});
WithCustomTooltip.args = {
  data: data,
  tooltip: (node) => (
    <>
      <div style={{ width: "500px", background: "red", color: "white" }}>
        {JSON.stringify(node.value)}
      </div>
      <div style={{ width: "500px", background: "yellow" }}>
        {JSON.stringify(node.label)}
      </div>
      {node.data?.custom_data && (
        <div style={{ width: "500px", background: "purple", color: "white" }}>
          {JSON.stringify(node.data.custom_data)}
        </div>
      )}
    </>
  ),
};

export default {
  title: "Atoms/Charts/Bar",
  component: BarChart,
} as Meta<typeof BarChart>;
