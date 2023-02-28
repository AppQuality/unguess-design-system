import React, { HTMLAttributes } from "react";

export interface PageHeaderProps extends HTMLAttributes<HTMLDivElement> {}

export interface PageHeaderMainProps extends HTMLAttributes<HTMLDivElement> {
  mainTitle: string;
  mainOverline?: string;
  mainDescription?: string;
  mainMeta?: React.ReactNode;
  mainImageUrl?: string;
}
