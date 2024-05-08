import ImageThumbnail from "./ImageThumbnail";
import VideoThumbnail from "./VideoThumbnail";
import { useChatContext } from "../../context/chatContext";
import { Grid } from "../../../grid/grid";
import { Row } from "../../../grid/row";
import { Col } from "../../../grid/col";


export interface FileElement {
  fileName: string;
  fileType: string;
  status: "success" | "failed" | "uploading";
  errorCode?: "FILE_TOO_BIG" | "INVALID_FILE_EXTENSION" | "GENERIC_ERROR";
  previewUrl: string;
}

interface Props {
  openLightbox: (file: File, index: number) => void;
}

const ThumbnailContainer = ({ openLightbox }: Props) => {
  const { thumbnails, removeThumbnail } = useChatContext();

  if (!thumbnails || thumbnails.length === 0) {
    return null;
  }

  const mediaFiles: FileElement[] = [];
  thumbnails.forEach((file) => {
    mediaFiles.push({
      fileName: file.name,
      fileType: file.type,
      status: file.isLoadingMedia ? "uploading" : "success",
      previewUrl: URL.createObjectURL(file),
    });
  });

  console.log("mediafiles", mediaFiles);

  return (
    <>
      <Grid>
      <Row className="responsive-container">
        {mediaFiles.map((file, index) => {
          // Check if item is an image or a video
          if (file.fileType.includes('image'))
            return (
              <Col xs={12} sm={6} className="flex-3-sm">
                <ImageThumbnail
                  key={index}
                  src={file.previewUrl}
                  index={index}
                  showX={true}
                  isLoadingMedia={file.status === "uploading"}
                  removeThumbnail={() => removeThumbnail(index)}
                  clickThumbnail={() => {
                    openLightbox(thumbnails[index], index);
                  }}
                />
              </Col>
            );
          if (file.fileType.includes('video'))
            return (
              <Col xs={12} sm={6} className="flex-3-sm">
                <VideoThumbnail
                  key={index}
                  src={file.previewUrl}
                  index={index}
                  showX={true}
                  isLoadingMedia={file.status === "uploading"}
                  removeThumbnail={() => removeThumbnail(index)}
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
    </>
  );
};

export default ThumbnailContainer;


