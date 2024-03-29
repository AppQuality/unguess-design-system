import { PropsWithChildren } from "react";
import { Title } from "../../title";
import { Card } from "../../cards";
import { styled } from "styled-components";
import { Author } from "../_types";
import { Avatar } from "../../avatar";
import { useChatContext } from "../context/chatContext";
import { Content, useEditor, EditorContent } from "@tiptap/react";
import { editorExtensions } from "./extensions";
import { EditorContainer } from "./containers";

const CommentCard = styled(Card)`
  padding: ${({ theme }) => `${theme.space.base * 3}px ${theme.space.sm}`};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  &:hover {
    box-shadow: none;
  }
  border-radius: 8px;
`;

const ReadOnly = styled.div`
  cursor: text;

  > div {
    background-color: transparent;
    padding: 0;
  }
`;

const AuthorContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.sm};
`;

const CommentDate = styled.span`
  color: ${({ theme }) => theme.palette.grey[500]};
  font-weight: ${({ theme }) => theme.fontWeights.thin};
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.space.xs};
`;
const CommentTitle = styled(Title)`
  color: ${({ theme }) => theme.palette.blue[600]};
`;

export const Comment = ({
  author,
  message,
  children,
  date,
}: PropsWithChildren<{ author: Author; message: string; date: string }>) => {
  const { mentionableUsers } = useChatContext();

  const ext = editorExtensions({ mentionableUsers });

  const ed = useEditor({
    extensions: ext,
    content: (message as Content) || "",
  });

  if (!ed) return null;

  ed.setOptions({
    editable: false,
  });

  return (
    <CommentCard>
      <AuthorContainer>
        <Avatar
          avatarType={author.avatarType ?? "text"}
          style={{ flexShrink: 0 }}
        >
          {author.avatar}
        </Avatar>
        <div>
          <CommentTitle>
            {author.name ?? "User"}
            <CommentDate>{date}</CommentDate>
          </CommentTitle>
          <ReadOnly>
            <EditorContainer editable={false}>
              <EditorContent editor={ed} />
            </EditorContainer>
          </ReadOnly>
        </div>
      </AuthorContainer>
      <Footer>{children}</Footer>
    </CommentCard>
  );
};
