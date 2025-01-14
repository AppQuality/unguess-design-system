import React from "react";

export interface ServiceTileArgs {
  onClick?: () => void,
  title: string;
  description: string;
  icon: React.ReactNode;
  price: {
    firstRow?: {
      value: string;
      isStrikeThrough: boolean;
    };
    currentPrice: string;
  };
  additionalInfo: {
    icon: React.ReactNode;
    text: string;
  }[];
  background: string;
}
