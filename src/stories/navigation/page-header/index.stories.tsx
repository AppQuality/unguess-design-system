import { ComponentMeta, Story } from "@storybook/react";
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
import { CampaignFunctionalIcon, StatusCompletedIcon, StatusRunningIcon } from "../../icons";

const FakeBody = styled.div`
  background-color: ${({ theme }) => theme.palette.grey[100]};
`;

const HeaderContainer = styled.div`
  background-color: white;
  width: 100%;
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
              <PageHeader.Meta>
                {pageHeaderMainArgs.mainMeta}
              </PageHeader.Meta>
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

const TemplateEditable: Story<PageHeaderStoryProps> = (args) => {
  const { pageHeaderMainArgs } = args;
  const [inputValue, setInputValue] = useState<string>(
    (pageHeaderMainArgs.title as string) || ""
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
            <PageHeader.Meta>
              {pageHeaderMainArgs.mainMeta}
            </PageHeader.Meta>
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
    mainTitle: "Title H1",
    mainOverline: "OVERLINE",
    mainDescription: "Description",
    mainMeta: (
      <>
        <Tag
          size="large"
          color={theme.palette.green[800]}
          hue="rgba(0,0,0,0)"
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
    mainImageUrl: "https://s3.eu-west-1.amazonaws.com/appq.static/nature.jpg",
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
  argTypes:
    {
      pageHeaderArgs: {
        table: {
          disable: true
        }
      },
      pageHeaderMainArgs: {
        table: {
          disable: true
        }
      },
    }
} as ComponentMeta<typeof PageHeader>;
