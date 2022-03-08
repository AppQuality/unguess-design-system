import { ISpinnerProps } from '@zendeskgarden/react-loaders';

export interface SpinnerArgs extends ISpinnerProps {
   /**
   * Sets the height and width in pixels. Inherits the parent's font size by default.
   **/
   size?: string;
   /**
    * Sets the length of the animation cycle in milliseconds
    **/
   duration?: number;
   /**
    * Sets the fill color. Inherits the parent's `color` by default.
    **/
   color?: string;
   /**
    * Delays displaying the loader to prevent a render flash during normal loading times
    **/
   delayMS?: number;
}
