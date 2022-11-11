import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { BulletChart } from ".";
import { BulletChartProps } from "./_types";

const Template: Story<BulletChartProps> = (args) => <BulletChart {...args} />;
export const Default = Template.bind({});
Default.args = {
  width: "90%",
  height: "70px",
  margin:{ top: 50, right: 100, bottom: -1, left: 70 },
  titleOffsetX: -60,
  titleAlign: "start",
  minValue: 0,
  maxValue: 100,
  data: [
    {
      "id": "cost",
      title: "",
      "ranges": [
        25,
        50,
        75,
        100
      ],
      "measures": [
        74
      ],
      "markers": [
        74
      ]
    }
  ]
};

export default {
  title: "Charts/Bullet",
  component: BulletChart,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: Object.keys(theme),
      },
    },
  },
} as ComponentMeta<typeof BulletChart>;
