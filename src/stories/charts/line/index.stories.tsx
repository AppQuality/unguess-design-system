import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { LineChart } from ".";
import { LineChartProps } from "./_types";

const Template: Story<LineChartProps> = (args) => <LineChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  theme: {
    textColor: theme.colors.primaryHue,
    fontFamily: theme.fonts.system,
  },
  data: [
    {
      "id": "japan",
      "color": "hsl(335, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 18
        },
        {
          "x": "helicopter",
          "y": 56
        },
        {
          "x": "boat",
          "y": 176
        },
        {
          "x": "train",
          "y": 238
        },
        {
          "x": "subway",
          "y": 231
        },
        {
          "x": "bus",
          "y": 45
        },
        {
          "x": "car",
          "y": 16
        },
        {
          "x": "moto",
          "y": 93
        },
        {
          "x": "bicycle",
          "y": 120
        },
        {
          "x": "horse",
          "y": 8
        },
        {
          "x": "skateboard",
          "y": 112
        },
        {
          "x": "others",
          "y": 91
        }
      ]
    },
    {
      "id": "france",
      "color": "hsl(172, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 209
        },
        {
          "x": "helicopter",
          "y": 284
        },
        {
          "x": "boat",
          "y": 93
        },
        {
          "x": "train",
          "y": 251
        },
        {
          "x": "subway",
          "y": 39
        },
        {
          "x": "bus",
          "y": 58
        },
        {
          "x": "car",
          "y": 53
        },
        {
          "x": "moto",
          "y": 157
        },
        {
          "x": "bicycle",
          "y": 278
        },
        {
          "x": "horse",
          "y": 108
        },
        {
          "x": "skateboard",
          "y": 214
        },
        {
          "x": "others",
          "y": 27
        }
      ]
    },
    {
      "id": "us",
      "color": "hsl(155, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 116
        },
        {
          "x": "helicopter",
          "y": 105
        },
        {
          "x": "boat",
          "y": 198
        },
        {
          "x": "train",
          "y": 126
        },
        {
          "x": "subway",
          "y": 274
        },
        {
          "x": "bus",
          "y": 202
        },
        {
          "x": "car",
          "y": 171
        },
        {
          "x": "moto",
          "y": 110
        },
        {
          "x": "bicycle",
          "y": 122
        },
        {
          "x": "horse",
          "y": 248
        },
        {
          "x": "skateboard",
          "y": 49
        },
        {
          "x": "others",
          "y": 98
        }
      ]
    },
    {
      "id": "germany",
      "color": "hsl(62, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 264
        },
        {
          "x": "helicopter",
          "y": 19
        },
        {
          "x": "boat",
          "y": 241
        },
        {
          "x": "train",
          "y": 183
        },
        {
          "x": "subway",
          "y": 278
        },
        {
          "x": "bus",
          "y": 232
        },
        {
          "x": "car",
          "y": 293
        },
        {
          "x": "moto",
          "y": 101
        },
        {
          "x": "bicycle",
          "y": 35
        },
        {
          "x": "horse",
          "y": 109
        },
        {
          "x": "skateboard",
          "y": 240
        },
        {
          "x": "others",
          "y": 47
        }
      ]
    },
    {
      "id": "norway",
      "color": "hsl(126, 70%, 50%)",
      "data": [
        {
          "x": "plane",
          "y": 146
        },
        {
          "x": "helicopter",
          "y": 27
        },
        {
          "x": "boat",
          "y": 195
        },
        {
          "x": "train",
          "y": 197
        },
        {
          "x": "subway",
          "y": 241
        },
        {
          "x": "bus",
          "y": 21
        },
        {
          "x": "car",
          "y": 276
        },
        {
          "x": "moto",
          "y": 273
        },
        {
          "x": "bicycle",
          "y": 185
        },
        {
          "x": "horse",
          "y": 126
        },
        {
          "x": "skateboard",
          "y": 283
        },
        {
          "x": "others",
          "y": 105
        }
      ]
    }
  ],
};

export default {
  title: "Charts/LineChart",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;
