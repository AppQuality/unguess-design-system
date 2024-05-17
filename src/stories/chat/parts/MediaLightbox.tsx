import { Lightbox } from "../../lightbox";
import { Slider } from "../../slider";
import { CommentMedia } from "../_types";
import { Player } from "../../player";

interface MediaLightBoxProps {
  isOpen: boolean;
  header: React.ReactNode;
  onClose: () => void;
  slideChange: (index: number) => void;
  selectedImageIndex: number;
  thumbnails: CommentMedia[];
  videoRefs: React.MutableRefObject<Array<HTMLVideoElement | null>>;
  details?: React.ReactNode;
};

const MediaLightBox = ({header, onClose, slideChange, selectedImageIndex, thumbnails, videoRefs, isOpen, details}: MediaLightBoxProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <Lightbox onClose={onClose}>
          <Lightbox.Header>{header}</Lightbox.Header>
          <Lightbox.Body>
            <Lightbox.Body.Main style={{ flex: details ? 2 : 3 }}>
              <Slider
                prevArrow={<Slider.PrevButton isBright />}
                nextArrow={<Slider.NextButton isBright />}
                onSlideChange={slideChange}
                initialSlide={selectedImageIndex}
              >
                {thumbnails.map((item) => (
                  <Slider.Slide key={item.id}>
                    {item.type.includes("image") && (
                      <img
                        src={item.url}
                        alt={`media ${item.name}`}
                        style={{ maxHeight: "100%", height: "auto" }}
                      />
                    )}
                    {item.type.includes("video") && item.url && (
                      <Player
                        ref={(ref) => {
                          videoRefs.current.push(ref);
                        }}
                        url={item.url}
                      />
                    )}
                  </Slider.Slide>
                ))}
              </Slider>
            </Lightbox.Body.Main>
            {details && (
            <Lightbox.Body.Details style={{ flex: 1 }}>
              {details}
            </Lightbox.Body.Details>
            )}
          </Lightbox.Body>
          <Lightbox.Close aria-label="Close modal" />
        </Lightbox>
  );
}

export default MediaLightBox;