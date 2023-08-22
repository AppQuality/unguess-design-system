import { HTMLAttributes } from "react";

export interface PlayerArgs extends HTMLAttributes<HTMLVideoElement> {
  url: string;
}

export interface WrapperProps {
  isPlaying?: boolean;
  isLoaded?: boolean;
}
