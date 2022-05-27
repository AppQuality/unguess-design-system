import { Button as ZendeskButton } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { ButtonArgs } from "./_types";
import { theme } from "../../theme";

let customTheme = {
  ...theme,
};

// Define theme override
const getThemeStyle = (props: ButtonArgs) => {
  const { themeColor } = props;
  if (themeColor) {
    customTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        primaryHue: themeColor,
      },
    };
  }
};

const UgButton = styled(ZendeskButton)``;

/**
 * Buttons let users take action quickly.
 * Use a Button to enable actions or decisions that are important to a user’s workflow.
 * <hr>
 * Used for this:
   - To enable user action
   - To draw attention to relevant actions in a user's workflow
 */
const Button = (props: ButtonArgs) => {
  if (props.themeColor) {
    getThemeStyle(props);
    UgButton.defaultProps = {
      theme: customTheme
    };
  }

  return <UgButton {...props} />;
};

Button.defaultProps = {
  isPill: true
};

Button.StartIcon = UgButton.StartIcon;
Button.EndIcon = UgButton.EndIcon;

export { Button };
