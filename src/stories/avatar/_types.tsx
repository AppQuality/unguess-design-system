import { IAvatarProps } from '@zendeskgarden/react-avatars';

export interface AvatarArgs extends IAvatarProps {
  /** Sets the avatar background color */
  backgroundColor?: string;
  /** Sets the color for child SVG or `Avatar.Text` components */
  foregroundColor?: string;
  /** Provides surface color for an avatar placed on a non-white background */
  surfaceColor?: string;
  /** Applies system styling for representing objects, brands, or products */
  isSystem?: boolean;
  /** Specifies the avatar size */
  size?: 'extraextrasmall' | 'extrasmall' | 'small' | 'medium' | 'large';
  /** Applies status styling */
  status?: 'available' | 'away';
  /** Sets the badge text and applies active styling */
  badge?: string | number;
}
