import { Meta, StoryFn } from "@storybook/react";
import { SentimentChart } from ".";
import { SentimentChartProps } from "./_types";
import { data } from "./_data";
import { theme } from "../../theme";
import styled from "styled-components";
import { ContainerCard } from "../../cards";
import { LG, MD } from "../../typography/typescale";
import { Grid } from "../../grid/grid";
import { Row } from "../../grid/row";
import { Col } from "../../grid/col";
import { Span } from "../../typography/span";

const Label = styled.p`
  color: ${({ theme }) => theme.palette.blue[600]};
  font-size: ${({ theme }) => theme.fontSizes.md};
  padding: ${({ theme }) => theme.space.sm};
`;

const VerticalLabel = styled(Label)`
  writing-mode: vertical-rl;
  text-align: center;
  margin: auto;
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
  max-width: 270px;
  white-space: normal;
`;

const commonArgs = {
  data: data,
  width: `${data.data.length * 150}px`,
  height: "350px",
  margin: { top: 50, right: 0, bottom: 50, left: 0 },
  i18n: {
    sentimentsValues: {
      veryNegative: "Molto Negativo",
      negative: "Negativo",
      neutral: "Neutrale",
      positive: "Positivo",
      veryPositive: "Molto Positivo",
    },
  },
};

const Template: StoryFn<SentimentChartProps> = (args) => (
  <>
    <ContainerCard style={{ padding: theme.space.md }}>
      <LG isBold>Sentiment Chart</LG>
      <br />
      <p>
        This is the sentiment chart. It is a wrapper around the{" "}
        <a href="https://nivo.rocks/line/">Nivo Line Chart</a> component.
      </p>
      <p>
        The Nivo Line Chart is a wrapper around the{" "}
        <a href="https://d3js.org/">D3</a> library.
      </p>
      <br />
      <Grid>
        <Row>
          <Col
            xs="1"
            style={{ display: "flex", alignItems: "center", margin: 0 }}
          >
            <VerticalLabel>Vertical Label</VerticalLabel>
          </Col>
          <Col xs="11" style={{ margin: 0 }}>
            <SentimentChart {...args} />
          </Col>
        </Row>
        <Row>
          <Col xs="1" style={{ margin: 0 }}></Col>
          <Col xs="11" style={{ margin: 0 }}>
            <div
              style={{
                width: data.data.length * 150,
                maxWidth: "100%",
                marginTop: theme.space.md,
              }}
            >
              <HorizontalLabel>Horizontal Label</HorizontalLabel>
            </div>
          </Col>
        </Row>
      </Grid>
    </ContainerCard>
  </>
);

export const Default = Template.bind({});
Default.args = commonArgs;

export const WithCustomTooltip = Template.bind({});
WithCustomTooltip.args = {
  ...commonArgs,
  tooltip: (node) => {
    const { data, label: cluster } = node;

    return (
      <Tooltip>
        <div style={{ display: "flex", alignItems: "center" }}>
          {data?.icon}
          <Span
            isBold
            style={{
              marginLeft: theme.space.xs,
              color: theme.palette.grey[600],
            }}
          >
            {cluster}
          </Span>
        </div>
        {data?.customData && (
          <MD style={{ marginTop: theme.space.xs }}>{data?.customData}</MD>
        )}
      </Tooltip>
    );
  },
};

export default {
  title: "Atoms/Charts/Sentiment",
  component: SentimentChart,
} as Meta<typeof SentimentChart>;
