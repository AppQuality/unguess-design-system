import { ComponentMeta, Story } from "@storybook/react";
import { BarChart } from ".";
import { BarChartProps } from "./_types";
import { MD } from "../../typography/typescale";
import { data, keys } from "./_data";
import styled from "styled-components";

const Tooltip = styled.div`
  padding: ${({ theme }) => theme.space.base * 3}px;
  background: ${({ theme }) => theme.palette.white};
  box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  max-width: 216px;
`;

const TemplateBar: Story<BarChartProps> = () => (
  <BarChart
    width="430px"
    height="260px"
    data={data}
    keys={keys}
    indexBy="bugType"
    axisBottom={{ legend: "Bugs (Tot: 82)", offset: 50 }}
    axisLeft={{ legend: "Typology", offset: -140 }}
    tooltip={({ id, value, indexValue }) => (
      <Tooltip>
        <MD>{indexValue} - {id}: <MD tag='span' isBold>{value}</MD></MD>
      </Tooltip>
    )}
    margin={{ top: 0, right: 8, bottom: 60, left: 145 }} />
);
export const Default = TemplateBar.bind({});

export default {
  title: "Atoms/Charts/Bar",
  component: BarChart,
} as ComponentMeta<typeof BarChart>;
