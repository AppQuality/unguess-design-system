import { Meta, StoryFn } from "@storybook/react";
import { PlaceholderOptions } from "@tiptap/extension-placeholder";
import { Editor as TipTapEditor } from "@tiptap/react";
import styled from "styled-components";
import { Chat, ChatProvider, useChatContext } from ".";
import { Button } from "../buttons/button";
import { Col } from "../grid/col";
import { Grid } from "../grid/grid";
import { Row } from "../grid/row";
import { ChatEditorArgs, SuggestedUser } from "./_types";
import { Comment } from "./parts/comment";
import { theme } from "../theme";

const ButtonsContainer = styled.div`
  padding: 0px 16px;
  display: flex;
`;
interface EditorStoryArgs extends ChatEditorArgs {
  children?: any;
  comments?: {
    author: {
      name: string;
      avatar: string;
      avatarType?: "icon" | "image" | "text" | "system" /* default: text */;
    };
    message: string;
    date: string;
    media?: File[];
  }[];
  editorText?: string;
  background?: string;
  onSave: (editor: TipTapEditor, mentions: SuggestedUser[]) => void;
  placeholderOptions?: Partial<PlaceholderOptions>;
}

const ChatPanel = ({ background, ...args }: EditorStoryArgs) => {
  const { editor, triggerSave } = useChatContext();
  return (
    <Chat>
      <Chat.Header>Titolone</Chat.Header>
      <Chat.Comments chatBkg={background}>
        {args.comments?.map((comment) => (
          <Comment {...comment}>
            <>altre cose</>
          </Comment>
        ))}
      </Chat.Comments>
      <Chat.Input {...args}>{args.editorText}</Chat.Input>
      <Chat.Footer showShortcut>
        <ButtonsContainer>
          <Button
            size="small"
            style={{ fontSize: theme.fontSizes.sm }}
            isBasic
            onClick={() => editor?.commands.clearContent()}
          >
            Cancel
          </Button>
          <Button
            size="small"
            style={{ fontSize: theme.fontSizes.sm }}
            isAccent
            isPrimary
            onClick={triggerSave}
          >
            Save
          </Button>
        </ButtonsContainer>
      </Chat.Footer>
    </Chat>
  );
};

const Template: StoryFn<EditorStoryArgs> = ({ children, ...args }) => {
  const getUsers = ({ query }: { query: string }) => {
    return [
      {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
        email: "test@gmail.com",
      },
      {
        id: 2,
        name: "Jane Doe",
        avatar: "https://i.pravatar.cc/150?img=2",
        email: "test@gmail.com",
      },
      {
        id: 3,
        name: "John Smith",
        avatar: "https://i.pravatar.cc/150?img=3",
        email: "test@gmail.com",
      },
      {
        id: 4,
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=4",
        email: "test@gmail.com",
      },
      {
        id: 5,
        name: "Pippo Baudo",
        avatar: "https://i.pravatar.cc/150?img=5",
        email: "test@gmail.com",
      },
      {
        id: 6,
        name: "Pippo Franco",
        avatar: "https://i.pravatar.cc/150?img=6",
        email: "test@gmail.com",
      },
      {
        id: 7,
        name: "Pippo Inzaghi",
        avatar: "https://i.pravatar.cc/150?img=7",
        email: "test@gmail.com",
      },
      {
        id: 8,
        name: "Pippo Civati",
        avatar: "https://i.pravatar.cc/150?img=8",
        email: "test@gmail.com",
      },
      {
        id: 9,
        name: "Pippo Delbono",
        avatar: "https://i.pravatar.cc/150?img=9",
        email: "test@gmail.com",
      },
    ].filter((item) => {
      if (!query) return item;
      return item.name.toLowerCase().startsWith(query.toLowerCase());
    });
  };

  return (
    <Grid>
      <Row>
        <Col xs={12} sm={8} md={6}>
          <ChatProvider setMentionableUsers={getUsers} onSave={args.onSave}>
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
  onSave: (editor: TipTapEditor, mentions) => {
    console.log("we have to save this", editor.getHTML());
    console.log("mentions", mentions);
    console.log("aggiungo l'id del commento al file");
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
      message:
        "Hi, I'm a comment too but with <strong>bold</strong>. lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl eget ultricies ultricies, nunc nisl ultricies nunc, quis ultricies nisl",
      date: " | 27 dic. 2023 | 12:00",
      author: {
        name: "Marco B.",
        avatar: "MB",
      },
    },
    {
      message: `Hi <mention data-type="mention" data-mention-id="1" data-mention-name="John Doe">@John Doe</mention>, I'm a comment too but with <strong>bold</strong>`,
      date: " | 27 dic. 2023 | 12:00",
      author: {
        name: "Marco B.",
        avatar: "MB",
      },
    },
    {
      message: `This is an attached image:`,
      date: " | 21 mar. 2024 | 12:00",
      author: {
        name: "Marco M.",
        avatar: "MM",
      },
      media: [
        {
          name: "https://images.unsplash.com/photo-1638799692504-9b3c0093d54d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          size: 12345,
          type: "image/png",
          lastModified: 1638799692504,
          webkitRelativePath: "",
          arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error("Function not implemented.");
          },
          slice: function (
            start?: number | undefined,
            end?: number | undefined,
            contentType?: string | undefined
          ): Blob {
            throw new Error("Function not implemented.");
          },
          stream: function (): ReadableStream<Uint8Array> {
            throw new Error("Function not implemented.");
          },
          text: function (): Promise<string> {
            throw new Error("Function not implemented.");
          },
        },
        {
          name: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          size: 9000,
          type: "image/png",
          lastModified: 1638799692504,
          webkitRelativePath: "",
          arrayBuffer: function (): Promise<ArrayBuffer> {
            throw new Error("Function not implemented.");
          },
          slice: function (
            start?: number | undefined,
            end?: number | undefined,
            contentType?: string | undefined
          ): Blob {
            throw new Error("Function not implemented.");
          },
          stream: function (): ReadableStream<Uint8Array> {
            throw new Error("Function not implemented.");
          },
          text: function (): Promise<string> {
            throw new Error("Function not implemented.");
          },
        },
      ],
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

export const Menus = Template.bind({});
Menus.args = {
  ...defaultArgs,
  hasFloatingMenu: true,
  hasButtonsMenu: true,
  i18n: {
    menu: {
      bold: "Grassetto",
      italic: "Corsivo",
      mention: "Menziona",
      attachment: "Allega un file",
    },
    mention: {
      noResults:
        'Nessun risultato. Vai su "Invita" per aggiungere nuove persone alla campagna.',
    },
  },
};

export const WithInternals = Template.bind({});
WithInternals.args = {
  ...defaultArgs,
  comments: [
    ...(defaultArgs.comments || []),
    {
      message: "Hi, I'm a comment from an internal user",
      date: " | 27 dic. 2023 | 12:00",
      author: {
        name: "Federico M.",
        avatar: "FM",
        avatarType: "system",
      },
    },
  ],
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
