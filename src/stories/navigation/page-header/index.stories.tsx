import { ComponentMeta, Story } from "@storybook/react";
import { PageHeaderMainProps } from "./_types";
import { PageHeader } from ".";
import { Anchor } from "../../buttons/anchor";
import { Counter } from "../../counter";
import { Button } from "../../buttons/button";
import React, { useState } from "react";
import { theme } from "../../theme";
import styled from "styled-components";
import { Paragraph } from "../../typography/paragraph";
import { InputToggle } from "../../forms/input-toggle";

const FakeBody = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const HeaderContainer = styled.div`
  background-color: white;
  width: 100%;
`;

const StyledInputToggle = styled(InputToggle)`
  padding: 0;
  margin: 0;
`;

interface PageHeaderStoryProps {
  pageHeaderArgs: {
    buttons: Array<React.ReactNode>;
  };
  pageHeaderMainArgs: PageHeaderMainProps;
}

const Template: Story<PageHeaderStoryProps> = (args) => {
  const { pageHeaderMainArgs } = args;

  return (
    <FakeBody>
      <HeaderContainer>
        <PageHeader>
          <PageHeader.Breadcrumb>
            <Anchor href="#">Home</Anchor>
            <Anchor href="#">Page</Anchor>
          </PageHeader.Breadcrumb>
          <PageHeader.Main {...pageHeaderMainArgs}>
            {pageHeaderMainArgs.infoOverline && (
              <PageHeader.Overline>
                {pageHeaderMainArgs.infoOverline}
              </PageHeader.Overline>
            )}
            {pageHeaderMainArgs.infoTitle && (
              <PageHeader.Title>
                {pageHeaderMainArgs.infoTitle}
              </PageHeader.Title>
            )}
            {pageHeaderMainArgs.infoDescription && (
              <PageHeader.Description>
                {pageHeaderMainArgs.infoDescription}
              </PageHeader.Description>
            )}
            {pageHeaderMainArgs.infoCounters && (
              <PageHeader.Counters>
                {pageHeaderMainArgs.infoCounters}
              </PageHeader.Counters>
            )}
          </PageHeader.Main>
          <PageHeader.Buttons>
            <>{args.pageHeaderArgs.buttons.map((button) => button)}</>
          </PageHeader.Buttons>
        </PageHeader>
      </HeaderContainer>
      <Paragraph style={{ padding: `${theme.space.md} 0` }}>
        This is a long paragraph, please ignore the style. It's not the object
        of this story, and it's useful to non-design purposes. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Donec eu nunc eget nisi egestas
        pretium. Nulla facilisi. Donec eu nunc eget nisi egestas pretium. Nulla
        facilisi.
      </Paragraph>
    </FakeBody>
  );
};

const TemplateEditable: Story<PageHeaderStoryProps> = (args) => {
  const { pageHeaderMainArgs } = args;
  const [inputValue, setInputValue] = useState<string>(
    (pageHeaderMainArgs.title as string) || ""
  );

  return (
    <FakeBody>
      <HeaderContainer>
      <PageHeader>
        <PageHeader.Breadcrumb>
          <Anchor href="#">Home</Anchor>
          <Anchor href="#">Page</Anchor>
        </PageHeader.Breadcrumb>
        <PageHeader.Main {...pageHeaderMainArgs}>
          {pageHeaderMainArgs.infoOverline && (
            <PageHeader.Overline>
              {pageHeaderMainArgs.infoOverline}
            </PageHeader.Overline>
          )}
          {pageHeaderMainArgs.infoTitle && (
            <PageHeader.Title>
              <StyledInputToggle>
                <StyledInputToggle.Item
                  textSize={"xxxl"}
                  maxLength={64}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.currentTarget.value)}
                  style={{ paddingLeft: 0 }}
                />
              </StyledInputToggle>
            </PageHeader.Title>
          )}
          {pageHeaderMainArgs.infoDescription && (
            <PageHeader.Description>
              {pageHeaderMainArgs.infoDescription}
            </PageHeader.Description>
          )}
          {pageHeaderMainArgs.infoCounters && (
            <PageHeader.Counters>
              {pageHeaderMainArgs.infoCounters}
            </PageHeader.Counters>
          )}
        </PageHeader.Main>
        <PageHeader.Buttons>
          <>{args.pageHeaderArgs.buttons.map((button) => button)}</>
        </PageHeader.Buttons>
      </PageHeader>
      </HeaderContainer>
      <Paragraph style={{ padding: `${theme.space.md} 0` }}>
        This is a long paragraph, please ignore the style. It's not the object
        of this story, and it's useful to non-design purposes. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit. Donec eu nunc eget nisi egestas
        pretium. Nulla facilisi. Donec eu nunc eget nisi egestas pretium. Nulla
        facilisi.
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
    metaImage: "https://s3.eu-west-1.amazonaws.com/appq.static/nature.jpg",
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const Editable = TemplateEditable.bind({});
Editable.args = defaultArgs;

export default {
  title: "Molecules/PageHeader",
  component: PageHeader,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof PageHeader>;
