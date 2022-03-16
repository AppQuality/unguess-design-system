import { ImgHTMLAttributes } from 'react';

export interface LogoArgs extends ImgHTMLAttributes<HTMLImageElement> {
  /** Specifies the kind of logo */
  type: Type;
  /** Specifies the css class */
  className: string;
  /** Sets the image dimension */
  size: number;
}

export enum Type {
  vertical = 'vertical',
  horizontal = 'horizontal',
  icon = 'icon'
}