import { ChatArgs } from "./_types";
import { PropsWithChildren } from "react";
import { ChatFooter } from "./parts/footer";
import {
  ChatContext,
  ChatContextProvider as ChatProvider,
  useChatContext,
} from "./context/chatContext";
import { ChatContainer, MessagesContainer } from "./parts/containers";
import { ChatTitle } from "./parts/header";
import { CommentBox } from "./parts/commentBox";
import { Comment } from "./parts/comment";
import { CommentBar } from "./parts/bar";

/**
 * Chat is a wrapper around Editor component 
 * <br>
 * It's a rich text WYSIWYG editors.
 * <hr>
 * Used for this:
    - To add chat feature
    - To develop collaborative text editing
   
   Not for this:
    - Simple text input, use textarea instead.
 */
const Chat = (props: PropsWithChildren<ChatArgs>) => (
  <ChatContainer>{props.children}</ChatContainer>
);

Chat.Header = ChatTitle;
Chat.Comments = MessagesContainer;
Chat.Input = CommentBox;
Chat.Menu = CommentBar;
Chat.Footer = ChatFooter;

export { Chat, ChatContext, ChatProvider, useChatContext, Comment };
