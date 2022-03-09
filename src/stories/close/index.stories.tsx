import { ComponentMeta, Story } from "@storybook/react";
import { Close } from ".";
import styled from "styled-components";
import { CloseArgs } from "./_types";

const StyledDiv = styled.div`
  position: relative;
  display: inline-block;
  padding: 2rem;
`;

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
} as ComponentMeta<typeof Close>;
