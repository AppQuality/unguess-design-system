import { HTMLAttributes, ReactNode } from "react";

export interface PlayerArgs extends HTMLAttributes<HTMLVideoElement> {
  url: string;
  start?: number;
  end?: number;
  pipMode?: "auto" | (() => boolean) | boolean;
  onPipChange?: (isPip: boolean) => void;
  onCutHandler?: (time: number) => void;
  isCutting?: boolean;
  bookmarks?: IBookmark[];
  handleBookmarkUpdate?: (bookmark: IBookmark) => void;
  i18n?: PlayerI18n;
  showControls?: boolean;
  onShortcut?: (type: string) => void;
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
  isFocused?: boolean;
  onClick?: () => void;
  tags?: VideoTag[];
}

export interface WrapperProps {
  isPlaying?: boolean;
  isLoaded?: boolean;
  showControls?: boolean;
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
