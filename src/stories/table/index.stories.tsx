import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import { Table, Head, HeaderRow, HeaderCell, Body, Row, Cell, GroupRow } from ".";
import { TableProps } from "./_types";
import styled from "styled-components";
import { Pagination } from "../pagination";

interface IRow {
  groupName?: string;
  fruit?: string;
  sunExposure?: string;
  soil?: string;
}

interface TableStoryArg extends TableProps {
  columns: Array<string>;
  items: Array<IRow>;
}

const createRow = (item: IRow, index: number, length?: number) => {
  if (item.groupName) {
    return (
      <GroupRow>
        <Cell colSpan={length}>
          <b>{item.groupName}</b>
        </Cell>
      </GroupRow>
    );
  } else {
    return (
      <Row key={index}>
        <Cell>{item.fruit}</Cell>
        <Cell>{item.sunExposure}</Cell>
        <Cell>{item.soil}</Cell>
      </Row>
    );
  }
};
const DefaultTemplate: Story<TableStoryArg> = ({ columns, items, ...args }) => {
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
          {items.map((item, index) => createRow(item, index, columns.length))}
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
  ]
};

const defaultArgs: TableStoryArg = {
  ...tableContent
};
export const Default = DefaultTemplate.bind({});
Default.args = defaultArgs;

/** GROUPED */
const groupedItems = [
  {
    groupName: 'Fruits',
  },
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
    groupName: 'Vegetables',
  },
  {
    fruit: 'Tomatoes',
    sunExposure: 'Partial shade',
    soil: 'Well draining',
  }
];
export const Grouped = DefaultTemplate.bind({});
Grouped.args = {
  ...defaultArgs,
  columns: ['Type', 'Sun exposure', 'Soil'],
  items: groupedItems
};

/** PAGINATION */
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

export default {
  title: "Atoms/Table",
  component: Table,
} as ComponentMeta<typeof Table>;
