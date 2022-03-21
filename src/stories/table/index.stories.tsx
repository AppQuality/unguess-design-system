import { ComponentMeta, Story } from "@storybook/react";
import { FunctionComponent, useState } from "react";
import { Table, Head, HeaderRow, HeaderCell, Body, Row, Cell, GroupRow, Caption } from ".";
import { TableProps } from "./_types";
import styled from "styled-components";
import { Pagination } from "../pagination";
import { XL } from "../typography/typescale";
import getScrollbarSize from 'dom-helpers/scrollbarSize';
import { FixedSizeList } from 'react-window';
import { Field } from "../forms/field";
import { Checkbox } from "../forms/checkbox";
import { Label } from "../label";
import { KEY_CODES } from '@zendeskgarden/container-utilities';
import { useSpring, animated } from 'react-spring';
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { theme } from '../theme';
import { UgIcon } from "../icons/ug-icons";

interface IRow {
  id?: number | string;
  groupName?: string;
  fruit?: string;
  sunExposure?: string;
  soil?: string;
  selected?: boolean;
}
interface Group {
  groupName: string;
  groupIcon: 'square' | 'triangle' | 'circle';
  items: Array<IRow>;
}
interface TableStoryArg extends TableProps {
  columns: Array<string>;
  items: Array<IRow>;
  groups: Array<Group> | null;
  isStriped?: boolean;
  hasCaption?: boolean;
  isTruncated?: boolean;
}

const createRow = (item: IRow, index: number, isStriped?: boolean, isTruncated?: boolean) => (
  <Row key={index} isStriped={isStriped && index % 2 === 0}>
    <Cell>{item.fruit}</Cell>
    <Cell>{item.sunExposure}</Cell>
    <Cell isTruncated={isTruncated}>{item.soil}</Cell>
  </Row>
);

const DefaultTemplate: Story<TableStoryArg> = ({ columns, items, isStriped, hasCaption, isTruncated, ...args }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 500 }} {...args}>
        {hasCaption && (
            <Caption>
              <XL>Garden details</XL>
            </Caption>
          )
        }
        <Head>
          <HeaderRow>
            {columns.map((key) => (
              <HeaderCell>{key}</HeaderCell>
            ))}
          </HeaderRow>
        </Head>
        <Body>
          {items.map((item, index) => createRow(item, index, isStriped, isTruncated))}
        </Body>
      </Table>
    </div>
  );
};

const tableContent = {
  columns: ['Fruit', 'Sun Exposure', 'Soil'],
  items: [
    {
      fruit: 'Raspberries',
      sunExposure: 'Partial shade',
      soil: 'Moist and slightly acidic',
    },
    {
      fruit: 'Strawberries',
      sunExposure: 'Full sun',
      soil: 'Medium moisture',
    },
    {
      fruit: 'Grapes',
      sunExposure: 'Full sun',
      soil: 'Rich and well draining',
    },
    {
      fruit: 'Cherries',
      sunExposure: 'Partial sun',
      soil: 'Rich and well draining',
    },
    {
      fruit: 'Tomatoes',
      sunExposure: 'Partial shade',
      soil: 'Well draining',
    }
  ],
  groups: null
};

const defaultArgs: TableStoryArg = {
  ...tableContent
};
export const Default = DefaultTemplate.bind({});
Default.args = defaultArgs;

