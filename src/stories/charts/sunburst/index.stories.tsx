import { ComponentMeta, Story } from "@storybook/react";
import { SunburstChart } from ".";
import { SunburstChartProps } from "./_types";
import { useState } from "react";

const Template: Story<SunburstChartProps> = (args) => {
  const [tot, setTot] = useState(
    args && args.centerItem && args.centerItem.value
      ? parseInt(args.centerItem.value)
      : 123
  );
  return (
    <SunburstChart
      {...args}
      centerItem={{ ...args.centerItem, value: tot.toString() }}
      onChange={() => setTot(Math.floor(Math.random() * 100))}
    />
  );
};

const data = [
  {
    name: "desktop",
    children: [
      {
        name: "Windows",
        children: [
          { name: "Notebook1", value: 34 },
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
};

export default {
  title: "Atoms/Charts/Sunburst",
  component: SunburstChart,
} as ComponentMeta<typeof SunburstChart>;
