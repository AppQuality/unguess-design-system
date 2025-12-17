import {
  CursorPagination as ZendeskCursorPagination,
  OffsetPagination as ZendeskPagination,
} from "@zendeskgarden/react-pagination";
import styled from "styled-components";
import { PaginationProps } from "./_types";

const UgPagination = styled(ZendeskPagination)``;

/**
 * Pagination separates content into pages and allows users to navigate between those pages.

 * Used for this:
    - To divide large amounts of data into manageable chunks

 */
const Pagination = (props: PaginationProps) => <UgPagination {...props} />;

const CursorPagination = ZendeskCursorPagination;

export { Pagination, CursorPagination };
