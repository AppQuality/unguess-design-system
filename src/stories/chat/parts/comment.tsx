import { PropsWithChildren } from "react";
import { Title } from "../../title";
import { Card } from "../../cards";
import { styled } from "styled-components";

const CommentCard = styled(Card)`
  padding: ${({ theme }) => `${theme.space.base * 3}px ${theme.space.sm}`};
`;

export const Comment = ({
  author,
  children,
}: PropsWithChildren<{ author: string }>) => {
  return (
    <CommentCard>
      <Title>{author}</Title>
      {children}
    </CommentCard>
  );
};
