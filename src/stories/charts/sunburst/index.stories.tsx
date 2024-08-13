import { Meta, StoryFn } from "@storybook/react";
import { SunburstChart } from ".";
import { SunburstChartProps } from "./_types";

const Template: StoryFn<SunburstChartProps> = (args) => (
  <SunburstChart
    {...args}
    onChange={(data) => {
      console.log(data);
    }}
  />
);

const data = [
  {
    name: "desktop",
    label: "Desktop",
    custom_data: "custom data",
    children: [
      {
        name: "Windows",
        children: [
          { name: "Notebook1", label: "Notebook", value: 34 },
          { name: "Gaming PC", value: 9 },
        ],
      },
      {
        name: "MacOS",
        children: [{ name: "Notebook", value: 6 }],
      },
    ],
  },
  {
    name: "smartphone",
    children: [
      {
        name: "Android",
        children: [
          {
            name: "Huawei P30 Lite",
            value: 9,
          },
          {
            name: "Samsung Galaxy A52s",
            value: 14,
          },
          {
            name: "Xiaomi Poco X3 Pro",
            value: 22,
          },
          {
            name: "Samsung Galaxy A80",
            value: 16,
          },
        ],
      },
      {
        name: "smartphone iOS",
        label: "iOS",
        children: [
          {
            name: "Apple iPhone XS Max",
            value: 10,
          },
        ],
      },
    ],
  },
  {
    name: "tablet",
    children: [
      {
        name: "tablet iOS",
        label: "iOS",
        children: [{ name: "Apple iPad Air 2", value: 17 }],
      },
    ],
  },
];

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  data: { name: "graph", children: data },
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
  data: { name: "graph", children: data },
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
  title: "Atoms/Charts/Sunburst",
  component: SunburstChart,
} as Meta<typeof SunburstChart>;
