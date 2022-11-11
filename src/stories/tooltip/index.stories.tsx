import { ComponentMeta, Story } from "@storybook/react";
import { Button } from "@zendeskgarden/react-buttons";
import { theme } from "../theme";
import { Tooltip } from ".";
import { TooltipArgs } from "./_types";
import styled from "styled-components";

const StyledTooltip = styled(Tooltip)`
  background-color: ${theme.colors.primaryHue};
  color: ${theme.palette.white};
`;

const defaultArgs: TooltipArgs = {
  content: "This is a tooltip",
  children: <Button>Button</Button>,
};

const Template: Story<TooltipArgs> = ({ children, ...args }) => {

  return (
    <StyledTooltip {...args}>
      {children}
    </StyledTooltip>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Atoms/Tooltip",
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>;
