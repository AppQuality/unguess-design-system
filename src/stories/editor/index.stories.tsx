import { ComponentMeta, Story } from "@storybook/react";
import { Editor } from ".";

import { EditorArgs } from "./_types";

const Template: Story<EditorArgs> = ({ content, ...args }) => {
  return <Editor content={content} onUpdate={args.onUpdate} />;
};

const defaultArgs: EditorArgs = {
  content: "<p>I'm a stupid <code>editor</code>!</p>",
  onUpdate: ({ editor }) => {
    const HTML = editor.getHTML();
    console.log("HTML:");
    console.log(HTML);
  },
}

export const Default = Template.bind({});
Default.args = defaultArgs;

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/JF7Zu04vp7pJu9Anoen5ww/UNGUESS-%7C-Express-Bug-Hunting?node-id=2%3A4847",
  },
};

export const Markdown = Template.bind({});
Markdown.args = {
  ...defaultArgs,
  content: `<p>
    Markdown shortcuts make it easy to format the text while typing.
  </p>
  <p>
    To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
  </p>
  <p>
   Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code or <code>~~tildes~~</code> to strike text.
  </p>
  <p>
    Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
  </p>`,
};

export default {
  title: "Organisms/Editor",
  component: Editor,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Editor>;
