import { StoryFn } from "@storybook/react";
import { MD } from "@zendeskgarden/react-typography";
import { HTMLAttributes } from "react";
import { styled } from "styled-components";
import { theme } from ".";

const ColorsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${(p) => p.theme.space.xl} ${(p) => p.theme.space.lg};
  max-width: 768px;
`;

const Ul = styled.ul`
  border-radius: ${(p) => p.theme.borderRadii.lg};
  overflow: hidden;
  height: fit-content;
`;
const Li = styled.li<{ hex: string }>`
  border: 1px solid #00000045;
  background-color: ${({ hex }) => hex};
  color: ${({ hex }) => getTextColor(hex)};
  padding: ${(p) => p.theme.space.sm};
`;

const ColorSpec = styled(MD)<{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

interface ColorProps extends HTMLAttributes<HTMLDivElement> {}

const isHex = (color: string) => {
  return color.startsWith("#") && (color.length === 7 || color.length === 4);
};

const getTextColor = (hex: string) => {
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

const getPaletteColor = (color: string) => {
  if (color.startsWith("#")) {
    return color;
  }
  if (color in theme.palette) {
    const c = theme.palette[color as keyof typeof theme.palette];
    if (typeof c !== "string" && "600" in c) return c[600];
  }
  return null;
};

const Template: StoryFn<ColorProps> = (props) => {
  return (
    <div>
      <ColorsLayout>
        {Object.entries(theme.colors).map(([name, value], i) => {
          let hex = value;
          let textName = value;
          if (!isHex(value)) {
            const paletteColor = getPaletteColor(value);
            if (!paletteColor) return null;
            hex = paletteColor;
            textName = `${value}600 - ${hex.toUpperCase()}`;
          }
          if (!hex) return null;
          return (
            <>
              <Ul key={i}>
                <Li hex={hex}>
                  <ColorSpec color={getTextColor(hex)}>
                    <span>{name}</span>
                    <span>{textName}</span>
                  </ColorSpec>
                </Li>
              </Ul>
            </>
          );
        })}
      </ColorsLayout>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {};

export default {
  title: "Theme/Colors",
  argTypes: {
    cards: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
};
