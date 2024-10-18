import {
  Body,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  Table as ZendeskTable,
} from "@zendeskgarden/react-tables";
import { ComponentProps, forwardRef } from "react";

const TableNewComponent = forwardRef<
  HTMLTableElement,
  ComponentProps<typeof ZendeskTable>
>((props, ref) => <ZendeskTable ref={ref} {...props} />);

const TableNew = TableNewComponent as typeof TableNewComponent & {
  Row: typeof Row;
  HeaderRow: typeof HeaderRow;
  Head: typeof Head;
  HeaderCell: typeof HeaderCell;
  Body: typeof Body;
  Cell: typeof Cell;
};

TableNew.Row = Row;
TableNew.HeaderRow = HeaderRow;
TableNew.Head = Head;
TableNew.HeaderCell = HeaderCell;
TableNew.Body = Body;
TableNew.Cell = Cell;

export { TableNew };
