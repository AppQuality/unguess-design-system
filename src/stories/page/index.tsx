import { Chrome } from "../navigation/chrome";
import { theme } from "../theme";
import { Sidebar } from "../navigation/sidebar";

import { SidebarArgs } from "../navigation/sidebar/_types";
import { Body } from "../navigation/body";
import { Content } from "../navigation/content";
import { Main } from "../navigation/main";
import { AppHeader } from "../navigation/app-header";
import { AppHeaderArgs } from "../navigation/app-header/_types";
import { XXXL } from "../typography/typescale";
import { useState } from "react";
import { ProfileModal } from "../profile-modal";
import { UserMenuArgs } from "../profile-modal/_types";

export interface PageTemplatesArgs {
  sidebar?: SidebarArgs;
  header?: AppHeaderArgs;
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
  onSelectLanguage: (lang) => { alert ("Selected language: " + lang); },
  onFeedbackClick: () => { alert ("Feedback clicked"); },
  onToggleChat: () => { alert ("Toggle chat clicked"); },
  onLogout: () => { alert ("Logout clicked"); }
};

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
    onProfileModalToggle: () => setProfileModalOpen(!profileModalOpen)
  };

  return (
    <Chrome
      isFluid
      hue={theme.palette.white}
    >
      <Body>
        <AppHeader {...headerProps } isProfileModalOpen={profileModalOpen} onSidebarMenuToggle={toggleSidebar} />
        {profileModalOpen && <ProfileModal onClose={()=> setProfileModalOpen(false)} {...{ menuArgs: profileModalArgs}}/>}
        <Content>
          <Sidebar {...sidebar} isExpanded={expanded} onToggleMenu={toggleSidebar} />
          <Main>
            <XXXL>This is Main.</XXXL>
            
          </Main>
        </Content>
      </Body>
    </Chrome>
  );
};
