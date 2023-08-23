import { HTMLAttributes } from "react";

export interface PlayerArgs extends HTMLAttributes<HTMLVideoElement> {
  url: string;
  start?: number;
  end?: number;
}

export interface WrapperProps {
  isPlaying?: boolean;
  isLoaded?: boolean;
}
