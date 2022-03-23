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

export interface PageTemplatesArgs {
  sidebar?: SidebarArgs;
  header?: AppHeaderArgs;
}

export const PageTemplate = ({
  sidebar,
  header,
  ...args
}: PageTemplatesArgs) => {

  const [expanded, setExpanded] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <Chrome
      isFluid
      hue={theme.palette.white}
    >
      <Body>
        <AppHeader {...header} onSidebarMenuToggle={toggleSidebar}/>

        <Content>
          <Sidebar {...sidebar} isExpanded={expanded} onToggleMenu={toggleSidebar} />
          <Main>
            <h1 style={{ marginLeft: "24px" }}>This is Main.</h1>
          </Main>
        </Content>
      </Body>
    </Chrome>
  );
};
