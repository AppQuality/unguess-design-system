import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import {
  Body,
  Caption,
  Cell,
  Head,
  HeaderCell,
  HeaderRow,
  Row,
  SortableCell,
  Table,
} from ".";

import { GroupedTable } from "./grouped";

import getScrollbarSize from "dom-helpers/scrollbarSize";
import { FixedSizeList } from "react-window";
import styled from "styled-components";
import { Checkbox } from "../forms/checkbox";
import { Field } from "../forms/field";
import { Label } from "../label";
import { Pagination } from "../pagination";
import { XL } from "../typography/typescale";
import { IRow, TableProps } from "./_types";

const createRow = (
  item: IRow,
  index: number,
  isStriped?: boolean,
  isTruncated?: boolean
) => (
  <Row key={index} isStriped={isStriped && index % 2 === 0}>
    <Cell>{item.fruit}</Cell>
    <Cell>{item.sunExposure}</Cell>
    <Cell isTruncated={isTruncated}>{item.soil}</Cell>
  </Row>
);

const DefaultTemplate: Story<TableProps> = ({
  columns,
  items,
  isStriped,
  hasCaption,
  isTruncated,
  ...args
}) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table style={{ minWidth: 500 }} {...args}>
        {hasCaption && (
          <Caption>
            <XL>Garden details</XL>
          </Caption>
        )}
        <Head>
          <HeaderRow>
            {columns?.map((column) => (
              <HeaderCell key={column.field}>{column.name}</HeaderCell>
            ))}
          </HeaderRow>
        </Head>
        <Body>
          {items?.map((item, index) =>
            createRow(item, index, isStriped, isTruncated)
          )}
        </Body>
      </Table>
    </div>
  );
};

const tableContent = {
  columns: [
    { name: "Type", field: "type" },
    { name: "Sun exposure", field: "sunExposure" },
    { name: "Soil", field: "soil" },
  ],
  items: [
    {
      fruit: "Raspberries",
      sunExposure: "Partial shade",
      soil: "Moist and slightly acidic",
    },
    {
      fruit: "Strawberries",
      sunExposure: "Full sun",
      soil: "Medium moisture",
    },
    {
      fruit: "Grapes",
      sunExposure: "Full sun",
      soil: "Rich and well draining",
    },
    {
      fruit: "Cherries",
      sunExposure: "Partial sun",
      soil: "Rich and well draining",
    },
    {
      fruit: "Tomatoes",
      sunExposure: "Partial shade",
      soil: "Well draining",
    },
  ],
  groups: null,
};

const defaultArgs: TableProps = {
  ...tableContent,
};
export const Default = DefaultTemplate.bind({});
Default.args = defaultArgs;

/** GROUPED */
const GroupedTemplate: Story<TableProps> = ({ ...args }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <GroupedTable {...args} />
    </div>
  );
};
export const Grouped = GroupedTemplate.bind({});
const groupedItems = [
  {
    groupName: "Fruits",
    groupIcon: "square" as const,
    items: [
      {
        fruit: "Raspberries",
        sunExposure: "Partial shade",
        soil: "Moist and slightly acidic",
      },
      {
        fruit: "Strawberries",
        sunExposure: "Full sun",
        soil: "Medium moisture",
      },
      {
        fruit: "Grapes",
        sunExposure: "Full sun",
        soil: "Rich and well draining",
      },
      {
        fruit: "Cherries",
        sunExposure: "Partial sun",
        soil: "Rich and well draining",
      },
    ],
  },
  {
    groupName: "Vegetables",
    groupIcon: "triangle" as const,
    items: [
      {
        fruit: "Tomatoes",
        sunExposure: "Partial shade",
        soil: "Well draining",
      },
    ],
  },
  {
    groupName: "Vegetables",
    groupIcon: "circle" as const,
    items: [
      {
        fruit: "Tomatoes",
        sunExposure: "Partial shade",
        soil: "Well draining",
      },
    ],
  },
  {
    groupName: "Arancini",
    groupIcon: "triangle" as const,
    items: [],
  },
];
Grouped.args = {
  ...defaultArgs,
  columns: [
    { name: "Type", field: "fruit" },
    { name: "Sun exposure", field: "sunExposure" },
    { name: "Soil", field: "soil" },
  ],
  groups: groupedItems,
};

