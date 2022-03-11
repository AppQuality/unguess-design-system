import { IAccordionProps } from "@zendeskgarden/react-accordions";

export interface AccordionArgs extends IAccordionProps {
  /** Sets `aria-level` heading rank in the document structure */
  level: number;
  /** Sets the expanded sections in a controlled accordion */
  expandedSections?: number[];
  /** Sets the default expanded sections in an uncontrolled accordion */
  defaultExpandedSections?: number[];
  /** Hides section borders */
  isBare?: boolean;
  /** Allows uncontrolled accordion sections to collapse */
  isCollapsible?: boolean;
  /** Applies compact styling */
  isCompact?: boolean;
  /** Animates section expansion and collapse */
  isAnimated?: boolean;
  /** Enables simultaneous expansion of uncontrolled accordion sections */
  isExpandable?: boolean;
  /**
   * Handles accordion expansion changes
   *
   * @param {number} index A section index
   */
  onChange?: (index: number) => void;
}
