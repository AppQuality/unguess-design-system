import { PropsWithChildren } from "react";
import { Title } from "../../title";
import { Card } from "../../cards";
import { styled } from "styled-components";
import { Editor } from "../../editor";
import { Author } from "../_types";

const CommentCard = styled(Card)`
  padding: ${({ theme }) => `${theme.space.base * 3}px ${theme.space.sm}`};
`;

const ReadOnly = styled.div`
  > div:focus {
    box-shadow: none;
    outline: none;
  }
`;

export const Comment = ({
  author,
  message,
  children,
}: PropsWithChildren<{ author: Author; message: string }>) => {
  return (
    <CommentCard>
      <Title>{author.name ?? "User"}</Title>
      <ReadOnly>
        <Editor editable={false}>{message}</Editor>
      </ReadOnly>
      {children}
    </CommentCard>
  );
};