/** WITH PAGINATION */
const StyledTable = styled(Table)`
  margin-bottom: ${(p) => p.theme.space.md};
  min-width: 500px;
`;
const PaginationTemplate: Story<TableProps> = ({ columns, items, ...args }) => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ overflowX: "auto" }}>
      <StyledTable style={{ minWidth: 500 }} {...args}>
        <Head>
          <HeaderRow>
            {columns?.map((column) => (
              <HeaderCell key={column.field}>{column.name}</HeaderCell>
            ))}
          </HeaderRow>
        </Head>
        <Body>
          {currentPage === 1
            ? items
                ?.slice(currentPage - 1, pageSize)
                .map((item: IRow, index: number) => createRow(item, index))
            : items
                ?.slice(
                  currentPage * pageSize - pageSize,
                  currentPage * pageSize
                )
                .map((item: IRow, index: number) => createRow(item, index))}
        </Body>
      </StyledTable>
      <Pagination
        totalPages={items!.length / pageSize}
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
    sunExposure: "Full sun",
    soil: "Well draining",
  })),
};

/** STRIPED */
export const Striped = DefaultTemplate.bind({});
Striped.args = {
  ...defaultArgs,
  isStriped: true,
};

/** WITH CAPTION */
export const WithCaption = DefaultTemplate.bind({});
WithCaption.args = {
  ...defaultArgs,
  hasCaption: true,
};

/** TRUNCATED */
export const Truncated = DefaultTemplate.bind({});
Truncated.args = {
  ...defaultArgs,
  items: [
    ...defaultArgs.items!,
    {
      fruit: "Raspberries",
      sunExposure: "Partial shade",
      soil: "Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic Moist and slightly acidic",
    },
  ],
  isTruncated: true,
};

