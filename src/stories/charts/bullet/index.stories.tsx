import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";
import { BulletChart } from ".";
import { BulletChartProps } from "./_types";
import { Paragraph } from "@zendeskgarden/react-notifications";

const TemplateBullet: Story<BulletChartProps> = (args) => (
  <BulletChart {...args} />
);
export const Default = TemplateBullet.bind({});
Default.args = {
  width: "180px",
  height: "15px",
  data: [
    {
      ranges: [25, 50, 75, 100],
      measures: [74],
      markers: [74],
    },
  ],
} as BulletChartProps;

const TemplateWidget: Story<BulletChartProps> = (args) => {
  return (
    <>
      <Paragraph style={{ marginBottom: theme.space.sm, paddingLeft: 10 }}>
        Completamento Use Case
      </Paragraph>
      <BulletChart
        {...args}
        data={[{ ranges: [25, 50, 75, 100], measures: [0], markers: [0] }]}
      />
      <Paragraph
        style={{ marginBottom: theme.space.sm, paddingLeft: 10, marginTop: 20 }}
      >
        Tempo trascorso
      </Paragraph>
      <BulletChart
        {...args}
        data={[{ ranges: [25, 50, 75], measures: [30], markers: [30] }]}
      />
    </>
  );
};
export const Widget = TemplateWidget.bind({});
Widget.args = {
  width: "180px",
  height: "15px",
} as BulletChartProps;

export default {
  title: "Charts/Bullet",
  component: BulletChart,
  argTypes: {
    theme: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof BulletChart>;
