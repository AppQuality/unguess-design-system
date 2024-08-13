import { Meta, StoryFn } from "@storybook/react";
import { MediaInput } from ".";
import { Field } from "../field";
import { Label } from "../../label";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { ReactComponent as SearchIcon } from "../../../assets/icons/search-stroke.svg";
import { MediaInputArgs } from "./_types";

const defaultArgs: MediaInputArgs = {
  isBare: false,
  focusInset: false,
  start: <SearchIcon />,
  placeholder: "Search something...",
};

const Template: StoryFn<MediaInputArgs> = (args) => {
  return (
    <Row>
      <Col sm={2}>
        <Field>
          <Label isRegular={true}>Media Input</Label>
          <MediaInput {...args} />
        </Field>
      </Col>
    </Row>
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

export default {
  title: "Molecules/Forms/MediaInput",
  component: MediaInput,
} as Meta<typeof MediaInput>;
