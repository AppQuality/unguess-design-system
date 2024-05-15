import { useToast, Notification } from "../../notifications";
import { FileItem } from "../_types";
import { v4 as uuidv4 } from "uuid";

export const acceptedMediaTypes = /^(image|video)\//;

export function useMedia() {
  const { addToast } = useToast();
  function getValidMedia(data: FileList): File[] {
    const wrongFiles = Array.from(data).filter(
      (file) => !acceptedMediaTypes.test(file.type)
    );
    if (wrongFiles.length) {
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="error"
            message={
              wrongFiles.length === 1
                ? `${wrongFiles[0].name} not supported, please upload video or image only`
                : "Some attachments are not supported, please upload video or image only"
            }
            isPrimary
          />
        ),
        { placement: "top" }
      );
    }
    return Array.from(data).filter((file) =>
      acceptedMediaTypes.test(file.type)
    );
  }
  
  function getMedia(data: FileList): FileItem[] {
    return getValidMedia(data).map((file) => {
      return Object.assign(file, {
        isLoadingMedia: true,
        internal_id: uuidv4(),
      });
    });
  }

  return { getMedia };
}