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

const UgTable = styled(ZendeskTable)`
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-collapse: separate !important;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
`;

const UgHeaderRow = styled(ZendeskHeaderRow)`
  border: 0;
`;
const UgHeaderCell = styled(ZendeskHeaderCell)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  vertical-align: middle;
`;

const UgRow = styled(ZendeskRow)`
  border: 0;

  &:last-child {
    td {
      border-bottom: 0;
    }
  }
`;

const UgCell = styled(ZendeskCell)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  vertical-align: middle;
`;

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
const HeaderRow = (props: RowArgs) => <UgHeaderRow {...props} />;
const HeaderCell = (props: HeaderCellArgs) => <UgHeaderCell {...props} />;
const Body = (props: HTMLAttributes<HTMLTableSectionElement>) => (
  <ZendeskBody {...props} />
);
const Row = (props: RowArgs) => <UgRow {...props} />;
const Cell = (props: CellArgs) => <UgCell {...props} />;

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
  SortableCell
};
