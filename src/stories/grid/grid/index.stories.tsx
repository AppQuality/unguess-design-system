import { ComponentMeta, Story } from "@storybook/react";
import { Grid } from ".";
import { Row } from "../row";
import { Col } from "../col";
import { Basic as BasicRow, RowStoryArg } from "../row/index.stories";
import { GridArgs } from "./_types";

interface GridProps extends GridArgs {
  rows: Array<RowStoryArg>;
}

const Template: Story<GridProps> = ({ rows, ...args }) => {
  return (
    <Grid {...args}>
      {rows.map((row) => (
        <Row {...row}>
          {row.cols.map((col) => (
            <Col {...col} />
          ))}
        </Row>
      ))}
    </Grid>
  );
};

const defaultArgs = {
  debug: true,
  gutters: "md",
  rows: [{ ...BasicRow.args }, { ...BasicRow.args }, { ...BasicRow.args }],
} as GridProps;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const EqualColumns = Template.bind({});
EqualColumns.args = {
  ...defaultArgs,
  rows: [
    {
      cols: [
        {
          children: "Column 1 of 2",
        },
        {
          children: "Column 2 of 2",
        },
      ],
    },
    {
      cols: [
        {
          children: "Column 1 of 3",
        },
        {
          children: "Column 2 of 3",
        },
        {
          children: "Column 3 of 3",
        },
      ],
    },
  ]
};

export const OneWiderColumn = Template.bind({});
OneWiderColumn.args = {
  ...defaultArgs,
  rows: [
    {
      cols: [
        {
          children: "Column 1 of 3",
          size: 3,
        },
        {
          children: "Column 2 of 3 (wider)",
          size: 6,
        },
        {
          children: "Column 3 of 3",
          size: 3,
        },
      ],
    },
    {
      cols: [
        {
          children: "Column 1 of 3",
        },
        {
          children: "Column 2 of 3",
        },
        {
          children: "Column 3 of 3",
        },
      ],
    },
  ]
};



export default {
  title: "Molecules/Grid",
  component: Grid,
  argTypes: {
    gutters: {
      name: "Grid gutters",
      control: "select",
      options: [false, "xxs", "xs", "sm", "md", "lg", "xl", "xxl"],
    },
    debug: {
      control: "boolean",
    },
    columns: {
      table: {
        disable: true,
      },
    },
    rows: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Grid>;
