import {
  ITimelineProps,
  ITimelineItemProps,
} from "@zendeskgarden/react-accordions";
import { ReactNode } from "react";

export interface TimelineArgs extends ITimelineProps {
  /** Applies alternate styling */
  isAlternate?: boolean;
  /** Applies invisibility power to timeline line */
  hiddenLine?: boolean;
}

export interface TimelineItemArgs extends ITimelineItemProps {
  /** Replaces the dot with an icon */
  icon?: ReactNode;
  /** Provides surface color for an icon placed on a non-white background */
  surfaceColor?: string;
}
