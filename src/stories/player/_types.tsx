import { HTMLAttributes, ReactNode } from "react";

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
  tooltipContent?: ReactNode;
  onClick?: () => void;
  tags?: VideoTag[];
  isFocused?: boolean;
  isActive?: boolean;
}

export interface WrapperProps {
  isPlaying?: boolean;
  isLoaded?: boolean;
}

type VideoTag = {
  group: {
    id: number;
    name: string;
  };
  tag: {
    id: number;
    name: string;
    style: string;
    usageNumber: number;
  };
};