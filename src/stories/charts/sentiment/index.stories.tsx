import { ComponentMeta, Story } from "@storybook/react";
import LineChart from ".";


const Template: Story<any> = (args) => (
  <LineChart />
);

export const Default = Template.bind({});
Default.args = {
};

export default {
  title: "Atoms/Charts/LineD3Pure",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;
