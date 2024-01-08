import { PropsWithChildren } from "react";
import { Title } from "../../title";
import { Card } from "../../cards";
import { styled } from "styled-components";
import { Editor } from "../../editor";
import { Author } from "../_types";
import { Avatar } from "../../avatar";

const CommentCard = styled(Card)`
  padding: ${({ theme }) => `${theme.space.base * 3}px ${theme.space.sm}`};
  background-color: ${({ theme }) => theme.palette.grey[100]};
  &:hover {
    box-shadow: none;
  }
  border-radius: 8px;
`;

const ReadOnly = styled.div`
  > div {
    background-color: ${({ theme }) => theme.palette.grey[100]};
    &:focus {
      box-shadow: none;
      outline: none;
    }
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
`

export const Comment = ({
  author,
  message,
  children,
  date,
}: PropsWithChildren<{ author: Author; message: string; date: string }>) => {
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
            <Editor editable={false}>{message}</Editor>
          </ReadOnly>
        </div>
      </AuthorContainer>
      <Footer>{children}</Footer>
    </CommentCard>
  );
};
