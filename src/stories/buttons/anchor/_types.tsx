import { IAnchorProps } from "@zendeskgarden/react-buttons";

export interface AnchorArgs extends IAnchorProps {
  /** Applies danger styling */
  isDanger?: boolean;
  /**
   * Attaches `target="_blank"` and `rel="noopener noreferrer"` to an anchor that
   * navigates to an external resource. This ensures that the anchor is a
   * safe [cross-origin destination link](https://web.dev/external-anchors-use-rel-noopener/).
   **/
  isExternal?: boolean;
}
