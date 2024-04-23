import { styled } from "styled-components";
import Thumbnail from "./Thumbnail";
import { useEffect, useState } from "react";

const StyledThumbnailContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  overflow-y: scroll;
  justify-items: center;
  gap: 10px;
  background-color: white;
  width: 100%;
  margin-top: 10px;
  height: 150px;
  .singleThumbnail:hover .deleteThumbnail {
    opacity: 1 !important;
    z-index: 9999;
  }
`;

interface Props {
  imagefiles: File[];
  openLightbox: (file: File, index: number) => void;
  updateThumbnails: (payload: {
    type: string;
    payload: { file: File[]; index?: number };
  }) => void;
}

const ThumbnailContainer = ({
  imagefiles,
  openLightbox,
  updateThumbnails,
}: Props) => {
  const [thumbnails, setThumbnails] = useState<File[]>(imagefiles);

  const deleteThumbnail = (index: number) => {
    console.log("delete imageFiles", imagefiles);

    setThumbnails([
      ...thumbnails.slice(0, index),
      ...thumbnails.slice(index + 1),
    ]);
  };

  useEffect(() => {
    // todo: upload to s3
    setThumbnails(imagefiles);
    console.log("useEffect imageFiles", imagefiles);
  }, [imagefiles, openLightbox]);

  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  return (
    <>
      <StyledThumbnailContainer className="thumbnailContainer">
        {thumbnails.map((file, index) => (
          <Thumbnail
            key={index}
            src={URL.createObjectURL(file)}
            label={file.name}
            index={index}
            showX={true}
            showLabel={true}
            removeThumbnail={() =>
              updateThumbnails({
                type: "remove",
                payload: { file: thumbnails, index: index },
              })
            }
            clickThumbnail={() => {
              openLightbox(file, index);
            }}
          />
        ))}
      </StyledThumbnailContainer>
    </>
  );
};

export default ThumbnailContainer;
