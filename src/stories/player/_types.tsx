import { HTMLAttributes, ReactNode } from "react";
import { Observation } from "../highlight/_types";

export interface PlayerArgs extends HTMLAttributes<HTMLVideoElement> {
  url: string;
  start?: number;
  end?: number;
  enablePipOnScroll?: boolean;
  onCutHandler?: (time: number) => void;
  isCutting?: boolean;
  bookmarks?: IBookmark[];
  handleBookmarkUpdate?: (bookmark: IBookmark) => void;
  i18n?: PlayerI18n;
}

export interface PlayerI18n {
  beforeHighlight?: string;
  onHighlight?: string;
}

export interface IBookmark {
  id: number;
  start: number;
  end: number;
  hue?: string;
  label?: string;
  color?: string;
  tooltipContent?: ReactNode;
  onClick?: () => void;
}

export interface WrapperProps {
  isPlaying?: boolean;
  isLoaded?: boolean;
}
