import { IProgressProps } from '@zendeskgarden/react-loaders';

export interface ProgressArgs extends IProgressProps {
   /** Sets the progress as a value between 0 and 100 */
   value?: number;
   /**
    * Sets the foreground bar's fill color.
    * Defaults to the `successHue` [theme](/components/theme-object#colors) value.
    */
   color?: string;
   /** Adjusts the height */
   size?: 'small' | 'medium' | 'large';
}
