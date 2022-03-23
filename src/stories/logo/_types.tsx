import { ImgHTMLAttributes } from 'react';

export interface LogoArgs extends ImgHTMLAttributes<HTMLImageElement> {
  /** Specifies the kind of logo */
  type: 'vertical' | 'horizontal' | 'icon';
  /** Specifies the css class */
  className: string;
  /** Sets the image dimension */
  size: number;
}