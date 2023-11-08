import { PALETTE } from "@zendeskgarden/react-theming";
import { Meta, StoryFn } from "@storybook/react";
import { ColorSwatchProps } from "./_types";
import { ReactComponent as ColorIndicatorIcon } from "../../assets/icons/circle-full-fill.svg";
import { ColorSwatch } from ".";
import { theme } from "../theme";

const colors: ColorSwatchProps["colors"] = [
  { label: "Blue-200", value: PALETTE.blue[200] },
  { label: "Blue-300", value: PALETTE.blue[300] },
  { label: "Blue-400", value: PALETTE.blue[400] },
  { label: "Blue-500", value: PALETTE.blue[500] },
  { label: "Blue-600", value: PALETTE.blue[600] },
  { label: "Blue-700", value: PALETTE.blue[700] },
  { label: "Blue-800", value: PALETTE.blue[800] },
  { label: "Red-200", value: PALETTE.red[200] },
  { label: "Red-300", value: PALETTE.red[300] },
  { label: "Red-400", value: PALETTE.red[400] },
  { label: "Red-500", value: PALETTE.red[500] },
  { label: "Red-600", value: PALETTE.red[600] },
  { label: "Red-700", value: PALETTE.red[700] },
  { label: "Red-800", value: PALETTE.red[800] },
  { label: "Yellow-200", value: PALETTE.yellow[200] },
  { label: "Yellow-300", value: PALETTE.yellow[300] },
  { label: "Yellow-400", value: PALETTE.yellow[400] },
  { label: "Yellow-500", value: PALETTE.yellow[500] },
  { label: "Yellow-600", value: PALETTE.yellow[600] },
  { label: "Yellow-700", value: PALETTE.yellow[700] },
  { label: "Yellow-800", value: PALETTE.yellow[800] },
  { label: "Green-200", value: PALETTE.green[200] },
  { label: "Green-300", value: PALETTE.green[300] },
  { label: "Green-400", value: PALETTE.green[400] },
  { label: "Green-500", value: PALETTE.green[500] },
  { label: "Green-600", value: PALETTE.green[600] },
  { label: "Green-700", value: PALETTE.green[700] },
  { label: "Green-800", value: PALETTE.green[800] },
];

const Template: StoryFn<ColorSwatchProps> = () => (
  <ColorSwatch colors={colors} onSelect={(color) => console.log(color)}>
    <ColorIndicatorIcon style={{ marginRight: theme.space.xs }} />
    <span style={{ color: theme.palette.grey[800] }}>Edit color</span>
  </ColorSwatch>
);

export const Default = Template.bind({});
Default.args = {};

export default {
  title: "Atoms/ColorPickers/ColorSwatch",
  component: ColorSwatch,
} as Meta<typeof ColorSwatch>;