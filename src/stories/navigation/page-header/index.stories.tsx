import { ComponentMeta, Story } from "@storybook/react";
import { PageHeaderMainProps, PageHeaderProps } from "./_types";
import { PageHeader } from ".";
import { Anchor } from "../../buttons/anchor";
import { Counter } from "../../counter";
import { Button } from "../../buttons/button";

interface PageHeaderStoryProps {
  pageHeaderArgs: PageHeaderProps;
  pageHeaderMainArgs: PageHeaderMainProps;
}

const Template: Story<PageHeaderStoryProps> = (args) => {
  return (
    <PageHeader>
      <PageHeader.Breadcrumb>
        <Anchor href="#">Home</Anchor>
        <Anchor href="#">Page</Anchor>
      </PageHeader.Breadcrumb>
      <PageHeader.Main {...args.pageHeaderMainArgs} />
      <PageHeader.Button isPill isPrimary>
        Book a call
      </PageHeader.Button>
    </PageHeader>
  );
};

const defaultArgs: PageHeaderStoryProps = {
  pageHeaderArgs: {
    buttons: [
      <Button isPill size="large">Book a call</Button>
    ]
  },
  pageHeaderMainArgs: {
    infoTitle: "Title H1",
    infoOverline: "OVERLINE",
    infoDescription: "Description",
    infoCounters: [
      <Counter status="completed" counter={1}>Completed</Counter>,
      <Counter status="progress" counter={2}>In Progress</Counter>,
      <Counter status="functional" counter={3}>Functional</Counter>,
    ],
    metaImage: "https://via.placeholder.com/600x400.png",
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Molecules/PageHeader",
  component: PageHeader,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof PageHeader>;
