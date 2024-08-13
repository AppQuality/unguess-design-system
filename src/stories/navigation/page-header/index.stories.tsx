import { Meta, StoryFn } from "@storybook/react";
import { PageHeaderMainProps } from "./_types";
import { PageHeader } from ".";
import { Anchor } from "../../buttons/anchor";
import { Button } from "../../buttons/button";
import React, { useState } from "react";
import { theme } from "../../theme";
import styled from "styled-components";
import { Paragraph } from "../../typography/paragraph";
import { InputToggle } from "../../forms/input-toggle";
import { Tag } from "../../tags";
import {
  CampaignFunctionalIcon,
  StatusCompletedIcon,
  StatusRunningIcon,
} from "../../icons";

const FakeBody = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const HeaderContainer = styled.div`
  background-color: white;
  width: 100%;
`;

const StyledMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  margin-top: ${({ theme }) => theme.space.xxs};
`;

interface PageHeaderStoryProps {
  pageHeaderArgs: {
    buttons: Array<React.ReactNode>;
  };
  pageHeaderMainArgs: PageHeaderMainProps;
}

const CompleteHeaderTemplate: StoryFn<PageHeaderStoryProps> = (args) => {
  const { pageHeaderMainArgs } = args;

  return (
    <FakeBody>
      <HeaderContainer>
        <PageHeader>
          <PageHeader.Breadcrumbs>
            <Anchor href="#">Home</Anchor>
            <Anchor href="#">Page</Anchor>
          </PageHeader.Breadcrumbs>
          <PageHeader.Main {...pageHeaderMainArgs}>
            {pageHeaderMainArgs.mainOverline && (
              <PageHeader.Overline>
                {pageHeaderMainArgs.mainOverline}
              </PageHeader.Overline>
            )}
            {pageHeaderMainArgs.mainTitle && (
              <PageHeader.Title>
                {pageHeaderMainArgs.mainTitle}
              </PageHeader.Title>
            )}
            {pageHeaderMainArgs.mainDescription && (
              <PageHeader.Description>
                {pageHeaderMainArgs.mainDescription}
              </PageHeader.Description>
            )}
            {pageHeaderMainArgs.mainMeta && (
              <PageHeader.Meta>{pageHeaderMainArgs.mainMeta}</PageHeader.Meta>
            )}
          </PageHeader.Main>
          <PageHeader.Footer>
            <>{args.pageHeaderArgs.buttons.map((button) => button)}</>
          </PageHeader.Footer>
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

const CompleteHeaderEditableTemplate: StoryFn<PageHeaderStoryProps> = (args) => {
  const { pageHeaderMainArgs } = args;
  const [inputValue, setInputValue] = useState<string>(
    (pageHeaderMainArgs.title as string) || "",
  );

  return (
    <FakeBody>
      <HeaderContainer>
        <PageHeader>
          <PageHeader.Breadcrumbs>
            <Anchor href="#">Home</Anchor>
            <Anchor href="#">Page</Anchor>
          </PageHeader.Breadcrumbs>
          <PageHeader.Main {...pageHeaderMainArgs}>
            {pageHeaderMainArgs.mainOverline && (
              <PageHeader.Overline>
                {pageHeaderMainArgs.mainOverline}
              </PageHeader.Overline>
            )}
            {pageHeaderMainArgs.mainTitle && (
              <PageHeader.Title>
                <InputToggle>
                  <InputToggle.Item
                    textSize={"xxxl"}
                    maxLength={64}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    style={{ paddingLeft: 0 }}
                  />
                </InputToggle>
              </PageHeader.Title>
            )}
            {pageHeaderMainArgs.mainDescription && (
              <PageHeader.Description>
                {pageHeaderMainArgs.mainDescription}
              </PageHeader.Description>
            )}
            {pageHeaderMainArgs.mainMeta && (
              <PageHeader.Meta>{pageHeaderMainArgs.mainMeta}</PageHeader.Meta>
            )}
          </PageHeader.Main>
          <PageHeader.Footer>
            <>{args.pageHeaderArgs.buttons.map((button) => button)}</>
          </PageHeader.Footer>
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

const FirstLevelTemplate: StoryFn<PageHeaderStoryProps> = (args) => {
  const { pageHeaderMainArgs } = args;

  return (
    <FakeBody>
      <HeaderContainer>
        <PageHeader>
          <PageHeader.Main {...pageHeaderMainArgs}>
            {pageHeaderMainArgs.mainTitle && (
              <PageHeader.Title>
                {pageHeaderMainArgs.mainTitle}
              </PageHeader.Title>
            )}
            {pageHeaderMainArgs.mainMeta && (
              <PageHeader.Meta>
                <StyledMeta>{pageHeaderMainArgs.mainMeta}</StyledMeta>
              </PageHeader.Meta>
            )}
          </PageHeader.Main>
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

const SecondThirdLevelTemplate: StoryFn<PageHeaderStoryProps> = (args) => {
  const { pageHeaderMainArgs } = args;

  return (
    <FakeBody>
      <HeaderContainer>
        <PageHeader>
          <PageHeader.Breadcrumbs>
            <Anchor href="#">Home</Anchor>
            <Anchor href="#">Page</Anchor>
          </PageHeader.Breadcrumbs>
          <PageHeader.Main {...pageHeaderMainArgs}>
            {pageHeaderMainArgs.mainTitle && (
              <PageHeader.Title>
                {pageHeaderMainArgs.mainTitle}
              </PageHeader.Title>
            )}
            {pageHeaderMainArgs.mainMeta && (
              <PageHeader.Meta>{pageHeaderMainArgs.mainMeta}</PageHeader.Meta>
            )}
          </PageHeader.Main>
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

const completeArgs: PageHeaderStoryProps = {
  pageHeaderArgs: {
    buttons: [
      <Button
        size="large"
        isPrimary
        isAccent
        style={{ marginRight: theme.space.xs }}
      >
        Button
      </Button>,
      <Button size="large">Please dress ignore me</Button>,
    ],
  },
  pageHeaderMainArgs: {
    mainTitle: "Title H1",
    mainOverline: "OVERLINE",
    mainDescription: "Description",
    mainMeta: (
      <>
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
      </>
    ),
    mainImageUrl: "https://s3.eu-west-1.amazonaws.com/appq.static/nature.jpg",
  },
};

const firstLevelArgs: PageHeaderStoryProps = {
  pageHeaderArgs: {
    buttons: [],
  },
  pageHeaderMainArgs: {
    mainTitle: "Title H1",
    mainMeta: (
      <>
        <Tag
          size="large"
          color={theme.palette.green[800]}
          hue="rgba(0,0,0,0)"
          style={{ marginBottom: theme.space.xxs }}
        >
          <Tag.Avatar>
            <StatusCompletedIcon />
          </Tag.Avatar>
          Completed
          <Tag.SecondaryText color={theme.palette.grey[700]}>
            1
          </Tag.SecondaryText>
        </Tag>
        <Tag
          size="large"
          color={theme.palette.yellow[700]}
          hue="rgba(0,0,0,0)"
          style={{ marginBottom: theme.space.xxs }}
        >
          <Tag.Avatar>
            <StatusRunningIcon />
          </Tag.Avatar>
          In progress
          <Tag.SecondaryText color={theme.palette.grey[700]}>
            1
          </Tag.SecondaryText>
        </Tag>
        <Tag
          size="large"
          hue="rgba(0,0,0,0)"
          style={{ marginBottom: theme.space.xxs }}
        >
          <Tag.Avatar>
            <CampaignFunctionalIcon />
          </Tag.Avatar>
          Functional
          <Tag.SecondaryText color={theme.palette.grey[700]}>
            1
          </Tag.SecondaryText>
        </Tag>
      </>
    ),
  },
};

const SecondThirdLevelArgs: PageHeaderStoryProps = {
  pageHeaderArgs: {
    buttons: [],
  },
  pageHeaderMainArgs: {
    mainTitle: "Title H1",
    mainMeta: (
      <StyledMeta>
        <>
          <Tag
            size="large"
            color={theme.palette.green[800]}
            hue="rgba(0,0,0,0)"
            style={{ marginBottom: theme.space.xxs }}
          >
            <Tag.Avatar>
              <StatusCompletedIcon />
            </Tag.Avatar>
            Completed
            <Tag.SecondaryText color={theme.palette.grey[700]}>
              1
            </Tag.SecondaryText>
          </Tag>
          <Tag
            size="large"
            color={theme.palette.yellow[700]}
            hue="rgba(0,0,0,0)"
            style={{ marginBottom: theme.space.xxs }}
          >
            <Tag.Avatar>
              <StatusRunningIcon />
            </Tag.Avatar>
            In progress
            <Tag.SecondaryText color={theme.palette.grey[700]}>
              1
            </Tag.SecondaryText>
          </Tag>
          <Tag
            size="large"
            hue="rgba(0,0,0,0)"
            style={{ marginBottom: theme.space.xxs }}
          >
            <Tag.Avatar>
              <CampaignFunctionalIcon />
            </Tag.Avatar>
            Functional
            <Tag.SecondaryText color={theme.palette.grey[700]}>
              1
            </Tag.SecondaryText>
          </Tag>
        </>
        <div style={{ marginLeft: "auto" }}>
          <Button size="large" style={{ marginRight: theme.space.xs }}>
            Button 1
          </Button>
          <Button size="large">Button 2</Button>
        </div>
      </StyledMeta>
    ),
  },
};

export const Complete = CompleteHeaderTemplate.bind({});
Complete.args = completeArgs;

export const CompleteEditable = CompleteHeaderEditableTemplate.bind({});
CompleteEditable.args = completeArgs;

export const FirstLevel = FirstLevelTemplate.bind({});
FirstLevel.args = firstLevelArgs;

export const SecondThirdLevel = SecondThirdLevelTemplate.bind({});
SecondThirdLevel.args = SecondThirdLevelArgs;

export default {
  title: "Molecules/PageHeader",
  component: PageHeader,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  argTypes: {
    pageHeaderArgs: {
      table: {
        disable: true,
      },
    },
    pageHeaderMainArgs: {
      table: {
        disable: true,
      },
    },
  },
} as Meta<typeof PageHeader>;