/** GROUPED */
interface GroupRowProps {
  handleToggle: any;
  open: boolean;
  colSpan?: number;
  group: Group;
}
const StyledGroupRow = styled(GroupRow)`
  cursor: pointer;

  svg {
    vertical-align: middle;
  }

  .closed {
    color: ${theme.palette.grey[500]}
  }

  .title {
    padding-left: 12px;
  }
`
const StyledAnimatedToggle = styled(animated.div)`
  display: inline-block;
  float: right;
`
const StyledUgIcon = styled(UgIcon)`
  padding-right: 10px;
`
const GroupRowComponent: FunctionComponent<GroupRowProps> = (props: GroupRowProps) => {
  const toggleIconAnimation = useSpring({
    config: { duration: 120 },
    transform: props.open ? 'rotate(180deg)' : 'rotate(0deg)',
  })

  return (
    <StyledGroupRow onClick={props.handleToggle}>
      <Cell colSpan={props.colSpan} className={props.open ? undefined : 'closed'}>
        <StyledUgIcon type={props.group.groupIcon} />
        <span className="title">{props.group.groupName} <b>({props.group.items.length})</b></span>
        <StyledAnimatedToggle style={toggleIconAnimation}>
          <ChevronIcon />
        </StyledAnimatedToggle>
      </Cell>
    </StyledGroupRow>
  );
}
const AnimatedRow = styled(Row)`
&.render {
  position:absolute;
  opacity: 0;
}

&.show {
  position: static;
  opacity: 1;
  transition: all 0.6s ease;
}
`
interface GroupComponentProps {
  group: Group;
  columnsLength: number;
}
const GroupComponent: FunctionComponent<any> = ({group, columnsLength}: GroupComponentProps) => {
  const [open, setOpen] = useState(true)

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <>
    <GroupRowComponent colSpan={columnsLength} handleToggle={handleToggle} open={open} group={group} />
    {group.items.map((item, index) => (
      <AnimatedRow key={index} className={open ? 'render show' : 'render'}>
        <Cell>{item.fruit}</Cell>
        <Cell>{item.sunExposure}</Cell>
        <Cell>{item.soil}</Cell>
      </AnimatedRow>
    ))}
    </>
  );
}
const GroupedTemplate: Story<TableStoryArg> = ({ columns, groups, ...args }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 500 }} {...args}>
        <Head>
          <HeaderRow>
            {columns.map((key) => (
              <HeaderCell>{key}</HeaderCell>
            ))}
          </HeaderRow>
        </Head>
        <Body>
          {groups?.map(group => {
            return (<GroupComponent columnsLength={columns.length} group={group}/>)
            }
          )}
        </Body>
      </Table>
    </div>
  );
};
export const Grouped = GroupedTemplate.bind({});
const groupedItems = [
  {
    groupName: 'Fruits',
    groupIcon: 'square' as const,
    items: [
      {
        fruit: 'Raspberries',
        sunExposure: 'Partial shade',
        soil: 'Moist and slightly acidic',
      },
      {
        fruit: 'Strawberries',
        sunExposure: 'Full sun',
        soil: 'Medium moisture',
      },
      {
        fruit: 'Grapes',
        sunExposure: 'Full sun',
        soil: 'Rich and well draining',
      },
      {
        fruit: 'Cherries',
        sunExposure: 'Partial sun',
        soil: 'Rich and well draining',
      },
    ]
  },  
  {
    groupName: 'Vegetables',
    groupIcon: 'triangle' as const,
    items: [
      {
        fruit: 'Tomatoes',
        sunExposure: 'Partial shade',
        soil: 'Well draining',
      }
    ]
  },
  {
    groupName: 'Vegetables',
    groupIcon: 'circle' as const,
    items: [
      {
        fruit: 'Tomatoes',
        sunExposure: 'Partial shade',
        soil: 'Well draining',
      }
    ]
  },
];
Grouped.args = {
  ...defaultArgs,
  columns: ['Type', 'Sun exposure', 'Soil'],
  groups: groupedItems
};

/** WITH PAGINATION */
const StyledTable = styled(Table)`
  margin-bottom: ${p => p.theme.space.md};
  min-width: 500px;
`;
const PaginationTemplate: Story<TableStoryArg> = ({ columns, items, ...args }) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ overflowX: 'auto' }}>
      <StyledTable style={{ minWidth: 500 }} {...args}>
        <Head>
          <HeaderRow>
            {columns.map((key) => (
              <HeaderCell>{key}</HeaderCell>
            ))}
          </HeaderRow>
        </Head>
        <Body>
          {currentPage === 1
            ? items.slice(currentPage - 1, pageSize).map((item, index) => createRow(item, index))
            : items
                .slice(currentPage * pageSize - pageSize, currentPage * pageSize)
                .map((item, index) => createRow(item, index))}
        </Body>
      </StyledTable>
      <Pagination
        totalPages={items.length / pageSize}
        currentPage={currentPage}
        onChange={setCurrentPage}
      />
    </div>
  );
};
export const WithPagination = PaginationTemplate.bind({});
WithPagination.args = {
  ...defaultArgs,
  items: Array.from(Array(100)).map((row, index) => ({
    fruit: `Fruit #${index}`,
    sunExposure: 'Full sun',
    soil: 'Well draining'
  }))
};

