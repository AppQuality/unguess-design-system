import { Meta, StoryFn } from "@storybook/react";
import { Alert } from ".";
import { AlertArgs } from "./_types";

const Template: StoryFn<AlertArgs> = (args) => {
  return (
    <Alert {...args}>
      <Alert.Title>Warning</Alert.Title>
      Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce
      kohlrabi amaranth water
      <Alert.Close aria-label="Close Alert" />
    </Alert>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: "warning",
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/sByLYaJ4MdJhmqmvom9T88/UNGUESS-%7C-Express-MVP-(Output)?node-id=896%3A29118",
  },
};

export default {
  title: "Atoms/Alerts",
  component: Alert,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Alert>;
