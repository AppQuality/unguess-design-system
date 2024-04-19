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
}: PropsWithChildren<{ author: Author; message: string; date: string }>) => {
  const { mentionableUsers } = useChatContext();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File>({} as File);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const ext = editorExtensions({ mentionableUsers });

  const file = {
    name: "image.png",
    type: "image/png",
    size: 45454,
  } as File;

  const index = 0;

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
      {author.name === "Marco M." && (
        <Thumbnail
          src="https://images.unsplash.com/photo-1638799692504-9b3c0093d54d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          label=""
          showLabel={false}
          showX={false}
          clickThumbnail={() => {
            handleClickThumbnail(file, index);
          }}
        ></Thumbnail>
      )}
      {isOpen && selectedImage && author.name === "Marco M." && (
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
                <Slider.Slide>
                  {selectedImage.type === "image/png" && (
                    <img
                      src={
                        "https://images.unsplash.com/photo-1638799692504-9b3c0093d54d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      }
                      alt={`{{${selectedImage.name}}}`}
                    />
                  )}
                  {selectedImage.type === "video" && (
                    <Player
                      ref={(ref) => {
                        videoRefs.current.push(ref);
                      }}
                      url={URL.createObjectURL(selectedImage)}
                    />
                  )}
                </Slider.Slide>
              </Slider>
              <img
                src={
                  "https://images.unsplash.com/photo-1638799692504-9b3c0093d54d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={selectedImage.name}
              />
            </Lightbox.Body.Main>
            <Lightbox.Body.Details style={{ flex: 1 }}>
              <Comment
                author={{
                  avatar: "MM",
                  name: "Marco M. ",
                }}
                date={"18-04-2024 12:00"}
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
            <Button isBright>
              Download
              <Button.StartIcon>
                <DownloadIcon />
              </Button.StartIcon>
            </Button>
          </Lightbox.Footer>
          <Lightbox.Close aria-label="Close modal" />
        </Lightbox>
      )}

      <Footer>{children}</Footer>
    </CommentCard>
  );
};
