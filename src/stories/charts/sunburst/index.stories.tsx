import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { SunburstChart } from ".";
import { SunburstChartProps } from "./_types";

const Template: Story<SunburstChartProps> = (args) => <SunburstChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  width: "100%",
  height: "100vh",
  id: "name",
  value: "loc",
  data: {
    name: "nivo",
    children: [
      {
        "name": "viz",
        "children": [
          {
            "name": "stack",
            "children": [
              {
                "name": "cchart",
                "loc": 148435
              },
              {
                "name": "xAxis",
                "loc": 24097
              },
              {
                "name": "yAxis",
                "loc": 106160
              },
              {
                "name": "layers",
                "loc": 120965
              }
            ]
          },
          {
            "name": "ppie",
            "color": "hsl(98, 70%, 50%)",
            "children": [
              {
                "name": "chart",
                "color": "hsl(156, 70%, 50%)",
                "children": [
                  {
                    "name": "pie",
                    "color": "hsl(11, 70%, 50%)",
                    "children": [
                      {
                        "name": "outline",
                        "loc": 147065
                      },
                      {
                        "name": "slices",
                        "color": "hsl(280, 70%, 50%)",
                        "loc": 122112
                      },
                      {
                        "name": "bbox",
                        "color": "hsl(305, 70%, 50%)",
                        "loc": 40668
                      }
                    ]
                  },
                  {
                    "name": "donut",
                    "color": "hsl(197, 70%, 50%)",
                    "loc": 64354
                  },
                  {
                    "name": "gauge",
                    "color": "hsl(11, 70%, 50%)",
                    "loc": 100331
                  }
                ]
              },
              {
                "name": "legends",
                "color": "hsl(114, 70%, 50%)",
                "loc": 20443
              }
            ]
          }
        ]
      },
      {
        "name": "colors",
        "color": "hsl(186, 70%, 50%)",
        "children": [
          {
            "name": "rgb",
            "color": "hsl(286, 70%, 50%)",
            "loc": 89584
          },
          {
            "name": "hsl",
            "color": "hsl(100, 70%, 50%)",
            "loc": 186529
          }
        ]
      },
      {
        "name": "utils",
        "color": "hsl(158, 70%, 50%)",
        "children": [
          {
            "name": "randomize",
            "color": "hsl(121, 70%, 50%)",
            "loc": 3112
          },
          {
            "name": "resetClock",
            "color": "hsl(127, 70%, 50%)",
            "loc": 118323
          },
          {
            "name": "noop",
            "color": "hsl(328, 70%, 50%)",
            "loc": 118467
          },
          {
            "name": "tick",
            "color": "hsl(69, 70%, 50%)",
            "loc": 112532
          },
          {
            "name": "forceGC",
            "color": "hsl(12, 70%, 50%)",
            "loc": 17481
          },
          {
            "name": "stackTrace",
            "color": "hsl(88, 70%, 50%)",
            "loc": 175503
          },
          {
            "name": "dbg",
            "color": "hsl(166, 70%, 50%)",
            "loc": 150924
          }
        ]
      },
      {
        "name": "generators",
        "color": "hsl(13, 70%, 50%)",
        "children": [
          {
            "name": "address",
            "color": "hsl(13, 70%, 50%)",
            "loc": 199927
          },
          {
            "name": "city",
            "color": "hsl(31, 70%, 50%)",
            "loc": 179024
          },
          {
            "name": "animal",
            "color": "hsl(269, 70%, 50%)",
            "loc": 65410
          },
          {
            "name": "movie",
            "color": "hsl(12, 70%, 50%)",
            "loc": 188332
          },
          {
            "name": "user",
            "color": "hsl(196, 70%, 50%)",
            "loc": 144391
          }
        ]
      }
    ]
  },
  margin:{ top: 10, right: 10, bottom: 10, left: 10 }
};

export default {
  title: "Charts/Sunburst",
  component: SunburstChart,
} as ComponentMeta<typeof SunburstChart>;
