import { ComponentMeta, Story } from "@storybook/react";
import { LineChart } from ".";
import { LineChartProps } from "./_types";
import { data } from "./_data";
import { theme } from "../../theme";
import styled from "styled-components";
import { ContainerCard } from "../../cards";
import { DatumValue } from "@nivo/core";
import { ReactComponent as S0 } from "./assets/sentiment_0.svg";
import { ReactComponent as S1 } from "./assets/sentiment_1.svg";
import { ReactComponent as S2 } from "./assets/sentiment_2.svg";
import { ReactComponent as S3 } from "./assets/sentiment_3.svg";
import { ReactComponent as S4 } from "./assets/sentiment_4.svg";
import { Span } from "../../typography/span";
import { Paragraph } from "../../typography/paragraph";
import { SM } from "../../typography/typescale";

const Container = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.space.xxl};
`;

const Label = styled.p`
  color: ${({ theme }) => theme.palette.blue[600]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.space.md};
`;

const VerticalLabel = styled(Label)`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(0, -50%) rotate(-90deg);
  transform-origin: 0 0;
  z-index: 2;
`;

const HorizontalLabel = styled(Label)`
  text-align: center;
`;

const Tooltip = styled.div`
  background-color: white;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  padding: ${({ theme }) => theme.space.sm};
  box-shadow: ${theme.shadows.boxShadow(theme)};
  max-width: 200px;
  overflow: hidden;
  break-word: break-all;
  white-space: no-wrap;
`;

const formatPoint = (value: DatumValue) => {
  switch (value as number) {
    case 1:
      return <S0 />;
    case 2:
      return <S1 />;
    case 3:
      return <S2 />;
    case 4:
      return <S3 />;
    case 5:
      return <S4 />;
    default:
      return "";
  }
};

const Template: Story<LineChartProps> = (args) => (
  <>
    <h1>Line Chart</h1>
    <p>
      This is a line chart. It is a wrapper around the{" "}
      <a href="https://nivo.rocks/line/">Nivo Line Chart</a> component.
    </p>
    <p>
      The Nivo Line Chart is a wrapper around the{" "}
      <a href="">D3 Line Chart</a> component.
    </p>
    <LineChart
      width="100%"
      height="400px"
      margin={{ top: 0, right: 0, bottom: 25, left: 0 }}
      colors={[theme.palette.grey[600]]}
      isScrollable
      {...args}
    />
  </>
);

const TemplateScrollable: Story<LineChartProps> = (args) => (
  <>
    <ContainerCard style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Container>
        <VerticalLabel>Vertical Label</VerticalLabel>
        <LineChart
          width={`${data.data.length * 150}px`}
          height="300px"
          margin={{ top: 0, right: 0, bottom: 50, left: 25 }}
          colors={[theme.palette.grey[600]]}
          isScrollable
          {...args}
        />
        <HorizontalLabel>Horizontal Label</HorizontalLabel>
      </Container>
    </ContainerCard>
  </>
);

export const Default = Template.bind({});
Default.args = {
  data: data,
};

export const WithCustomTooltip = Template.bind({});
WithCustomTooltip.args = {
  data: data,
  tooltip: (node) => {
    const { data, label: useCase, value: sentimentText } = node;
    const sentimentValue = parseInt(data?.yFormatted as string);

    return (
      <Tooltip>
        <div style={{ display: "flex", alignItems: "center" }}>
          {formatPoint(sentimentValue)}<SM style={{ marginLeft: theme.space.xs }}>{sentimentText}</SM>
        </div>
        <br />
        <Span isBold>{useCase}</Span>
        {data?.customData && (
          <SM>
            <br />
            {data?.customData}
          </SM>
        )}
      </Tooltip>
    )
  }
};

export const Scrollable = TemplateScrollable.bind({});
Scrollable.args = {
  data: data,
};

export default {
  title: "Atoms/Charts/Sentiment",
  component: LineChart,
} as ComponentMeta<typeof LineChart>;