/** STRIPED */
export const Striped = DefaultTemplate.bind({});
Striped.args = {
  ...defaultArgs,
  isStriped: true
};

/** WITH CAPTION */
export const WithCaption = DefaultTemplate.bind({});
WithCaption.args = {
  ...defaultArgs,
  hasCaption: true
};

/** TRUNCATED */
export const Truncated = DefaultTemplate.bind({});
Truncated.args = {
  ...defaultArgs,
  items: [
    ...defaultArgs.items,
    {
      fruit: 'Raspberries',
      sunExposure: 'Partial shade',
      soil: 'Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic',
    }
  ],
  isTruncated: true
};

/** SCROLL */
const SCROLLBAR_SIZE = getScrollbarSize();
const StyledSpacerCell = styled(HeaderCell)`
  padding: 0;
  width: ${SCROLLBAR_SIZE}px;
`;
const ScrollTemplate: Story<TableStoryArg> = ({ columns, items, ...args }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 400 }} {...args}>
        <Head>
          <HeaderRow>
            {columns.map((key) => (
              <HeaderCell>{key}</HeaderCell>
            ))}
            <StyledSpacerCell aria-hidden />
          </HeaderRow>
        </Head>
      </Table>
      <div style={{ maxHeight: 420, overflowY: 'auto' }}>
        <Table>
          <Body>
            {items.map((item, index) => createRow(item, index))}
          </Body>
        </Table>
      </div>
    </div>
  );
};
export const Scroll = ScrollTemplate.bind({});
Scroll.args = {
  ...defaultArgs,
  items: Array.from(Array(100)).map((row, index) => ({
    fruit: `Fruit #${index}`,
    sunExposure: 'Full sun',
    soil: 'Well draining'
  }))
};

