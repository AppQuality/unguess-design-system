import { ComponentMeta, Story } from "@storybook/react";
import { Editor } from ".";

import { EditorArgs } from "./_types";


const Template: Story<EditorArgs> = ({ children, defaultValue, ...args }) => {
  return (
    <>
      <textarea name="test" id="test" cols={30} rows={10} placeholder={"I'm a stupid editor"}></textarea>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
};


Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A32401',
  },
};

export default {
  title: "Organisms/Editor",
  component: Editor,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Editor>;
