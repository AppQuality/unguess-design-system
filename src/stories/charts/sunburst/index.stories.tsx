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
        "color": "hsl(144, 70%, 50%)",
        "children": [
          {
            "name": "stack",
            "color": "hsl(289, 70%, 50%)",
            "children": [
              {
                "name": "cchart",
                "loc": 148435
              },
              {
                "name": "xAxis",
                "color": "hsl(284, 70%, 50%)",
                "loc": 24097
              },
              {
                "name": "yAxis",
                "color": "hsl(140, 70%, 50%)",
                "loc": 106160
              },
              {
                "name": "layers",
                "color": "hsl(98, 70%, 50%)",
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
      },
      {
        "name": "set",
        "color": "hsl(123, 70%, 50%)",
        "children": [
          {
            "name": "clone",
            "color": "hsl(22, 70%, 50%)",
            "loc": 138424
          },
          {
            "name": "intersect",
            "color": "hsl(291, 70%, 50%)",
            "loc": 55515
          },
          {
            "name": "merge",
            "color": "hsl(131, 70%, 50%)",
            "loc": 95739
          },
          {
            "name": "reverse",
            "color": "hsl(186, 70%, 50%)",
            "loc": 104902
          },
          {
            "name": "toArray",
            "color": "hsl(172, 70%, 50%)",
            "loc": 26710
          },
          {
            "name": "toObject",
            "color": "hsl(323, 70%, 50%)",
            "loc": 108767
          },
          {
            "name": "fromCSV",
            "color": "hsl(264, 70%, 50%)",
            "loc": 54972
          },
          {
            "name": "slice",
            "color": "hsl(233, 70%, 50%)",
            "loc": 90445
          },
          {
            "name": "append",
            "color": "hsl(188, 70%, 50%)",
            "loc": 48306
          },
          {
            "name": "prepend",
            "color": "hsl(185, 70%, 50%)",
            "loc": 186102
          },
          {
            "name": "shuffle",
            "color": "hsl(192, 70%, 50%)",
            "loc": 20203
          },
          {
            "name": "pick",
            "color": "hsl(326, 70%, 50%)",
            "loc": 70609
          },
          {
            "name": "plouc",
            "color": "hsl(81, 70%, 50%)",
            "loc": 190276
          }
        ]
      },
      {
        "name": "text",
        "color": "hsl(101, 70%, 50%)",
        "children": [
          {
            "name": "trim",
            "color": "hsl(283, 70%, 50%)",
            "loc": 181986
          },
          {
            "name": "slugify",
            "color": "hsl(329, 70%, 50%)",
            "loc": 30214
          },
          {
            "name": "snakeCase",
            "color": "hsl(259, 70%, 50%)",
            "loc": 5467
          },
          {
            "name": "camelCase",
            "color": "hsl(220, 70%, 50%)",
            "loc": 194590
          },
          {
            "name": "repeat",
            "color": "hsl(278, 70%, 50%)",
            "loc": 117492
          },
          {
            "name": "padLeft",
            "color": "hsl(340, 70%, 50%)",
            "loc": 144515
          },
          {
            "name": "padRight",
            "color": "hsl(139, 70%, 50%)",
            "loc": 186127
          },
          {
            "name": "sanitize",
            "color": "hsl(328, 70%, 50%)",
            "loc": 108602
          },
          {
            "name": "ploucify",
            "color": "hsl(208, 70%, 50%)",
            "loc": 109745
          }
        ]
      },
      {
        "name": "misc",
        "color": "hsl(35, 70%, 50%)",
        "children": [
          {
            "name": "greetings",
            "color": "hsl(218, 70%, 50%)",
            "children": [
              {
                "name": "hey",
                "color": "hsl(342, 70%, 50%)",
                "loc": 57018
              },
              {
                "name": "HOWDY",
                "color": "hsl(326, 70%, 50%)",
                "loc": 174418
              },
              {
                "name": "aloha",
                "color": "hsl(39, 70%, 50%)",
                "loc": 7467
              },
              {
                "name": "AHOY",
                "color": "hsl(189, 70%, 50%)",
                "loc": 16640
              }
            ]
          },
          {
            "name": "other",
            "color": "hsl(149, 70%, 50%)",
            "loc": 182260
          },
          {
            "name": "path",
            "color": "hsl(303, 70%, 50%)",
            "children": [
              {
                "name": "pathA",
                "color": "hsl(220, 70%, 50%)",
                "loc": 10843
              },
              {
                "name": "pathB",
                "color": "hsl(199, 70%, 50%)",
                "children": [
                  {
                    "name": "pathB1",
                    "color": "hsl(15, 70%, 50%)",
                    "loc": 147815
                  },
                  {
                    "name": "pathB2",
                    "color": "hsl(271, 70%, 50%)",
                    "loc": 1005
                  },
                  {
                    "name": "pathB3",
                    "color": "hsl(267, 70%, 50%)",
                    "loc": 182348
                  },
                  {
                    "name": "pathB4",
                    "color": "hsl(88, 70%, 50%)",
                    "loc": 83463
                  }
                ]
              },
              {
                "name": "pathC",
                "color": "hsl(305, 70%, 50%)",
                "children": [
                  {
                    "name": "pathC1",
                    "color": "hsl(272, 70%, 50%)",
                    "loc": 75209
                  },
                  {
                    "name": "pathC2",
                    "color": "hsl(296, 70%, 50%)",
                    "loc": 43275
                  },
                  {
                    "name": "pathC3",
                    "color": "hsl(358, 70%, 50%)",
                    "loc": 136672
                  },
                  {
                    "name": "pathC4",
                    "color": "hsl(104, 70%, 50%)",
                    "loc": 81934
                  },
                  {
                    "name": "pathC5",
                    "color": "hsl(154, 70%, 50%)",
                    "loc": 165799
                  },
                  {
                    "name": "pathC6",
                    "color": "hsl(331, 70%, 50%)",
                    "loc": 52747
                  },
                  {
                    "name": "pathC7",
                    "color": "hsl(190, 70%, 50%)",
                    "loc": 139896
                  },
                  {
                    "name": "pathC8",
                    "color": "hsl(101, 70%, 50%)",
                    "loc": 29509
                  },
                  {
                    "name": "pathC9",
                    "color": "hsl(261, 70%, 50%)",
                    "loc": 47905
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  margin:{ top: 10, right: 10, bottom: 10, left: 10 }
};

export default {
  title: "Charts/SunburstChart",
  component: SunburstChart,
} as ComponentMeta<typeof SunburstChart>;
