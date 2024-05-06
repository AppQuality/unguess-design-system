import { HTMLAttributes } from "react";

export interface PlayerArgs extends HTMLAttributes<HTMLVideoElement> {
  url: string;
  start?: number;
  end?: number;
  enablePipOnScroll?: boolean;
  onCutHandler?: (time: number) => void;
  isCutting?: boolean;
  bookmarks?: IBookmark[];
  handleBookmarkUpdate?: (bookmark: IBookmark) => void;
}

export interface IBookmark {
  id: number;
  start: number;
  end: number;
  hue?: string;
  label?: string;
  onClick?: () => void;
}

export interface WrapperProps {
  isPlaying?: boolean;
  isLoaded?: boolean;
}
