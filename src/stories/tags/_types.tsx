import { ITagProps } from '@zendeskgarden/react-tags';

export interface TagArgs extends ITagProps {
  /** Adjusts font size and padding */
  size?: 'small' | 'medium' | 'large';
  /**
   * Sets the color of the tag. Refer to
   * [PALETTE](/components/palette#palette)
   * for available colors. Accepts any hex value.
   */
  hue?: string;
  /** Applies pill styling */
  isPill?: boolean;
  /** Applies styles to round the tag */
  isRound?: boolean;
  /** Applies regular (non-bold) font weight */
  isRegular?: boolean;
}
