import { ComponentMeta, Story } from "@storybook/react";
import { LG, MD, SM, XL, XXL, XXXL } from "../index";
import styled from "styled-components";

const StyledDiv = styled.div`
  margin-top: ${p => p.theme.space.sm};
`;

const AnchorTagTemplate: Story<any> = (args) => {
  return (
    <>
      <SM {...args}>&lt;SM&gt;<a href="#">Veggies es bonus vobis proinde vos postulo</a></SM>
      <StyledDiv>
        <MD {...args}>&lt;MD&gt;<a href="#">Veggies es bonus vobis proinde vos postulo</a></MD>
      </StyledDiv>
      <StyledDiv>
        <LG {...args}>&lt;LG&gt;<a href="#">Veggies es bonus vobis proinde vos postulo</a></LG>
      </StyledDiv>
      {!args.isMonospace &&
        <>
          <StyledDiv>
            <XL {...args}>&lt;XL&gt;<a href="#">Veggies es bonus vobis proinde vos postulo</a></XL>
          </StyledDiv>
          <StyledDiv>
            <XXL {...args}>&lt;XXL&gt;<a href="#">Veggies es bonus vobis proinde vos postulo</a></XXL>
          </StyledDiv>
          <StyledDiv>
            <XXXL {...args}>&lt;XXXL&gt;<a href="#">Veggies es bonus vobis proinde vos postulo</a></XXXL>
          </StyledDiv>
        </>
      }
    </>
  )
}

export const AnchorTag = AnchorTagTemplate.bind({})
AnchorTag.args = {
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
