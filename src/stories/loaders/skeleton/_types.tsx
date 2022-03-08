import { ISkeletonProps } from '@zendeskgarden/react-loaders';

export interface SkeletonArgs extends ISkeletonProps {
   /** Sets the width in px or in percentage of the the parent element's width */
   width?: string;
   /** Sets the height in px or in percentage of parent element's height if the height is not already inherited by `line-height` */
   height?: string;
   /** Inverts the color for use on dark backgrounds */
   isLight?: boolean;
}
