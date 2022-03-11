import { 
   Table as ZendeskTable, 
   Head as ZendeskHead, 
   HeaderRow as ZendeskHeaderRow, 
   HeaderCell as ZendeskHeaderCell,
   Body as ZendeskBody,
   Row as ZendeskRow,
   Cell as ZendeskCell,
   GroupRow as ZendeskGroupRow,
   Caption as ZendeskCaption
} from '@zendeskgarden/react-tables';
import styled from "styled-components";
import { CellArgs, HeaderCellArgs, RowArgs, TableProps } from './_types';

const UgTable = styled(ZendeskTable)``;

/**
 * A Table organizes data into columns and rows. Tables make it easier for users to compare and analyze information.

 * Used for this:
    - To organize and display read-only data with logical relationships

 * Not for this:
    - To structure content on a page, use the Grid component instead
 */
const Table = (props: TableProps) => <UgTable {...props}/>;

// Extras
const Head = ({children}: React.PropsWithChildren<{}>) => <ZendeskHead>{children}</ZendeskHead>;
const HeaderRow = ({children}: React.PropsWithChildren<{}>) => <ZendeskHeaderRow>{children}</ZendeskHeaderRow>;
const HeaderCell = (props: HeaderCellArgs) => <ZendeskHeaderCell {...props}/>;
const Body = ({children}: React.PropsWithChildren<{}>) => <ZendeskBody>{children}</ZendeskBody>;
const Row = (props: RowArgs) => <ZendeskRow {...props} />;
const Cell = (props: CellArgs) => <ZendeskCell {...props} />;
const GroupRow = ({children}: React.PropsWithChildren<{}>) => <ZendeskGroupRow>{children}</ZendeskGroupRow>;
const Caption = ({children}: React.PropsWithChildren<{}>) => <ZendeskCaption>{children}</ZendeskCaption>;

export { 
   Table, 
   Head, 
   HeaderRow, 
   HeaderCell, 
   Body, 
   Row, 
   Cell, 
   GroupRow, 
   Caption 
};
