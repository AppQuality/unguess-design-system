import { IWellProps } from "@zendeskgarden/react-notifications";
import { HTMLAttributes } from "react";

export const FLEX_DIRECTION = ["column", "row"];
export const JUSTIFY_CONTENT = [
  "start",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
  "end",
];

export interface CardProps extends IWellProps {
  /** Applies a background color */
  isRecessed?: boolean;
  /** Applies a drop shadow */
  isFloating?: boolean;
}

export interface CardMetaProps extends HTMLAttributes<HTMLDivElement> {
  direction?: typeof FLEX_DIRECTION[number];
  justifyContent?: typeof JUSTIFY_CONTENT[number];
}

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right" | "center";
}

export interface CardThumbProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right" | "center";
  isStretched?: boolean;
}

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  direction?: typeof FLEX_DIRECTION[number];
  justifyContent?: typeof JUSTIFY_CONTENT[number];
}
