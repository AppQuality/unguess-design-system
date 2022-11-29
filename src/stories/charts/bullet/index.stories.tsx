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
  width: "50%",
  height: "15px",
  ranges: [25, 50, 75, 100],
  values: [62.5],
} as BulletChartProps;

const TemplateWidget: Story<BulletChartProps> = (args) => {
  return (
    <>
      <Paragraph style={{ marginBottom: theme.space.sm }}>
        Completamento Use Case
      </Paragraph>
      <BulletChart
        {...args}
        ranges={[25, 50, 75, 100]}
        values={[20]}
      />
      <Paragraph
        style={{ marginBottom: theme.space.sm, marginTop: 20 }}
      >
        Tempo trascorso
      </Paragraph>
      <BulletChart
        {...args}
        ranges={[25, 50, 75, 100]}
        values={[100]}
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
  title: "Atoms/Charts/Bullet",
  component: BulletChart,
} as ComponentMeta<typeof BulletChart>;
