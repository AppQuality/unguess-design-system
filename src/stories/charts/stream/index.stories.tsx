import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { StreamChart } from ".";
import { StreamChartProps } from "./_types";

const Template: Story<StreamChartProps> = (args) => <StreamChart {...args} />;
export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  data: [
    {
      Raoul: 19,
      Josiane: 126,
      Marcel: 146,
      René: 99,
      Paul: 143,
      Jacques: 88,
    },
    {
      Raoul: 55,
      Josiane: 62,
      Marcel: 160,
      René: 83,
      Paul: 130,
      Jacques: 142,
    },
    {
      Raoul: 156,
      Josiane: 130,
      Marcel: 59,
      René: 121,
      Paul: 116,
      Jacques: 39,
    },
    {
      Raoul: 20,
      Josiane: 178,
      Marcel: 83,
      René: 176,
      Paul: 175,
      Jacques: 103,
    },
    {
      Raoul: 89,
      Josiane: 158,
      Marcel: 56,
      René: 77,
      Paul: 111,
      Jacques: 184,
    },
    {
      Raoul: 80,
      Josiane: 85,
      Marcel: 141,
      René: 166,
      Paul: 75,
      Jacques: 160,
    },
    {
      Raoul: 165,
      Josiane: 85,
      Marcel: 167,
      René: 37,
      Paul: 68,
      Jacques: 21,
    },
    {
      Raoul: 197,
      Josiane: 13,
      Marcel: 41,
      René: 121,
      Paul: 24,
      Jacques: 195,
    },
    {
      Raoul: 78,
      Josiane: 80,
      Marcel: 103,
      René: 144,
      Paul: 62,
      Jacques: 150,
    },
  ],
  keys: ["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques"],
  margin: { top: 50, right: 110, bottom: 50, left: 60 },
  axisBottom: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "",
    legendOffset: 36,
  },
  axisLeft: {
    tickSize: 5,
    tickPadding: 5,
    tickRotation: 0,
    legend: "",
    legendOffset: -40,
  },
  enableGridX: false,
  enableGridY: false,
  offsetType: "diverging",
  fillOpacity: 0.85,
  borderColor: {
    from: "color",
    modifiers: [["darker", 1.6]],
  },
  borderWidth: 1,
  curve: "linear",
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
