import { getValueAndUnit } from 'polished';
import { ThemeProps } from "styled-components";
import { theme } from "../../../theme";

/**
 * Get unitless line height based on the given pixel-valued height and font size.
 *
 * @param {string|number} height Desired line height in pixels.
 * @param {string|number} fontSize Font size (in pixels) of text contained within the line.
 *
 * @component
 */
const getLineHeight = (height: string | number, fontSize: string | number) => {
  const [heightValue, heightUnit] = getValueAndUnit(height.toString());
  const [fontSizeValue, fontSizeUnit] = getValueAndUnit(fontSize.toString());
  const PIXELS = 'px';

  if (heightUnit && heightUnit !== PIXELS) {
    throw new Error(`Unexpected \`height\` with '${heightUnit}' units.`);
  }

  if (fontSizeUnit && fontSizeUnit !== PIXELS) {
    throw new Error(`Unexpected \`fontSize\` with '${fontSizeUnit}' units.`);
  }

  return (heightValue as number) / (fontSizeValue as number);
}

export const getNavWidth = (props: ThemeProps<typeof theme>) => {
    return `${props.theme.space.base * 15}px`;
  };

export { getLineHeight };