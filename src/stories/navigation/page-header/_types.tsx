import React from "react";

export interface PageHeaderProps {}

export interface PageHeaderMainProps {
  infoOverline?: string;
  infoTitle: string;
  infoDescription?: string;
  infoCounters?: Array<React.ReactNode>;
  metaImage?: string;
}
