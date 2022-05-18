import { ComponentMeta, Story } from "@storybook/react";
import { Timeline } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { TimelineArgs } from "./_types";
import { Span } from "../typography/span";
import { Paragraph } from "../typography/paragraph";

import { ReactComponent as CheckBadgeIcon } from "../../assets/icons/check-badge-stroke.svg";
import { ReactComponent as ClipboardIcon } from "../../assets/icons/clipboard-list-stroke.svg";
import { ReactComponent as FlagIcon } from "../../assets/icons/flag-stroke.svg";
import { ReactComponent as LightningIcon } from "../../assets/icons/lightning-bolt-stroke.svg";
import { ReactComponent as LocationIcon } from "../../assets/icons/location-stroke.svg";
import { ReactComponent as UserGroupIcon } from "../../assets/icons/user-group-stroke.svg";

interface TimelineItemArgs {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface TimelineStoryProps extends TimelineArgs {
  items: TimelineItemArgs[];
}

const defaultArgs: TimelineStoryProps = {
  isAlternate: false,
  hiddenLine: false,
  items: [
    { icon: <FlagIcon />, title: "Cosa testiamo e perché?", description: "Individuiamo l'obiettivo del test e il prodotto da testare" },
    { icon: <LocationIcon />, title: "Dove lo testiamo?", description: "Scegliamo Dispositivi e touchpoint" },
    { icon: <UserGroupIcon />, title: "Con chi lo testiamo?", description: "Individuiamo i criteri di selezione dei tester" },
    { icon: <ClipboardIcon />, title: "Come lo testiamo?", description: "Definiamo fino a 7 test case" },
    { icon: <LightningIcon />, title: "Recap e Lancio", description: "Controlliamo tutto e lanciamo la campagna!" },
    { icon: <CheckBadgeIcon />, title: "Ricezione dei risultati in real time", description: "Ti inviamo i bug caricati dai tester in real time" },
  ]
};

const Template: Story<TimelineStoryProps> = ({ items, ...args }) => {
  return (
    <Row>
      <Col sm="auto">
        <Timeline {...args}>
          {items.map((item, index) => (
            <Timeline.Item key={index} hiddenLine={args.hiddenLine} {...item}>
              <Timeline.Content>
                <Paragraph style={{fontWeight: 500}}>{item.title}</Paragraph>
                {item.description && <Span hue="grey">{item.description}</Span>}
              </Timeline.Content>
            </Timeline.Item>
          ))}
        </Timeline>
      </Col>
    </Row>
  );
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const InvisibleLine = Template.bind({});
InvisibleLine.args = { ...defaultArgs, hiddenLine: true };

export const Alternate = Template.bind({});
Alternate.args = { ...defaultArgs, isAlternate: true };

export default {
  title: "Molecules/Timeline",
  component: Timeline,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  // argTypes: {
  //   hue: {
  //     options: ['primary', 'secondary'],
  //     control: { type: 'radio' },
  //   },
  // },
} as ComponentMeta<typeof Timeline>;
