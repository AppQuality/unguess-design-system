import ImageThumbnail from "./ImageThumbnail";
import VideoThumbnail from "./VideoThumbnail";
import { useChatContext } from "../../context/chatContext";
import { Grid } from "../../../grid/grid";
import { Row } from "../../../grid/row";
import { Col } from "../../../grid/col";
import { useMemo } from "react";

export interface FileElement {
  fileName: string;
  fileType: string;
  errorCode?: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
  previewUrl: string;
  internal_id: string;
  isLoadingMedia: boolean;
}

interface Props {
  openLightbox: (file: File, index: number) => void;
}

const ThumbnailContainer = ({ openLightbox }: Props) => {
  const { thumbnails, removeThumbnail, onDeleteThumbnail } = useChatContext();
  const media = useMemo(() => (thumbnails.map((file) => ({
    src: URL.createObjectURL(file),
    internalId: file.internalId,
    type: file.type,
    isLoadingMedia: file.isLoadingMedia,
  }))), [thumbnails]);
  
  if (!media || media.length === 0) {
    return null;
  }
  return (
    <Grid>
      <Row className="responsive-container">
        {media.map((file, index) => {
          // Check if item is an image or a video
          if (file.type.includes("image"))
            return (
              <Col xs={12} sm={3} xl={3} lg={3} className="flex-3-sm">
                <ImageThumbnail
                  key={file.internalId}
                  src={file.src}
                  index={index}
                  showX={true}
                  isLoadingMedia={file.isLoadingMedia}
                  removeThumbnail={() => {
                    removeThumbnail(index);
                    onDeleteThumbnail(file.internalId);
                  }}
                  clickThumbnail={() => {
                    openLightbox(thumbnails[index], index);
                  }}
                />
              </Col>
            );
          if (file.type.includes("video"))
            return (
              <Col xs={12} sm={3} className="flex-3-sm">
                <VideoThumbnail
                  key={file.internalId}
                  src={file.src}
                  index={index}
                  showX={true}
                  isLoadingMedia={file.isLoadingMedia}
                  removeThumbnail={() => {
                    removeThumbnail(index);
                    onDeleteThumbnail(file.internalId);
                  }}
                  clickThumbnail={() => {
                    openLightbox(thumbnails[index], index);
                  }}
                />
              </Col>
            );
          return null;
        })}
      </Row>
    </Grid>
  );
};

export default ThumbnailContainer;
