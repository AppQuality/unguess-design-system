import { PropsWithChildren, useCallback, useRef, useState } from "react";
import { Title } from "../../title";
import { Card } from "../../cards";
import { styled } from "styled-components";
import { Author } from "../_types";
import { Avatar } from "../../avatar";
import { useChatContext } from "../context/chatContext";
import { Content, useEditor, EditorContent } from "@tiptap/react";
import { editorExtensions } from "./extensions";
import { EditorContainer } from "./containers";
import Thumbnail from "./ThumbnailContainer/Thumbnail";

import { Lightbox } from "../../lightbox";
import { Slider } from "../../slider";
import { MD } from "@zendeskgarden/react-typography";
import { Player } from "../../player";
import { Button } from "../../buttons/button";
import { ReactComponent as DownloadIcon } from "../../../assets/icons/download-stroke.svg";

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
}: PropsWithChildren<{
  author: Author;
  message: string;
  date: string;
  media?: File[];
}>) => {
  const { mentionableUsers } = useChatContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File>({} as File);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const ext = editorExtensions({ mentionableUsers });

  const handleClickThumbnail = (file: File, index: number) => {
    if (!file) throw Error("Error with the image");

    setSelectedImage(file);
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
      {media.map((item, index) => (
        <Thumbnail
          src={item.name}
          label=""
          showLabel={false}
          showX={false}
          mediaType={item.type}
          clickThumbnail={() => {
            handleClickThumbnail(item, index);
          }}
        />
      ))}
      {isOpen && selectedImage && (
        <Lightbox onClose={closeLightbox}>
          <Lightbox.Header>
            <MD isBold>
              <Grey600Span>BUG 12345 - </Grey600Span>
              <Grey800Span>SQL Injection nel form di registrazione</Grey800Span>
            </MD>
          </Lightbox.Header>
          <Lightbox.Body>
            <Lightbox.Body.Main style={{ flex: 2 }}>
              <Slider
                prevArrow={<Slider.PrevButton isBright />}
                nextArrow={<Slider.NextButton isBright />}
                onSlideChange={slideChange}
                initialSlide={selectedImageIndex}
              >
                {media.map((item, index) => (
                  <Slider.Slide>
                    {item.type === "image/png" && (
                      <img src={item.name} alt={`{{${item.name}}}`} />
                    )}
                    {item.type === "video" && (
                      <Player
                        ref={(ref) => {
                          videoRefs.current.push(ref);
                        }}
                        url={URL.createObjectURL(item)}
                      />
                    )}
                  </Slider.Slide>
                ))}
              </Slider>
            </Lightbox.Body.Main>
            <Lightbox.Body.Details style={{ flex: 1 }}>
              <Comment
                author={{
                  avatar: author.avatar,
                  name: author.name,
                }}
                date={date}
                message={message}
                key={12}
              >
                <>
                  <br />
                </>
              </Comment>
            </Lightbox.Body.Details>
          </Lightbox.Body>
          <Lightbox.Footer>
            <Button isBasic onClick={() => alert("download")}>
              <Button.StartIcon>
                <DownloadIcon />
              </Button.StartIcon>
              Download
            </Button>
          </Lightbox.Footer>
          <Lightbox.Close aria-label="Close modal" />
        </Lightbox>
      )}

      <Footer>{children}</Footer>
    </CommentCard>
  );
};
