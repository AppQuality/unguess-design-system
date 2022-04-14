import { IMediaInputProps } from "@zendeskgarden/react-forms";

export interface MediaInputArgs extends IMediaInputProps {
  /** Applies compact styling */
  isCompact?: boolean;
  /** Removes borders and padding */
  isBare?: boolean;
  /** Accepts a "start" icon to display */
  start?: any;
  /** Accepts an "end" icon to display */
  end?: any;
  /** Applies validation state styling */
  validation?: 'success' | 'warning' | 'error';
}