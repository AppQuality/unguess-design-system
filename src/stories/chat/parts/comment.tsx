import { PropsWithChildren, useCallback, useRef, useState } from "react";
import { Title } from "../../title";
import { Card } from "../../cards";
import { styled } from "styled-components";
import { Author, CommentMedia } from "../_types";
import { Avatar } from "../../avatar";
import { useChatContext } from "../context/chatContext";
import { Content, useEditor, EditorContent } from "@tiptap/react";
import { editorExtensions } from "./extensions";
import { EditorContainer } from "./containers";
import { MD } from "@zendeskgarden/react-typography";
import { Grid } from "../../grid/grid";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import Thumbnail from "./ThumbnailContainer/Thumbnail";
import MediaLightBox from "./MediaLightbox";

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

const Grey600Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Grey800Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export const Comment = ({
  author,
  message,
  children,
  date,
  media = [],
  header,
}: PropsWithChildren<{
  author: Author;
  message: string;
  date: string;
  media?: CommentMedia[];
  header: {
    title: string;
    message?: string;
  };
}>) => {
  const { mentionableUsers } = useChatContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const ext = editorExtensions({ mentionableUsers });

  const handleClickThumbnail = (index: number) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const slideChange = useCallback(
    (index: number) => {
      setSelectedImageIndex(index);
      videoRefs.current.forEach((ref) => {
        if (ref) {
          ref.pause();
        }
      });
    },
    [videoRefs]
  );

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
            {author.name ?? "User"} <CommentDate>{date}</CommentDate>
          </CommentTitle>
          <ReadOnly>
            <EditorContainer editable={false}>
              <EditorContent editor={ed} />
            </EditorContainer>
          </ReadOnly>
        </div>
      </AuthorContainer>
      <Grid>
        <Row className="responsive-container">
          {media.map((file, index) => (
            <Col key={index} xs={12} sm={4} className="flex-3-sm">
              <Thumbnail
                src={file.url}
                type={file.type}
                showX={false}
                isLoadingMedia={false}
                clickThumbnail={() => {
                  handleClickThumbnail(index);
                }}
              />
            </Col>
          ))}
        </Row>
      </Grid>
      <MediaLightBox
        isOpen={isOpen}
        header={
          <MD isBold>
            <Grey600Span>{header && header.title}</Grey600Span>
            {header && header.message && (
              <Grey800Span> | {header.message}</Grey800Span>
            )}
          </MD>
        }
        onClose={closeLightbox}
        slideChange={slideChange}
        selectedImageIndex={selectedImageIndex}
        thumbnails={media}
        videoRefs={videoRefs}
        details={
          <Comment
            header={header}
            author={{
              avatar: author.avatar,
              avatarType: author.avatarType,
              name: author.name,
            }}
            date={date}
            message={message}
          >
            <>
              <br />
            </>
          </Comment>
        }
      />
      <Footer>{children}</Footer>
    </CommentCard>
  );
};
