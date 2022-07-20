import { ComponentMeta, Story } from "@storybook/react";
import { Editor } from ".";

import { EditorArgs } from "./_types";

const Template: Story<EditorArgs> = ({ content, ...args }) => {
  return <Editor content={content} onUpdate={args.onUpdate} />;
};

export const Default = Template.bind({});
Default.args = {
  content: "<p>I'm a stupid editor</p>",
  onUpdate: ({ editor }) => {
    const HTML = editor.getHTML();
    console.log("HTML:");
    console.log(HTML);
  },
};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/JF7Zu04vp7pJu9Anoen5ww/UNGUESS-%7C-Express-Bug-Hunting?node-id=2%3A4847",
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
