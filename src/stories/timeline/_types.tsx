import {
  ITimelineItemProps,
  ITimelineProps,
} from "@zendeskgarden/react-accordions";
import { ReactElement } from "react";

export interface TimelineArgs extends ITimelineProps {
  /** Applies alternate styling */
  isAlternate?: boolean;
  /** Applies invisibility power to timeline line */
  hiddenLine?: boolean;
}

export interface TimelineItemArgs extends ITimelineItemProps {
  /** Replaces the dot with an icon */
  icon?: ReactElement;
  /** Provides surface color for an icon placed on a non-white background */
  surfaceColor?: string;
}
