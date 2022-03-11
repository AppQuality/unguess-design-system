import { ComponentMeta, Story } from "@storybook/react";
import { HTMLAttributes } from "react";
import { theme } from ".";
import { Card } from "../cards";
import { Title } from "../title";
import { Paragraph } from "@zendeskgarden/react-typography";

const { palette } = theme;

interface Variant {
  colorName: string;
  color: string;
}

interface PaletteProps extends HTMLAttributes<HTMLDivElement> {
  cards: Array<{
    title: string;
    colors: Array<Variant>;
  }>;
}

const Template: Story<PaletteProps> = (props) => {
  console.log(props);
  return (
    <>
      {props.cards.map((card) => (
        <Paragraph {...props}>
          <Title>{card.title}</Title>
          {card.colors.map(({ colorName, color }) => (
            <Card style={{ backgroundColor: color, color: contrast(color) }}>
              <Title style={{ color: contrast(color) }}>{colorName}</Title>
              {color}
            </Card>
          ))}
        </Paragraph>
      ))}
    </>
  );
};

let colors = Object.keys(palette).map((key) => {
  let color = palette[key as keyof typeof palette];
  let colorsVariants: Array<Variant> = [];
  if (typeof color === "object") {
    Object.keys(color).map((variants) => {
      let variant = color[variants as keyof typeof color];
      return colorsVariants.push({
        colorName: variants,
        color: variant,
      });
    });
  } else {
    colorsVariants[0] = {
      colorName: key,
      color: color,
    };
  }

  return {
    title: key,
    colors: colorsVariants,
  };
});

export const Default = Template.bind({});
Default.args = {
  cards: colors,
};

const contrast = (hex: string) => {
  if (hex.indexOf("#") === 0) {
    hex = hex.slice(1);
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    throw new Error("Invalid HEX color.");
  }
  var r = parseInt(hex.slice(0, 2), 16),
    g = parseInt(hex.slice(2, 4), 16),
    b = parseInt(hex.slice(4, 6), 16);

  // https://stackoverflow.com/a/3943023/112731
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
};

export default {
  title: "Theme/Palette",
  component: Paragraph,
  argTypes: {
    cards: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof Paragraph>;
