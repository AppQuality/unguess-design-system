import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { WaffleChart } from ".";
import { WaffleChartProps } from "./_types";
import { CHARTS_COLOR_SCHEME_MONO } from "../../theme/charts";

const Template: Story<WaffleChartProps> = (args) => <WaffleChart {...args} />;
export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "90vh",
  data: [
    {
      "id": "men",
      "label": "men",
      "value": 46,
    },
    {
      "id": "women",
      "label": "women",
      "value": 54,
    },
  ],
  colors: CHARTS_COLOR_SCHEME_MONO,
  total:100,
  rows:18,
  columns:14
};

export default {
  title: "Atoms/Charts/Waffle",
  component: WaffleChart,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: Object.keys(theme),
      },
    },
  },
} as ComponentMeta<typeof WaffleChart>;
