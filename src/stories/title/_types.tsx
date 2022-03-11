import { HTMLAttributes } from 'react';

export interface TitleArgs extends HTMLAttributes<HTMLDivElement> {
  /** Applies regular (non-bold) font weight */
  isRegular?: boolean;
}
