import { ComponentMeta, Story } from "@storybook/react";
import { PieChart } from ".";
import { PieChartProps } from "./_types";

const Template: Story<PieChartProps> = (args) => <PieChart {...args} />;

const data = [
  {
    id: "sass",
    label: "sass label",
    value: 309,
    custom_data: "custom data",
  },
  {
    id: "make",
    label: "make label",
    value: 420,
  },
  {
    id: "erlang",
    label: "erlang label",
    value: 300,
  },
  {
    id: "lisp",
    label: "lisp label",
    value: 491,
  },
  {
    id: "go",
    label: "go label",
    value: 108,
  },
];

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  data: data,
  centerItem: {
    label: "Tot. bugs",
    value: "27",
  },
  legend: { columns: 4 },
};

export const WithCustomTooltip = Template.bind({});
WithCustomTooltip.args = {
  width: "100%",
  height: "100vh",
  data: data,
  centerItem: {
    label: "Tot. bugs",
    value: "27",
  },
  tooltip: ({ label, value, data }) => (
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
      {data?.custom_data && (
        <div
          style={{ color: "red", background: "yellow" }}
        >{`and this is other stuff ${JSON.stringify(data.custom_data)}!`}</div>
      )}
    </>
  ),
};
export default {
  title: "Atoms/Charts/Pie",
  component: PieChart,
} as ComponentMeta<typeof PieChart>;
