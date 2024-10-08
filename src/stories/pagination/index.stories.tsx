import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { useEffect, useState } from "react";
import { CursorPagination as CP, Pagination } from ".";
import { PaginationProps } from "./_types";

const CursorTemplate: Story<PaginationProps> = () => {
  const [cursor, setCursor] = useState(0);

  const pages = [0, 1, 2, 3, 4];

  const onFirst = () => setCursor(0);

  const onLast = () => setCursor(pages.length - 1);

  const onNext = () => {
    if (cursor < pages.length - 1) {
      setCursor(cursor + 1);
    }
  };

  const onPrevious = () => {
    if (cursor > 0) {
      setCursor(cursor - 1);
    }
  };

  return (
    <CP aria-label="Cursor pagination">
      <CP.First onClick={onFirst} disabled={cursor === 0}>
        First
      </CP.First>
      <CP.Previous onClick={onPrevious} disabled={cursor === 0}>
        Previous
      </CP.Previous>
      <CP.Next onClick={onNext} disabled={cursor === pages.length - 1}>
        Next
      </CP.Next>
      <CP.Last onClick={onLast} disabled={cursor === pages.length - 1}>
        Last
      </CP.Last>
    </CP>
  );
};

const defaultArgs: PaginationProps = {
  currentPage: 1,
  totalPages: 7,
};
export const CursorPagination = CursorTemplate.bind({});
CursorPagination.args = defaultArgs;

const PaginationTemplate: Story<PaginationProps> = ({ ...args }) => {
  const [page, setPage] = useState(args.currentPage);
  const [totalPages, setTotalPages] = useState(args.totalPages);

  useEffect(() => {
    setPage(args.currentPage);
  }, [args.currentPage]);

  useEffect(() => {
    setTotalPages(args.totalPages);
  }, [args.totalPages]);

  return (
    <Pagination
      totalPages={totalPages}
      pagePadding={args.pagePadding}
      pageGap={args.pageGap}
      currentPage={page}
      onChange={setPage}
    />
  );
};
export const NumberedPagination = PaginationTemplate.bind({});
NumberedPagination.args = {
  ...defaultArgs,
  pagePadding: 3,
  pageGap: 1,
};

export default {
  title: "Atoms/Pagination",
  component: Pagination,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Pagination>;
