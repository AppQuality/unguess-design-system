import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { WaffleChart } from ".";
import { WaffleChartProps } from "./_types";

const Template: Story<WaffleChartProps> = (args) => <WaffleChart {...args} />;
export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "90vh",
  data: {
    label: "Unique bugs",
    value: 30,
  },
  total: {
    label: "Total bugs",
    value: 100,
  },
};

export const WithCustomTooltip = Template.bind({});
WithCustomTooltip.args = {
  width: "100%",
  height: "90vh",
  data: {
    label: "Unique bugs",
    value: 30,
  },
  total: {
    label: "Total bugs",
    value: 100,
  },
  tooltip: ({ label, value }) => (
    <>
      <div
        style={{
          background: "purple",
          color: "white",
          padding: "10px",
          margin: "0",
        }}
      >
        {`i'm the label ${label}!`}
      </div>
      <div
        style={{ color: "yellow", background: "red" }}
      >{`and i'm the value ${value}!`}</div>
    </>
  ),
};
export default {
  title: "Atoms/Charts/Waffle",
  component: WaffleChart,
} as ComponentMeta<typeof WaffleChart>;
