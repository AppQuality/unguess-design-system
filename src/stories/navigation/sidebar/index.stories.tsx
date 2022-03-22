import { ComponentMeta, Story } from "@storybook/react";
import { NavItem, NavItemIcon, NavItemText, NavToggle } from "./nav-item";
import { theme } from "../../theme";
import useWindowSize from "../../../hooks/useWindowSize";
import { ReactComponent as ProductIcon } from "@zendeskgarden/svg-icons/src/26/garden.svg";
import { ReactComponent as HomeIcon } from "@zendeskgarden/svg-icons/src/26/home-fill.svg";
import { ReactComponent as EmailIcon } from "@zendeskgarden/svg-icons/src/26/email-fill.svg";
import { ReactComponent as SettingsIcon } from "@zendeskgarden/svg-icons/src/26/settings-fill.svg";
import { ReactComponent as ZendeskIcon } from "@zendeskgarden/svg-icons/src/26/zendesk.svg";
import { Logo } from "../../logo";
import { Type as LogoTypes } from "../../logo/_types";
import { SidebarArgs } from "./_types";
import { useState } from "react";
import { Chrome } from "../chrome";
import { Sidebar } from ".";

interface SidebarStoryArgs extends SidebarArgs {}

// const ChevronButton = styled(IconButton)`
//   @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
//     display: none;
//   }
// `;

const Template: Story<SidebarStoryArgs> = (args) => {
  const { width } = useWindowSize();
  const [nav, setNav] = useState("home");
  const [expanded, setExpanded] = useState(false);

  return (
    <Chrome
      isFluid
      style={{ height: 360, minWidth: 600 }}
      hue={theme.palette.white}
    >
      <Sidebar {...args} isExpanded={expanded}>
        <NavToggle onClick={() => setExpanded(!expanded)} isExpanded={expanded} />
        <NavItem hasLogo isExpanded={expanded} style={{pointerEvents: "none"}}>
          <NavItemIcon>
            <ProductIcon style={{ color: theme.palette.green[200] }} />
          </NavItemIcon>
          <NavItemText>Zendesk Garden</NavItemText>
        </NavItem>
        <NavItem isExpanded={expanded} isCurrent={nav === "home"} onClick={() => setNav("home")}>
          <NavItemIcon isCurrent={nav === "home"} isStyled>
            <HomeIcon />
          </NavItemIcon>
          <NavItemText>Home</NavItemText>
        </NavItem>
        <NavItem isExpanded={expanded} isCurrent={nav === "nav-2"} onClick={() => setNav("nav-2")}>
          <NavItemIcon>
            <EmailIcon />
          </NavItemIcon>
          <NavItemText>Email</NavItemText>
        </NavItem>
        <NavItem isExpanded={expanded} isCurrent={nav === "nav-3"} onClick={() => setNav("nav-3")}>
          <NavItemIcon>
            <SettingsIcon />
          </NavItemIcon>
          <NavItemText>Settings</NavItemText>
        </NavItem>
        <NavItem isExpanded={expanded} hasBrandmark title="Be smart from the start" style={{pointerEvents: "none"}}>
          <NavItemIcon>
            <Logo type={LogoTypes.icon} />
          </NavItemIcon>
          <NavItemText>UNGUESS</NavItemText>
        </NavItem>
      </Sidebar>
    </Chrome>
  );
};

export const Default = Template.bind({});
Default.args = {};

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/cDHa0NrDcLoJcPL20FfGBI/UNGUESS-%7C-Redesign-Zendesk?node-id=712%3A23480",
  },
};

export default {
  title: "Organisms/Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;
