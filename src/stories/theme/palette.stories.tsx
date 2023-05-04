import { Story } from "@storybook/react";
import { HTMLAttributes } from "react";
import { theme } from ".";
import styled from "styled-components";
import { LG, MD } from "@zendeskgarden/react-typography";

interface Variant {
  name: string;
  hex: string;
}

interface PaletteProps extends HTMLAttributes<HTMLDivElement> {
  palette: Array<{
    title: string;
    variants: Array<Variant>;
  }>
}



const Section = styled.section`
  margin-bottom: ${p => p.theme.space.xl};
  .sectionTitle {
    margin-bottom: ${p => p.theme.space.md};
  }
`;
const Ul = styled.ul`
  border-radius: ${p => p.theme.borderRadii.lg};
  overflow: hidden;
  height: fit-content;
`;

const Li = styled.li<{ hex: string }>`
  background-color: ${({ hex }) => hex};
  color: ${({ hex }) => getTextColor(hex)};
  padding: ${p => p.theme.space.sm};
`;

const ColorsLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${p => p.theme.space.xl} ${p => p.theme.space.lg};
  max-width: 768px;
`;

const ColorSpec = styled(MD) <{ color: string }>`
  color: ${({ color }) => color};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Template: Story<PaletteProps> = (props) => {
  return (
    <div>
      <Section>
        <div className="sectionTitle">
          <LG>Reference:</LG>
        </div>
        <p><small>Design principles <a href="https://garden.zendesk.com/design/color" target="_blank" rel="noreferrer">https://garden.zendesk.com/design/color (accessed 28 apr 2023)</a></small></p>
        <p><small>Palette: <a href="https://garden.zendesk.com/components/palette" target="_blank" rel="noreferrer">https://garden.zendesk.com/components/palette (accessed 28 apr 2023)</a></small></p>
      </Section>
      <Section>
        <div className="sectionTitle">
          <LG>Palette</LG>
        </div>
        <ColorsLayout>
          {props.palette.map((color) => (
            <Ul>
              {color.variants.map(({ name, hex }) => (
                <Li hex={hex}>
                  <ColorSpec color={getTextColor(hex)}>
                    <span>{color.title}{name !== color.title && `-${name}`}</span>
                    <span>{hex.toUpperCase()}</span>
                  </ColorSpec>
                </Li>
              ))}
            </Ul>
          ))}
        </ColorsLayout>
      </Section>
    </div>
  );
};

const palette = Object.keys(theme.palette).map((key) => {
  let color = theme.palette[key as keyof typeof theme.palette];
  let colorsVariants: Array<Variant> = [];
  if (typeof color === "object") {
    Object.keys(color).map((variants) => {
      let variant = color[variants as keyof typeof color];
      return colorsVariants.push({
        name: variants,
        hex: variant.toString(),
      });
    });
  } else {
    colorsVariants[0] = {
      name: key,
      hex: color,
    };
  }

  return {
    title: key,
    variants: colorsVariants,
  };
});

export const Default = Template.bind({});
Default.args = {
  palette,
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

export default {
  title: "Theme/Palette",
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
