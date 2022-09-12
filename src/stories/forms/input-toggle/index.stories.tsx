import { ComponentMeta, Story } from "@storybook/react";
import styled from "styled-components";
import { useState } from "react";
import { InputToggle } from ".";
import { InputToggleArgs } from "./_types";
import { Message } from "../../dropdowns/select";

interface InputStoryArgs extends InputToggleArgs {
  label: string;
  message: string;
}

const defaultArgs: InputStoryArgs = {
  isBare: false,
  label: "Titolo",
  message: "Messaggio",
  placeholder: "Placeholder",
  required: true,
  isFocused: true,
};

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Template: Story<InputStoryArgs> = ({ value, ...props }) => {
  const [inputValue, setInputValue] = useState<string>((value as string) || "");

  return (
    <>
      <InputToggle>
        <InputToggle.Item
          {...props}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
      </InputToggle>
      {props.validation && (
        <Message validation={props.validation}>
          {props.message || "validation message"}
        </Message>
      )}
    </>
  );
};

const TemplateWithLabel: Story<InputStoryArgs> = ({
  label,
  value,
  ...props
}) => {
  const [showLabel, setShowLabel] = useState(false);
  const [inputValue, setInputValue] = useState<string>((value as string) || "");

  return (
    <>
      <TitleContainer>
        <InputToggle.Label style={{ opacity: showLabel ? 1 : 0 }}>
          {label}
        </InputToggle.Label>
        <InputToggle isFocused>
          <InputToggle.Item
            {...props}
            value={inputValue}
            onBlur={(e) => {
              console.log(e.currentTarget);
              setShowLabel(false);
            }}
            onFocus={() => {
              setShowLabel(true);
            }}
            onChange={(e) => setInputValue(e.currentTarget.value)}
          />
        </InputToggle>
      </TitleContainer>
      {props.validation && (
        <Message validation={props.validation}>
          {props.message || "validation message"}
        </Message>
      )}
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  isBare: false,
};

export const Success = Template.bind({});
Success.args = {
  ...defaultArgs,
  validation: "success",
};

export const Warning = Template.bind({});
Warning.args = {
  ...defaultArgs,
  validation: "warning",
};

export const Error = Template.bind({});
Error.args = {
  ...defaultArgs,
  validation: "error",
};

export const WithLabel = TemplateWithLabel.bind({});
WithLabel.args = {
  ...defaultArgs,
};

export default {
  title: "Molecules/Forms/InputToggle",
  component: InputToggle,
} as ComponentMeta<typeof InputToggle>;
