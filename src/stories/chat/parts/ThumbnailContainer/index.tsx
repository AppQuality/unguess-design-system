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

  const mediaFiles = useMemo(() => {
    return thumbnails.map((file) => ({
      fileName: file.name,
      fileType: file.type,
      previewUrl: URL.createObjectURL(file),
      internal_id: file.internal_id,
      isLoadingMedia: file.isLoadingMedia,
    }));
  }, [thumbnails]);

  if (!mediaFiles || mediaFiles.length === 0) {
    return null;
  }

  return (
    <Grid>
      <Row className="responsive-container">
        {mediaFiles.map((file, index) => {
          // Check if item is an image or a video
          if (file.fileType.includes("image"))
            return (
              <Col xs={12} sm={3} xl={3} lg={3} className="flex-3-sm">
                <ImageThumbnail
                  key={index}
                  src={file.previewUrl}
                  index={index}
                  showX={true}
                  isLoadingMedia={file.isLoadingMedia}
                  removeThumbnail={() => {
                    removeThumbnail(index);
                    onDeleteThumbnail(file.internal_id);
                  }}
                  clickThumbnail={() => {
                    openLightbox(thumbnails[index], index);
                  }}
                />
              </Col>
            );
          if (file.fileType.includes("video"))
            return (
              <Col xs={12} sm={3} className="flex-3-sm">
                <VideoThumbnail
                  key={index}
                  src={file.previewUrl}
                  index={index}
                  showX={true}
                  isLoadingMedia={file.isLoadingMedia}
                  removeThumbnail={() => {
                    removeThumbnail(index);
                    onDeleteThumbnail(file.internal_id);
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
