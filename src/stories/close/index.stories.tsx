import { ComponentMeta, Story } from "@storybook/react";
import { Close } from ".";
import styled from "styled-components";
import { CloseArgs } from "./_types";

const StyledDiv = styled.div``;

const Template: Story<CloseArgs> = (args) => {
  return (
    <StyledDiv>
      <Close {...args} />
    </StyledDiv>
  );
};

export const Default = Template.bind({});
Default.args = {
  "aria-label": "Close Notification",
};

export default {
  title: "Atoms/Close",
  component: Close,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Close>;
