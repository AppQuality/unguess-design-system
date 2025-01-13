import React from "react";

export interface DracCardArgs {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: {
    firstRow?: {
      value: string;
      isStrikeThrough: boolean;
    };
    value: string;
  };
  currentPrice: string;
  additionalInfo: {
    icon: React.ReactNode;
    text: string;
  }[];
  background: string;
}
