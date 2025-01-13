import React from "react";

export interface DracCardArgs {
  title: string;
  description: string;
  icon: React.ReactNode;
  previousPrice: {
    name: string;
    isStrikeThrough: boolean;
  };
  currentPrice: string;
  addictionalInfo: {
    icon: React.ReactNode;
    text: string;
  }[];
  background: string;
}

