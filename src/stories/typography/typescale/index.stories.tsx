import { ComponentMeta, Story } from "@storybook/react";
import { SM, MD, LG, XL, XXL, XXXL } from ".";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-top: ${p => p.theme.space.sm};
`;

const Template: Story<any> = (args) => {
  return (
    <>
      <SM {...args}>&lt;SM&gt;Veggies es bonus vobis proinde vos postulo</SM>
      <StyledDiv>
        <MD {...args}>&lt;MD&gt;Veggies es bonus vobis proinde vos postulo</MD>
      </StyledDiv>
      <StyledDiv>
        <LG {...args}>&lt;LG&gt;Veggies es bonus vobis proinde vos postulo</LG>
      </StyledDiv>
      <StyledDiv>
        <XL {...args}>&lt;XL&gt;Veggies es bonus vobis proinde vos postulo</XL>
      </StyledDiv>
      <StyledDiv>
        <XXL {...args}>&lt;XXL&gt;Veggies es bonus vobis proinde vos postulo</XXL>
      </StyledDiv>
      <StyledDiv>
        <XXXL {...args}>&lt;XXXL&gt;Veggies es bonus vobis proinde</XXXL>
      </StyledDiv>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  isBold: false,
  isMonospace: false,
};

export default {
  title: "Atoms/Typography/TypeScale",
  component: MD,
  argTypes: {
    size: {
      control: {
        type: "select",
        options: ["small", "medium", "large"],
      },
    },
    isBold: { control: "boolean" },
    isMonospace: { control: "boolean" },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof MD>;
