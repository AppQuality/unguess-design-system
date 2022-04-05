import { HTMLAttributes } from "react";
import styled from "styled-components";
import {
  Table as ZendeskTable,
  Head as ZendeskHead,
  HeaderRow as ZendeskHeaderRow,
  HeaderCell as ZendeskHeaderCell,
  Body as ZendeskBody,
  Row as ZendeskRow,
  Cell as ZendeskCell,
  Caption as ZendeskCaption,
  SortableCell as ZendeskSortableCell,
} from "@zendeskgarden/react-tables";

import {
  CellArgs,
  HeaderCellArgs,
  RowArgs,
  SortableCellArgs,
  TableProps,
} from "./_types";

import {GroupRow, GroupedTable} from "./grouped"

const UgTable = styled(ZendeskTable)``;

/**
 * A Table organizes data into columns and rows. Tables make it easier for users to compare and analyze information.

 * Used for this:
    - To organize and display read-only data with logical relationships

 * Not for this:
    - To structure content on a page, use the Grid component instead
 */
const Table = (props: TableProps) => <UgTable {...props} />;

// Extras
const Head = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <ZendeskHead {...props} />
);
const HeaderRow = (props: RowArgs) => <ZendeskHeaderRow {...props} />;
const HeaderCell = (props: HeaderCellArgs) => <ZendeskHeaderCell {...props} />;
const Body = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <ZendeskBody {...props} />
);
const Row = (props: RowArgs) => <ZendeskRow {...props} />;
const Cell = (props: CellArgs) => <ZendeskCell {...props} />;

const Caption = (props: HTMLAttributes<HTMLTableCaptionElement>) => (
  <ZendeskCaption {...props} />
);
const SortableCell = (props: SortableCellArgs) => (
  <ZendeskSortableCell {...props} />
);

export {
  Table,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  Caption,
  SortableCell,
  GroupRow,
  GroupedTable
};
