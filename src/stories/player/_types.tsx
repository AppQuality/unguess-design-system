import { HTMLAttributes } from "react";

export interface PlayerArgs extends HTMLAttributes<HTMLVideoElement> {}

export interface WrapperProps {
    isPlaying?: boolean;
    isLoaded?: boolean;
  }
  