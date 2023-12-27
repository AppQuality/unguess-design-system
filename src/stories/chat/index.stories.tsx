import { Meta, StoryFn } from "@storybook/react";
import { Editor as TipTapEditor } from "@tiptap/react";
import { Chat, ChatProvider, useChatContext } from ".";
import { Col } from "../grid/col";
import { Grid } from "../grid/grid";
import { Row } from "../grid/row";
import { ChatArgs, ChatEditorArgs } from "./_types";
import { Button } from "../buttons/button";
import { Comment } from "./parts/comment";
import { PlaceholderOptions } from "@tiptap/extension-placeholder";

interface EditorStoryArgs extends ChatEditorArgs {
  children?: any;
  comments?: {
    author: {
      name: string;
      avatar: string;
    };
    message: string;
    date: string;
  }[];
  editorText?: string;
  placeholderOptions?: Partial<PlaceholderOptions>;
}

const ChatPanel = (args: EditorStoryArgs) => {
  const { triggerSave } = useChatContext();
  return (
    <Chat {...args}>
      <Chat.Header>Titolone</Chat.Header>
      <Chat.Comments>
        {args.comments?.map((comment, index) => (
          <Comment {...comment}>
            <>
              <br />
              altre cose
            </>
          </Comment>
        ))}
      </Chat.Comments>
      <Chat.Input {...args}>{args.editorText}</Chat.Input>
      <Chat.Footer>
        <Button isBasic>Cancel</Button>
        <Button onClick={triggerSave}>Save</Button>
      </Chat.Footer>
    </Chat>
  );
};

const Template: StoryFn<EditorStoryArgs> = ({ children, ...args }) => {
  return (
    <Grid>
      <Row>
        <Col xs={12} sm={6}>
          <ChatProvider onSave={args.onSave}>
            <ChatPanel {...args} />
          </ChatProvider>
        </Col>
      </Row>
    </Grid>
  );
};

const defaultArgs: EditorStoryArgs = {
  children:
    "<p>I'm <em>a</em> <strong>stupid</strong> <code>editor</code>!</p>",
  onSave: (editor: TipTapEditor) => {
    console.log("we have to save this", editor.getHTML());
  },
  author: {
    avatar: "LC",
  },
  onUpdate: ({ editor }) => {
    console.log(
      "Characters count:",
      editor.storage.characterCount.characters()
    );
  },
  comments: [
    {
      message: "Hi, I'm a comment",
      date: "2021-04-20T11:00:00.000Z",
      author: {
        name: "Luca C.",
        avatar: "LC",
      },
    },
    {
      message: "Hi, I'm a comment too but with <strong>bold</strong>",
      date: "2021-04-20T11:02:00.000Z",
      author: {
        name: "Marco B.",
        avatar: "MB",
      },
    },
  ],
};

export const Default = Template.bind({});
Default.args = defaultArgs;

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/JF7Zu04vp7pJu9Anoen5ww/UNGUESS-%7C-Express-Bug-Hunting?node-id=2%3A4847",
  },
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  ...defaultArgs,
  placeholderOptions: {
    placeholder: ({ node }) => {
      if (node.type.name === "heading") {
        return "What do you want to do?";
      }

      return "What do you want to say?";
    },
  },
};

export const BubbleMenu = Template.bind({});
BubbleMenu.args = {
  ...defaultArgs,
  hasInlineMenu: true,
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
  ...defaultArgs,
  editable: false,
};

export default {
  title: "Organisms/Chat",
  component: Chat,
  argTypes: {
    children: {
      name: "Editor text",
      description: "The initial HTML content of the editor",
      control: "text",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Chat>;