/** SCROLL */
const SCROLLBAR_SIZE = getScrollbarSize();
const StyledSpacerCell = styled(HeaderCell)`
  padding: 0;
  width: ${SCROLLBAR_SIZE}px;
`;
const ScrollTemplate: Story<TableProps> = ({ columns, items, ...args }) => {
  return (
    <div style={{ overflowX: "auto" }}>
      <Table style={{ minWidth: 400 }} {...args}>
        <Head>
          <HeaderRow>
            {columns?.map((column) => (
              <HeaderCell key={column.field}>{column.name}</HeaderCell>
            ))}
            <StyledSpacerCell aria-hidden />
          </HeaderRow>
        </Head>
      </Table>
      <div style={{ maxHeight: 420, overflowY: "auto" }}>
        <Table>
          <Body>{items?.map((item, index) => createRow(item, index))}</Body>
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
    sunExposure: "Full sun",
    soil: "Well draining",
  })),
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
const isSelectAllChecked = (rows: IRow[]) => rows.every((row) => row.selected);
const SelectionTemplate: Story<TableProps> = ({ columns, items, ...args }) => {
  const [data, setData] = useState(items!);
  const [shiftEnabled, setShiftEnabled] = useState(false);
  const [focusedRowIndex, setFocusedRowIndex] = useState<number | undefined>(
    undefined
  );

  return (
    <div style={{ overflowX: "auto" }}>
      <Table style={{ minWidth: 500 }}>
        <Head>
          <HeaderRow>
            <HeaderCell isMinimum>
              <Field>
                <Checkbox
                  indeterminate={isSelectAllIndeterminate(data)}
                  checked={isSelectAllChecked(data)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const updatedRows = data.map((row) => ({
                        ...row,
                        selected: true,
                      }));

                      setData(updatedRows);
                    } else {
                      const updatedRows = data.map((row) => ({
                        ...row,
                        selected: false,
                      }));

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
                    onKeyDown={(e) => {
                      if (e.shiftKey) {
                        setShiftEnabled(true);
                      }
                    }}
                    onKeyUp={() => {
                      setShiftEnabled(false);
                    }}
                    onChange={(e) => {
                      const updatedRows = [...data];

                      if (shiftEnabled && focusedRowIndex !== undefined) {
                        const startIndex = Math.min(focusedRowIndex, index);
                        const endIndex = Math.max(focusedRowIndex, index);

                        const isAllChecked = updatedRows
                          .slice(startIndex, endIndex + 1)
                          .every((slicedRow) => slicedRow.selected);

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
    sunExposure: "Full sun",
    soil: "Well draining",
    selected: false,
  })),
};

/** SORT */
type Direction = "asc" | "desc" | undefined;
const sortData = (
  tableData: IRow[],
  sunExposureSort: Direction,
  soilSort: Direction
) => {
  if (!sunExposureSort && !soilSort) {
    return tableData;
  }

  let field: "sunExposure" | "soil";
  let sortValue: Direction;

  if (sunExposureSort) {
    field = "sunExposure";
    sortValue = sunExposureSort;
  } else {
    field = "soil";
    sortValue = soilSort;
  }

  return tableData.sort((a, b) => {
    const aValue = a[field] || "";
    const bValue = b[field] || "";

    if (aValue > bValue) {
      return sortValue === "asc" ? 1 : -1;
    } else if (aValue < bValue) {
      return sortValue === "asc" ? -1 : 1;
    }

    return 0;
  });
};
const SortTemplate: Story<TableProps> = ({ columns, items, ...args }) => {
  const [data, setData] = useState(items);
  const [sunExposureSort, setSunExposureSort] = useState<Direction>();
  const [soilSort, setSoilSort] = useState<Direction>();

  return (
    <div style={{ overflowX: "auto" }}>
      <Table style={{ minWidth: 500 }}>
        <Head>
          <HeaderRow>
            <HeaderCell>Fruit</HeaderCell>
            <SortableCell
              onClick={() => {
                if (sunExposureSort === "asc") {
                  setSunExposureSort("desc");
                } else if (sunExposureSort === "desc") {
                  setSunExposureSort(undefined);
                } else {
                  setSunExposureSort("asc");
                }
                setSoilSort(undefined);
                setData(data);
              }}
              sort={sunExposureSort}
            >
              Sun Exposure
            </SortableCell>
            <SortableCell
              onClick={() => {
                if (soilSort === "asc") {
                  setSoilSort("desc");
                } else if (soilSort === "desc") {
                  setSoilSort(undefined);
                } else {
                  setSoilSort("asc");
                }
                setSunExposureSort(undefined);
                setData(data);
              }}
              sort={soilSort}
            >
              Soil
            </SortableCell>
          </HeaderRow>
        </Head>
        <Body>
          {sortData(data!.slice(), sunExposureSort, soilSort).map((row) => (
            <Row key={row.id}>
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
export const Sort = SortTemplate.bind({});
Sort.args = {
  ...defaultArgs,
  items: Array.from(Array(10)).map((row, index) => ({
    id: `row-${index}`,
    fruit: `Custom fruit ${index + 1}`,
    sunExposure: index % 2 === 0 ? "Partial shade" : "Full sun",
    soil: index % 3 === 0 ? "Moist and slightly acidic" : "Well draining",
  })),
};

/** VIRTUAL SCROLLING */
const FixedTable = styled(Table).attrs({ role: "presentation" })`
  /* stylelint-disable-next-line */
  display: block !important;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

const ScrollableTable = styled(Table).attrs({ role: "presentation" })`
  /* stylelint-disable-next-line */
  display: block !important;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-top: 0;
`;

const ScrollableHead = styled(Head)`
  display: block;
`;

const ScrollableHeaderRow = styled(HeaderRow).attrs({ role: "row" })`
  /* stylelint-disable-next-line */
  display: table !important;
  width: 100%;
  table-layout: fixed;
  border: 0;

  th {
    border-bottom: 0;
  }
`;

const ScrollableHeaderCell = styled(HeaderCell).attrs({
  role: "columnheader",
})``;

const ScrollableBody = styled(Body)`
  /* stylelint-disable-next-line */
  display: block !important;
`;

const ScrollableRow = styled(Row).attrs({ role: "row" })`
  /* stylelint-disable-next-line */
  display: table !important;
  table-layout: fixed;
`;

const ScrollableCell = styled(Cell).attrs({ role: "cell" })``;

const VirtualScrollingTemplate: Story<TableProps> = ({
  columns,
  items,
  ...args
}) => {
  return (
    <div role="grid" aria-rowcount={items?.length || 0} aria-colcount={4}>
      <FixedTable>
        <ScrollableHead>
          <ScrollableHeaderRow>
            <ScrollableHeaderCell>Fruit</ScrollableHeaderCell>
            <ScrollableHeaderCell>Sun exposure</ScrollableHeaderCell>
            <ScrollableHeaderCell>Soil type</ScrollableHeaderCell>
            <StyledSpacerCell aria-hidden />
          </ScrollableHeaderRow>
        </ScrollableHead>
      </FixedTable>
      <FixedSizeList
        height={420}
        itemCount={items!.length}
        itemSize={40}
        width="100%"
        outerElementType={ScrollableTable}
        innerElementType={ScrollableBody}
      >
        {({ index, style }) => (
          <ScrollableRow
            key={items![index].id}
            style={style}
            aria-rowindex={index + 1}
          >
            <ScrollableCell isTruncated>{items![index].fruit}</ScrollableCell>
            <ScrollableCell isTruncated>
              {items![index].sunExposure}
            </ScrollableCell>
            <ScrollableCell isTruncated>{items![index].soil}</ScrollableCell>
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
    sunExposure: "Full sun",
    soil: "Well draining",
  })),
};

export default {
  title: "Molecules/Table",
  component: Table,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Table>;
