import { Chrome } from "../navigation/chrome";
import { theme } from "../theme";
import { Sidebar } from "../navigation/sidebar";

import { SidebarArgs } from "../navigation/sidebar/_types";
import { Body } from "../navigation/body";
import { Content } from "../navigation/content";
import { Main } from "../navigation/main";
import { AppHeader } from "../navigation/app-header";
import { AppHeaderArgs } from "../navigation/app-header/_types";
import { useState } from "react";
import { ProfileModal } from "../profile-modal";
import { UserMenuArgs } from "../profile-modal/_types";
import { PageLoader } from "./pageLoader";
import { PageHeader } from "../navigation/page-header";
import { Anchor } from "../buttons/anchor";
import { Counter } from "../counter";
import styled from "styled-components";
import { Paragraph } from "../typography/paragraph";
import { Button } from "../buttons/button";

export interface PageTemplatesArgs {
  sidebar?: SidebarArgs;
  header?: AppHeaderArgs;
  isLoading?: boolean;
}

const languages = {
  en: {
    key: "en",
    label: "English",
  },
  fr: {
    key: "fr",
    label: "French",
  },
  it: {
    key: "it",
    label: "Italian",
  },
};

const csm = {
  name: "John Doe",
  email: "john.doe@contoso.org",
  // picture: "https://placeimg.com/300/300/animal",
};

const profileModalArgs: UserMenuArgs = {
  user: {
    name: "John Doe",
    email: "gionni@contoso.com",
    company: "Enel",
    // picture: "https://placeimg.com/300/300/people"
  },
  csm: csm,
  languages: languages,
  currentLanguage: "en",
  onSelectLanguage: (lang) => {
    alert("Selected language: " + lang);
  },
  onFeedbackClick: () => {
    alert("Feedback clicked");
  },
  onToggleChat: () => {
    alert("Toggle chat clicked");
  },
  onLogout: () => {
    alert("Logout clicked");
  },
};

const Container = styled.div`
  /* Hide scrollbar for Chrome, Safari and Opera */
  ::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  margin: ${({ theme }) => theme.space.xxl};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin: ${({ theme }) => `${theme.space.lg} ${theme.space.md}`};
  }
`;

const Pipe = styled.span`
  /** Vertical Separator */
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: ${({ theme }) => theme.space.lg};
  margin-right: ${({ theme }) => theme.space.sm};
  display: inline;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 0;
    margin: 0;
  }
`;

export const PageTemplate = ({
  sidebar,
  header,
  ...args
}: PageTemplatesArgs) => {
  const [expanded, setExpanded] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const headerProps: AppHeaderArgs = {
    ...header,
    onProfileModalToggle: () => setProfileModalOpen(!profileModalOpen),
  };

  return args.isLoading ? (
    <PageLoader />
  ) : (
    <Chrome isFluid hue={theme.palette.white}>
      <Body style={{ backgroundColor: theme.palette.grey[100] }}>
        <AppHeader
          {...headerProps}
          isProfileModalOpen={profileModalOpen}
          onSidebarMenuToggle={toggleSidebar}
        />
        {profileModalOpen && (
          <ProfileModal
            onClose={() => setProfileModalOpen(false)}
            {...{ menuArgs: profileModalArgs }}
          />
        )}
        <Content>
          <Sidebar
            {...sidebar}
            isExpanded={expanded}
            onToggleMenu={toggleSidebar}
          />
          <Main id="main" style={{ backgroundColor: "transparent", margin: 0 }}>
            <PageHeader>
              <PageHeader.Breadcrumb>
                <Anchor href="#">Home</Anchor>
                <Anchor href="#">Page</Anchor>
              </PageHeader.Breadcrumb>
              <PageHeader.Main
                infoOverline="LIMITED EDITION - DRESSING BERRIES"
                infoTitle="Example Page"
                infoDescription="This is a page description, with a lot of text to test the overflow behavior of the page header."
                infoCounters={
                  <>
                    <Counter key={"completed"} counter={11} status="completed">
                      Completed
                    </Counter>
                    <Counter key={"progress"} counter={22} status="progress">
                      In progress
                    </Counter>
                    <Counter key={"incoming"} counter={33} status="incoming">
                      Incoming
                    </Counter>
                    <Pipe />
                    <Counter key={"functional"} counter={44} status="functional">
                      Functional
                    </Counter>
                    <Counter  key={"experiential"} counter={55} status="experiential">
                      Experiential
                    </Counter>
                  </>
                }
                metaImage="https://placeimg.com/600/400/nature"
              />
              <PageHeader.Buttons>
                <Button
                  onClick={() => alert("hacked")}
                  isPill
                  isPrimary
                  themeColor={theme.colors.accentHue}
                >
                  Click to win 1 billion of rupie
                </Button>
              </PageHeader.Buttons>
            </PageHeader>
            <Container>
              <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                eu nisl quis nisi porttitor aliquet. Nulla facilisi.
              </Paragraph>
            </Container>
          </Main>
        </Content>
      </Body>
    </Chrome>
  );
};
