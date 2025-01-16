import { ColorItem, ColorPalette } from "@storybook/addon-docs";
import { useEffect, useState } from "react";
import { colors } from "./colors";

const PaletteComponent = () => {
  const [colorValues, setColorValues] = useState<Record<string, string>>({});
  useEffect(() => {
    const colorValues = Object.keys(colors)
      .filter((k) => k.endsWith("Hue"))
      .reduce(
        (acc, k) => {
          const name = k.replace("Hue", "");
          const color = getComputedStyle(document.documentElement)
            .getPropertyValue("--zd-palette-" + name)
            .trim();
          acc[name] = color;
          return acc;
        },
        {} as Record<string, string>,
      );
    setColorValues(colorValues);
  }, [document.documentElement, colors]);
  return (
    <ColorPalette>
      {Object.entries(colorValues).map(([name, color]) => {
        return (
          <ColorItem
            key={color}
            subtitle=""
            title={`zd.palette.${name}`}
            colors={[color]}
          />
        );
      })}
    </ColorPalette>
  );
};

export default PaletteComponent;
