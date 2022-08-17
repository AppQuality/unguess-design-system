import { ComponentMeta, Story } from "@storybook/react";
import { PageHeaderMainProps } from "./_types";
import { PageHeader } from ".";
import { Anchor } from "../../buttons/anchor";
import { Counter } from "../../counter";
import { Button } from "../../buttons/button";
import React from "react";
import { theme } from "../../theme";
import styled from "styled-components";
import { Paragraph } from "../../typography/paragraph";

const FakeBody = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

interface PageHeaderStoryProps {
  pageHeaderArgs: {
    buttons: Array<React.ReactNode>;
  };
  pageHeaderMainArgs: PageHeaderMainProps;
}

const Template: Story<PageHeaderStoryProps> = (args) => {
  return (
    <FakeBody>
      <PageHeader>
        <PageHeader.Breadcrumb>
          <Anchor href="#">Home</Anchor>
          <Anchor href="#">Page</Anchor>
        </PageHeader.Breadcrumb>
        <PageHeader.Main {...args.pageHeaderMainArgs} />
        <PageHeader.Buttons>
          <>{args.pageHeaderArgs.buttons.map((button) => button)}</>
        </PageHeader.Buttons>
      </PageHeader>
      <Paragraph style={{marginTop: "24px"}}>
        This is a long paragraph, please ignore the style. It's not the object of this story, and it's useful to non-design purposes.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu nunc eget nisi egestas pretium. Nulla facilisi. 
        Donec eu nunc eget nisi egestas pretium. Nulla facilisi. 
      </Paragraph>
    </FakeBody>
  );
};

const defaultArgs: PageHeaderStoryProps = {
  pageHeaderArgs: {
    buttons: [
      <Button
        isPill
        size="large"
        isPrimary
        themeColor={theme.colors.accentHue}
        style={{ marginRight: theme.space.xs }}
      >
        Button
      </Button>,
      <Button isPill size="large">
        Please dress ignore me
      </Button>,
    ],
  },
  pageHeaderMainArgs: {
    infoTitle: "Title H1",
    infoOverline: "OVERLINE",
    infoDescription: "Description",
    infoCounters: (
      <>
        <Counter status="completed" counter={1}>
          Completed
        </Counter>
        <Counter status="progress" counter={2}>
          In Progress
        </Counter>
        <Counter status="functional" counter={3}>
          Functional
        </Counter>
      </>
    ),
    metaImage: "https://placeimg.com/600/400/nature",
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
