import React, { HTMLAttributes } from "react";

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface PageHeaderMainProps extends HTMLAttributes<HTMLDivElement> {
  infoTitle: string;
  infoOverline?: string;
  infoDescription?: string;
  infoCounters?: React.ReactNode;
  metaImage?: string;
}
