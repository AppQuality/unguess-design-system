import { ComponentMeta, Story } from "@storybook/react";
import { Stepper } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { StepperArgs } from "./_types";
import { useState } from "react";
import styled from "styled-components";
import { Button } from "../buttons/button";
import { Card } from "../cards";

interface StepperStoryProps extends StepperArgs {
  currentStep: number;
}

const StyledButtons = styled.div`
  margin-top: ${(p) => p.theme.space.sm};
  padding: ${(p) => p.theme.shadowWidths.md};

  & > button {
    margin-${(p) => (p.theme.rtl ? "right" : "left")}: ${(p) =>
  p.theme.space.base * 3}px;

    &:first-child {
      margin-${(p) => (p.theme.rtl ? "right" : "left")}: 0;
    }
  }
`;

const Template: Story<StepperStoryProps> = ({ currentStep, ...args }) => {
  const [step, setStep] = useState(currentStep);

  const onNext = () => setStep(step + 1);
  const onBack = () => setStep(step - 1);

  const steps = [
    {
      label: "Choose a good location",
      content: `Your garden's success depends on its location, so choose a spot that has
    healthy soil, gets good light, and is easily watered.`,
      buttons: <Button onClick={onNext}>Next</Button>,
    },
    {
      label: "Plan your garden's layout",
      content: `The layout of your garden depends on its purpose. If you're planting flowers,
    consider aesthetics like color and layout. If you're growing food, think about
    harvest times and the kinds of pests that might be attracted to your crops.`,
      buttons: (
        <>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Next</Button>
        </>
      ),
    },
    {
      label: "Buy great seeds",
      content:
        "Buy clean, hearty, disease-free seeds. Most seed from reliable seed companies will meet these specifications.",
      buttons: <Button onClick={onBack}>Back</Button>,
    },
  ];

  return (
    <Stepper activeIndex={step} {...args}>
      {steps.map((step, index) => {
        return (
          <Stepper.Step key={index}>
            <Stepper.Label>{step.label}</Stepper.Label>
            <Stepper.Content>
              {step.content}
              <StyledButtons>{step.buttons}</StyledButtons>
            </Stepper.Content>
          </Stepper.Step>
        );
      })}
    </Stepper>
  );
};

const SplitTemplate: Story<StepperStoryProps> = ({ currentStep, ...args }) => {
  const [step, setStep] = useState(currentStep);

  const onNext = () => setStep(step + 1);
  const onBack = () => setStep(step - 1);

  const steps = [
    {
      label: "Cosa",
      content: "Il prodotto del test",
      buttons: <Button onClick={onNext}>Next</Button>,
    },
    {
      label: "Dove",
      content: "I dispositivi di test",
      buttons: (
        <>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Next</Button>
        </>
      ),
    },
    {
      label: "Chi",
      content: "Gli utenti del test",
      buttons: (
        <>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Next</Button>
        </>
      ),
    },
    {
      label: "Quando",
      content: "Le tempistiche del test",
      buttons: (
        <>
          <Button onClick={onBack}>Back</Button>
          <Button onClick={onNext}>Next</Button>
        </>
      ),
    },
    {
      label: "Recap e Lancio",
      content: "Tutto pronto!",
      buttons: <Button onClick={onBack}>Back</Button>,
    },
  ];

  return (
    <Row>
      <Col size={4}>
        <Card>
          <Stepper activeIndex={step} {...args}>
            {steps.map((item, index) => (
              <Stepper.Step key={index}>
                <Stepper.Label>{item.label}</Stepper.Label>
                <Stepper.Content>{item.content}</Stepper.Content>
              </Stepper.Step>
            ))}
          </Stepper>
        </Card>
      </Col>
      <Col size={8}>
        {steps.map(
          (item, index) =>
            index === step && (
              <Card key={index}>
                {item.content}
                <StyledButtons>{item.buttons}</StyledButtons>
              </Card>
            )
        )}
      </Col>
    </Row>
  );
};

export const Default = Template.bind({});
Default.args = {
  currentStep: 1,
};

export const SeparateContent = SplitTemplate.bind({});
SeparateContent.args = {
  currentStep: 0,
};

export default {
  title: "Molecules/Stepper",
  component: Stepper,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  // argTypes: {
  //   hue: {
  //     options: ['primary', 'secondary'],
  //     control: { type: 'radio' },
  //   },
  // },
} as ComponentMeta<typeof Stepper>;
