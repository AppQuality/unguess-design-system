import { ComponentMeta, Story } from "@storybook/react";
import { LineChart } from ".";
import { LineChartProps } from "./_types";
import { data } from "./_data";
import { theme } from "../../theme";

const Template: Story<LineChartProps> = (args) => (
  <LineChart
    width="100%"
    height="300px"
    axisBottomLabel={`UseCase (Tot: ${args.data[0].data.length})`}
    margin={{ top: 25, right: 75, bottom: 75, left: 75 }}
    colors={[theme.palette.grey[600]]}
    isScrollable
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
      <div style={{ width: "200px", background: "red", color: "white" }}>
        {JSON.stringify(node.value)}
      </div>
      <div style={{ width: "200px", background: "yellow" }}>
        {JSON.stringify(node.label)}
      </div>
      {node.data?.custom_data && (
        <div style={{ width: "200px", background: "purple", color: "white" }}>
          {JSON.stringify(node.data.custom_data)}
        </div>
      )}
    </>
  ),
};

export default {
  title: "Atoms/Charts/Line",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;
