import {
  Table as ZendeskTable,
  Head as ZendeskHead,
  HeaderRow as ZendeskHeaderRow,
  HeaderCell as ZendeskHeaderCell,
  Body as ZendeskBody,
  Row as ZendeskRow,
  Cell as ZendeskCell,
  GroupRow as ZendeskGroupRow,
  Caption as ZendeskCaption,
  SortableCell as ZendeskSortableCell,
} from "@zendeskgarden/react-tables";
import { FunctionComponent, HTMLAttributes, useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { Label } from "../label";
import { theme } from "../theme";
import {
  CellArgs,
  Group,
  HeaderCellArgs,
  RowArgs,
  SortableCellArgs,
  TableProps,
} from "./_types";
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { Icon } from "../icons";

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
const GroupRow = (props: RowArgs) => <ZendeskGroupRow {...props} />;
const Caption = (props: HTMLAttributes<HTMLTableCaptionElement>) => (
  <ZendeskCaption {...props} />
);
const SortableCell = (props: SortableCellArgs) => (
  <ZendeskSortableCell {...props} />
);

const StyledGroupRow = styled(GroupRow)`
  cursor: pointer;

  &.empty {
    cursor: default;

    * {
      color: ${theme.palette.grey[500]} !important;
      cursor: default !important;
    }
  }

  svg {
    vertical-align: middle;
  }

  .title {
    padding-left: 10px;
    vertical-align: middle;
    font-size: ${theme.fontSizes.sm};
    cursor: pointer;
  }
`;
const StyledAnimatedToggle = styled(animated.div)`
  display: inline-block;
  float: right;
`;
const StyledUgIcon = styled(Icon)``;

interface GroupRowProps {
  handleToggle: any;
  open: boolean;
  colSpan?: number;
  group: Group;
}
const GroupRowComponent: FunctionComponent<GroupRowProps> = (
  props: GroupRowProps
) => {
  const toggleIconAnimation = useSpring({
    config: { duration: 120 },
    transform:
      props.group.items.length > 0
        ? props.open
          ? "rotate(180deg)"
          : "rotate(0deg)"
        : "rotate(0deg)",
  });

  return (
    <StyledGroupRow
      {...(props && props.group.items.length === 0 && { className: "empty" })}
      {...(props &&
        props.group.items.length > 0 && { onClick: props.handleToggle })}
    >
      <Cell colSpan={props.colSpan} className={props.open ? "open" : "closed"}>
        <StyledUgIcon size={12} type={props.group.groupIcon} />
        <Label isRegular className="title">
          {props.group.groupName} <b>({props.group.items.length})</b>
        </Label>
        <StyledAnimatedToggle style={toggleIconAnimation}>
          <ChevronIcon />
        </StyledAnimatedToggle>
      </Cell>
    </StyledGroupRow>
  );
};
const AnimatedRow = styled(Row)`
  &.render {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }

  &.show {
    position: static;
    opacity: 1;
    transition: all 0.6s ease;
  }
`;
interface GroupComponentProps {
  group: Group;
  columnsLength: number;
}
const GroupComponent: FunctionComponent<any> = ({
  group,
  columnsLength,
}: GroupComponentProps) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <GroupRowComponent
        colSpan={columnsLength}
        handleToggle={handleToggle}
        open={open}
        group={group}
      />
      {group.items.map((item, index) => (
        <AnimatedRow key={index} className={open ? "render show" : "render"}>
          <Cell>{item.fruit}</Cell>
          <Cell>{item.sunExposure}</Cell>
          <Cell>{item.soil}</Cell>
        </AnimatedRow>
      ))}
    </>
  );
};
const GroupedTable = ({ columns, groups, ...args }: TableProps) => (
  <Table style={{ minWidth: 500 }} {...args}>
    <Head>
      <HeaderRow>
        {columns?.map((key) => (
          <HeaderCell>{key}</HeaderCell>
        ))}
      </HeaderRow>
    </Head>
    <Body>
      {groups?.map((group) => {
        return <GroupComponent columnsLength={columns?.length} group={group} />;
      })}
    </Body>
  </Table>
);

export {
  Table,
  Head,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  GroupRow,
  Caption,
  SortableCell,
  GroupedTable,
};