/** SELECTION */
const isSelectAllIndeterminate = (rows: IRow[]) => {
  const numSelectedRows = rows.reduce((accumulator, row) => {
    if (row.selected) {
      return accumulator + 1;
    }

    return accumulator;
  }, 0);

  return numSelectedRows > 0 && numSelectedRows < rows.length;
};
const isSelectAllChecked = (rows: IRow[]) => rows.every(row => row.selected);
const SelectionTemplate: Story<TableStoryArg> = ({ columns, items, ...args }) => {
  const [data, setData] = useState(items);
  const [shiftEnabled, setShiftEnabled] = useState(false);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | undefined>(undefined);

  return (
    <div style={{ overflowX: 'auto' }}>
      <Table style={{ minWidth: 500 }}>
        <Head>
          <HeaderRow>
            <HeaderCell isMinimum>
              <Field>
                <Checkbox
                  indeterminate={isSelectAllIndeterminate(data)}
                  checked={isSelectAllChecked(data)}
                  onChange={e => {
                    if (e.target.checked) {
                      const updatedRows = data.map(row => ({ ...row, selected: true }));

                      setData(updatedRows);
                    } else {
                      const updatedRows = data.map(row => ({ ...row, selected: false }));

                      setData(updatedRows);
                    }
                  }}
                >
                  <Label hidden>Select all tickets</Label>
                </Checkbox>
              </Field>
            </HeaderCell>
            <HeaderCell>Fruit</HeaderCell>
            <HeaderCell>Sun exposure</HeaderCell>
            <HeaderCell>Soil type</HeaderCell>
          </HeaderRow>
        </Head>
        <Body>
          {data.map((row, index) => (
            <Row key={row.id} isSelected={row.selected}>
              <Cell isMinimum>
                <Field>
                  <Checkbox
                    checked={row.selected}
                    onKeyDown={e => {
                      if (e.keyCode === KEY_CODES.SHIFT) {
                        setShiftEnabled(true);
                      }
                    }}
                    onKeyUp={() => {
                      setShiftEnabled(false);
                    }}
                    onChange={e => {
                      const updatedRows = [...data];

                      if (shiftEnabled && focusedRowIndex !== undefined) {
                        const startIndex = Math.min(focusedRowIndex, index);
                        const endIndex = Math.max(focusedRowIndex, index);

                        const isAllChecked = updatedRows
                          .slice(startIndex, endIndex + 1)
                          .every(slicedRow => slicedRow.selected);

                        for (let x = startIndex; x <= endIndex; x++) {
                          if (x === index && isAllChecked) {
                            updatedRows[x].selected = true;
                            continue;
                          }

                          updatedRows[x].selected = !isAllChecked;
                        }
                      } else if (e.target.checked) {
                        updatedRows[index].selected = true;
                      } else {
                        updatedRows[index].selected = false;
                      }

                      setData(updatedRows);
                      setFocusedRowIndex(index);
                    }}
                  >
                    <Label hidden>Select ticket</Label>
                  </Checkbox>
                </Field>
              </Cell>
              <Cell>{row.fruit}</Cell>
              <Cell>{row.sunExposure}</Cell>
              <Cell>{row.soil}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </div>
  );
};
export const Selection = SelectionTemplate.bind({});
Selection.args = {
  ...defaultArgs,
  items: Array.from(Array(10)).map((row, index) => ({
    id: `row-${index}`,
    fruit: `Fruit #${index + 1}`,
    sunExposure: 'Full sun',
    soil: 'Well draining',
    selected: false
  }))
};

/** VIRTUAL SCROLLING */
const ScrollableTable = styled(Table).attrs({ role: 'presentation' })`
  /* stylelint-disable-next-line */
  display: block !important;
`;
const ScrollableHead = styled(Head)`
  display: block;
`;
const ScrollableHeaderRow = styled(HeaderRow).attrs({ role: 'row' })`
  /* stylelint-disable-next-line */
  display: table !important;
  width: 100%;
  table-layout: fixed;
`;
const ScrollableHeaderCell = styled(HeaderCell).attrs({ role: 'columnheader' })``;
const ScrollableBody = styled(Body)`
  /* stylelint-disable-next-line */
  display: block !important;
`;
const ScrollableRow = styled(Row).attrs({ role: 'row' })`
  /* stylelint-disable-next-line */
  display: table !important;
  table-layout: fixed;
`;
const ScrollableCell = styled(Cell).attrs({ role: 'cell' })``;
const VirtualScrollingTemplate: Story<TableStoryArg> = ({ columns, items, ...args }) => {
  return (
    <div role="grid" aria-rowcount={items.length} aria-colcount={4}>
      <ScrollableTable>
        <ScrollableHead>
          <ScrollableHeaderRow>
            <ScrollableHeaderCell>Fruit</ScrollableHeaderCell>
            <ScrollableHeaderCell>Sun exposure</ScrollableHeaderCell>
            <ScrollableHeaderCell>Soil type</ScrollableHeaderCell>
            <StyledSpacerCell aria-hidden />
          </ScrollableHeaderRow>
        </ScrollableHead>
      </ScrollableTable>
      <FixedSizeList
        height={420}
        itemCount={items.length}
        itemSize={40}
        width="100%"
        outerElementType={ScrollableTable}
        innerElementType={ScrollableBody}
      >
        {({ index, style }) => (
          <ScrollableRow key={items[index].id} style={style} aria-rowindex={index + 1}>
            <ScrollableCell isTruncated>{items[index].fruit}</ScrollableCell>
            <ScrollableCell isTruncated>{items[index].sunExposure}</ScrollableCell>
            <ScrollableCell isTruncated>{items[index].soil}</ScrollableCell>
          </ScrollableRow>
        )}
      </FixedSizeList>
    </div>
  );
};
export const VirtualScrolling = VirtualScrollingTemplate.bind({});
VirtualScrolling.args = {
  ...defaultArgs,
  items: Array.from(Array(1000)).map((row, index) => ({
    id: index,
    fruit: `Fruit #${index + 1}`,
    sunExposure: 'Full sun',
    soil: 'Well draining'
  }))
};

export default {
  title: "Molecules/Table",
  component: Table,
} as ComponentMeta<typeof Table>;
