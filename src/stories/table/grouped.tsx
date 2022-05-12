import { Table, Head, HeaderRow, HeaderCell, Body, Row, Cell } from ".";
import { GroupRow as ZendeskGroupRow } from "@zendeskgarden/react-tables";
import { FunctionComponent, useState } from "react";
import { Label } from "../label";
import { theme } from "../theme";
import { Group, RowArgs, TableProps } from "./_types";
import { animated, useSpring } from "react-spring";
import { Icon } from "../icons";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-down-stroke.svg";
import styled from "styled-components";

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

const UgGroupRow = styled(ZendeskGroupRow)`
  cursor: pointer;
  border: 0;

  &:last-child {
    td {
      border-bottom: 0;
    }
  }

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
const GroupRow = (props: RowArgs) => <UgGroupRow {...props} />;

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
    <GroupRow
      {...(props && props.group.items.length === 0 && { className: "empty" })}
      {...(props &&
        props.group.items.length > 0 && { onClick: props.handleToggle })}
      {...props}
    >
      <Cell colSpan={props.colSpan} className={props.open ? "open" : "closed"}>
        {props.group.groupIcon && (
          <StyledUgIcon size={12} type={props.group.groupIcon} />
        )}
        <Label isRegular className="title">
          {props.group.groupName} <b>({props.group.items.length})</b>
        </Label>
        <StyledAnimatedToggle style={toggleIconAnimation}>
          <ChevronIcon />
        </StyledAnimatedToggle>
      </Cell>
    </GroupRow>
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
  columns: any[];
}
const GroupComponent: FunctionComponent<any> = ({
  group,
  columns,
}: GroupComponentProps) => {
  const [open, setOpen] = useState(true);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <GroupRowComponent
        colSpan={columns.length}
        handleToggle={handleToggle}
        open={open}
        group={group}
      />
      {group.items.map((item, index) => (
        <AnimatedRow key={index} className={open ? "render show" : "render"}>
          {columns.map((column) => (
            <Cell key={column.field}>{item[column.field]}</Cell>
          ))}
        </AnimatedRow>
      ))}
    </>
  );
};
const GroupedTable = ({ columns, groups, ...args }: TableProps) => (
  <Table style={{ minWidth: 500 }} {...args}>
    <Head>
      <HeaderRow>
        {columns?.map((column) => (
          <HeaderCell key={column.field}>{column.name}</HeaderCell>
        ))}
      </HeaderRow>
    </Head>
    <Body>
      {groups?.map((group, index) => {
        return <GroupComponent key={index} columns={columns} group={group} />;
      })}
    </Body>
  </Table>
);

export { GroupedTable, GroupRow };
