import { Meta, StoryFn } from "@storybook/react";
import { Accordion, AccordionArgs } from ".";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { ReactComponent as IconMeta } from "@zendeskgarden/svg-icons/src/16/menu-stroke.svg";
import { SM } from "../typography/typescale";
import { Tag } from "../tags";
import {
  StatusCompletedIcon,
  StatusRunningIcon,
  CampaignFunctionalIcon,
} from "../icons";
import { theme } from "../theme";

interface AccordionStoryArg extends AccordionArgs {
  items: Array<{
    headerTitle: string;
    content: string;
    meta: JSX.Element;
  }>;
}

const Template: StoryFn<AccordionStoryArg> = ({ items, ...args }) => {
  return (
    <Row justifyContent="center">
      <Col sm={10}>
        <Accordion {...args}>
          {items.map((item) => (
            <Accordion.Section>
              <Accordion.Header>
                <Accordion.Label label={item.headerTitle}>
                  {item.meta}
                </Accordion.Label>
              </Accordion.Header>
              <Accordion.Panel>{item.content}</Accordion.Panel>
            </Accordion.Section>
          ))}
        </Accordion>
      </Col>
    </Row>
  );
};

const accordionContent = `Lorem ipsum dolor sit amet,
                          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                          sunt in culpa qui officia deserunt mollit anim id est laborum
                          dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
 `;


const defaultArgs: AccordionStoryArg = {
  isBare: false,
  isExpandable: false,
  isAnimated: true,
  items: [
    {
      headerTitle: "(1) Lorem ipsum dolor sit amet",
      content: accordionContent,
      meta: <div style={{ display: 'flex' }}>
        <span><IconMeta />{' '}</span>
        <span><SM>Meta</SM>{' '}</span>
        <span><IconMeta />{' '}</span>
        <span><SM>Meta 2</SM></span>
      </div>
    },
    {
      headerTitle: "(2) Lorem ipsum dolor sit amet",
      content: accordionContent,
      meta: <div style={{ display: 'flex' }}>
        <span><IconMeta />{' '}</span>
        <span><SM>Meta</SM>{' '}</span>
      </div>
    },
    {
      headerTitle: "(3) Lorem ipsum dolor sit amet",
      content: accordionContent,
      meta: <div style={{ display: 'flex' }}>
        <Tag size="large" color={theme.palette.green[800]} hue="rgba(0,0,0,0)">
          <Tag.Avatar>
            <StatusCompletedIcon />
          </Tag.Avatar>
          Completed
          <Tag.SecondaryText color={theme.palette.grey[700]}>
            1
          </Tag.SecondaryText>
        </Tag>
        <Tag size="large" color={theme.palette.yellow[700]} hue="rgba(0,0,0,0)">
          <Tag.Avatar>
            <StatusRunningIcon />
          </Tag.Avatar>
          In progress
          <Tag.SecondaryText color={theme.palette.grey[700]}>
            1
          </Tag.SecondaryText>
        </Tag>
        <Tag size="large" hue="rgba(0,0,0,0)">
          <Tag.Avatar>
            <CampaignFunctionalIcon />
          </Tag.Avatar>
          Functional
          <Tag.SecondaryText color={theme.palette.grey[700]}>
            1
          </Tag.SecondaryText>
        </Tag>
      </div>
    },
  ],
  level: 4,
};

export const Default = Template.bind({});
Default.args = defaultArgs;
Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=245%3A80",
  },
};

export const Bare = Template.bind({});
Bare.args = {
  ...defaultArgs,
  isBare: true,
};

Bare.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=245%3A86",
  },
};

export const Expandable = Template.bind({});
Expandable.args = {
  ...defaultArgs,
  isExpandable: true,
};

export const Compact = Template.bind({});
Compact.args = {
  ...defaultArgs,
  isCompact: true,
};

Compact.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=1510%3A3230",
  },
};

export default {
  title: "Molecules/Accordion-new",
  component: Accordion,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Accordion>;
