import { Meta, StoryFn } from "@storybook/react";
import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { Editor as TipTapEditor } from "@tiptap/react";
import { Chat, ChatProvider, useChatContext } from ".";
import { Button } from "../buttons/button";
import { Col } from "../grid/col";
import { Grid } from "../grid/grid";
import { Row } from "../grid/row";
import { ChatEditorArgs } from "./_types";
import { Comment } from "./parts/comment";

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
  background?: string;
  onSave: (editor: TipTapEditor) => void;
  placeholderOptions?: Partial<PlaceholderOptions>;
}

const ChatPanel = ({ background, ...args }: EditorStoryArgs) => {
  const { triggerSave } = useChatContext();
  return (
    <Chat>
      <Chat.Header>Titolone</Chat.Header>
      <Chat.Comments chatBkg={background}>
        {args.comments?.map((comment, index) => (
          <Comment {...comment}>
            <>altre cose</>
          </Comment>
        ))}
      </Chat.Comments>
      <Chat.Input {...args}>{args.editorText}</Chat.Input>
      <Chat.Menu />
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
      date: " | 27 dic. 2023 | 12:00",
      author: {
        name: "Luca C.",
        avatar: "LC",
      },
    },
    {
      message: "Hi, I'm a comment too but with <strong>bold</strong>",
      date: " | 27 dic. 2023 | 12:00",
      author: {
        name: "Marco B.",
        avatar: "MB",
      },
    },
    {
      message: "Hi, I'm a comment too but with <strong>bold</strong>",
      date: " | 27 dic. 2023 | 12:00",
      author: {
        name: "Marco B.",
        avatar: "MB",
      },
    },
    {
      message: "Hi, I'm a comment too but with <strong>bold</strong>. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl",
      date: " | 27 dic. 2023 | 12:00",
      author: {
        name: "Marco B.",
        avatar: "MB",
      },
    },
    {
      message: "Hi, I'm a comment too but with <strong>bold</strong> askdlhfksadhjfkljafshbcfkjsdhbkjdhfksjdfhabfshdbkfvhksdajhfbvhldsjfvdjshflkvdsbjhfjkvskfhbvasjhfksjbfvsdbvkjshvbkfasjhvfksjhfbkfbvksjhjvfshjvbsdhvdbvskjsdbhfkvsjbfjkvbsdfhwrap",
      date: " | 27 dic. 2023 | 12:00",
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

export const CustomBackground = Template.bind({});
CustomBackground.args = {
  ...defaultArgs,
  background: "#BE3455",
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
