import { IPaginationProps, PAGE_TYPE } from "@zendeskgarden/react-pagination";

export interface PaginationProps extends IPaginationProps {
  /**
     * Sets the current page. Pages start at 1.
     */
   currentPage: number;
   /**
    * Defines the total number of pages
    */
   totalPages: number;
   /**
    * Sets the number of pages that appear between the current page and a gap indicator
    */
   pagePadding?: number;
   /**
    * Positions the leading and trailing gap indicator, based on
    * the current and total pages
    */
   pageGap?: number;
   /**
    * Handles page change events
    *
    * @param {any} currentPage The current page
    */
   onChange?: (currentPage: number) => void;
   /**
    * Applies localized labels, test attributes, etc. to individual pages
    *
    * @param {string} pageType The type of the page accepting the props; one of:
    * "previous", "gap", "page", "next"
    * @param {any} props Default page props to transform
    */
   transformPageProps?: (pageType: PAGE_TYPE, props: any) => any;
}