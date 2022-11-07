import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { StreamChart } from ".";
import { StreamChartProps } from "./_types";
import { CHARTS_COLOR_SCHEME_CATEGORICAL_5 } from "../../theme/charts";

const keys = ["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques", "Reference"];

const Template: Story<StreamChartProps> = (args) => <StreamChart {...args} />;
export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  data: [
    {
      Raoul: 0,
      Josiane: 0,
      Marcel: 0,
      René: 0,
      Paul: 0,
      Jacques: 0,
      Reference: 0,
    },
    {
      Raoul: 55,
      Josiane: 62,
      Marcel: 160,
      René: 83,
      Paul: 130,
      Jacques: 142,
      Reference: 142,
    },
    {
      Raoul: 156,
      Josiane: 130,
      Marcel: 59,
      René: 121,
      Paul: 116,
      Jacques: 39,
      Reference: 142,
    },
    {
      Raoul: 20,
      Josiane: 178,
      Marcel: 83,
      René: 176,
      Paul: 175,
      Jacques: 103,
      Reference: 142,
    },
    {
      Raoul: 89,
      Josiane: 158,
      Marcel: 56,
      René: 77,
      Paul: 111,
      Jacques: 184,
      Reference: 142,
    },
    {
      Raoul: 80,
      Josiane: 85,
      Marcel: 141,
      René: 166,
      Paul: 75,
      Jacques: 160,
      Reference: 142,
    },
    {
      Raoul: 165,
      Josiane: 85,
      Marcel: 167,
      René: 37,
      Paul: 68,
      Jacques: 21,
      Reference: 142,
    },
    {
      Raoul: 197,
      Josiane: 13,
      Marcel: 41,
      René: 121,
      Paul: 24,
      Jacques: 195,
      Reference: 142,
    },
    {
      Raoul: 78,
      Josiane: 80,
      Marcel: 103,
      René: 144,
      Paul: 62,
      Jacques: 150,
      Reference: 142,
    },
  ],
  keys: keys,
  margin: { top: 50, right: 110, bottom: 50, left: 60 },
  offsetType: "diverging",
  borderColor: "white",
  borderWidth: 1,
  curve: "linear",
  colors: keys.map((key, index) => {
    const len = CHARTS_COLOR_SCHEME_CATEGORICAL_5.length;
    // last datum (reference line) should be gray
    if (index === keys.length-1) return theme.palette.grey[200]
    // otherwise let's cicle through the theme colors
    const colorIndex = len * ((index/len) - Math.floor(index/(len)));
    return CHARTS_COLOR_SCHEME_CATEGORICAL_5[colorIndex];
  }),
  axisBottom: {
   format: value => {
      const date = new Date('04/12/2020');
      date.setDate(date.getDate() + value);
      return date.toLocaleDateString('it', { month: 'long', day: 'numeric' })
   },
  },
};

export default {
  title: "Charts/Stream",
  component: StreamChart,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: Object.keys(theme),
      },
    },
  },
} as ComponentMeta<typeof StreamChart>;
