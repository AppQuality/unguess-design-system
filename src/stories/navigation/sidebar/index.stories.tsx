import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";

import { SidebarArgs } from "./_types";
import { Chrome } from "../chrome";
import { Sidebar } from ".";
import { useState } from "react";

interface SidebarStoryArgs extends SidebarArgs {}

// const ChevronButton = styled(IconButton)`
//   @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
//     display: none;
//   }
// `;

const Template: Story<SidebarStoryArgs> = (args) => {

  const [expanded, setExpanded] = useState(false);


  return (
    <Chrome
      isFluid
      style={{ height: 400, minWidth: 480 }}
      hue={theme.palette.white}
    >
      <Sidebar {...args} isExpanded={expanded} onToggleMenu={() => setExpanded(!expanded)}/>
    </Chrome>
  );
};

export const Default = Template.bind({});
Default.args = {
  currentRoute: "home",
  dividerLabel: "Projects",
  projects: [
    {
      id: "1",
      title: "Enel Premia Wow",
      campaigns: "there are no campaigns",
    },
    {
      id: "2",
      title: "EAS",
      campaigns: "12 campaigns",
    },
    {
      id: "3",
      title: "Beauty Contest Job Recruitment",
      campaigns: "1 campaign",
    }
  ]
};

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
