import { HTMLAttributes } from "react";

export interface PlayerArgs extends HTMLAttributes<HTMLVideoElement> {
  url: string;
  start?: number;
  end?: number;
  onCutHandler?: boolean;
  enablePipOnScroll?: boolean;
  bookmarks?: Bookmark[];
}

export interface Bookmark {
  time: number;
  hue: string;
  color: string;
  label?: string;
  onClick?: () => void;
}

export interface WrapperProps {
  isPlaying?: boolean;
  isLoaded?: boolean;
}
