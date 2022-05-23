import { ComponentMeta, Story } from "@storybook/react";
import { theme } from "../../theme";

import { SidebarArgs } from "./_types";
import { Chrome } from "../chrome";
import { Sidebar } from ".";
import { useState } from "react";
import { FEATURE_FLAG_CATALOG } from "../../../constants";

interface SidebarStoryArgs extends SidebarArgs {}

const Template: Story<SidebarStoryArgs> = (args) => {
  const [expanded, setExpanded] = useState(args.isExpanded || false);

  return (
    <Chrome
      isFluid
      style={{ height: 400, minWidth: 480 }}
      hue={theme.palette.white}
    >
      <Sidebar
        {...args}
        isExpanded={expanded}
        onToggleMenu={() => setExpanded(!expanded)}
      />
    </Chrome>
  );
};

const defaultArgs: SidebarStoryArgs = {
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
    },
    {
      id: "4",
      title: "Enel Premia Wow",
      campaigns: "there are no campaigns",
    },
    {
      id: "5",
      title: "EAS",
      campaigns: "12 campaigns",
    },
    {
      id: "6",
      title: "Beauty Contest Job Recruitment",
      campaigns: "1 campaign",
    },
  ],
  onNavToggle: (route: string) => {
    console.log(`Navigating to ${route}`);
  },
  isLoading: false,
  activeWorkspace: {
    company: "Enel",
    id: 1,
  },
  workspaces: [
    {
      company: "Enel",
      id: 1,
    },
  ],
};
export const Default = Template.bind({});
Default.args = defaultArgs;

export const MultipleWorkspaces = Template.bind({});
MultipleWorkspaces.args = {
  ...defaultArgs,
  workspaces: [
    {
      company: "Enel",
      id: 1,
    },
    {
      company: "Amazon",
      id: 2,
    },
    {
      company: "One upon a time there was an insanely long company name",
      id: 3,
    },
  ],
};

export const WithTokens = Template.bind({});
WithTokens.args = {
  ...defaultArgs,
  isExpanded: true,
  tokens: "24",
};

export const WithAll = Template.bind({});
WithAll.args = {
  ...WithTokens.args,
  workspaces: [
    {
      company: "Enel",
      id: 1,
    },
    {
      company: "Amazon",
      id: 2,
    },
    {
      company: "One upon a time there was an insanely long company name",
      id: 3,
    },
  ],
  features: [
    {
      slug: FEATURE_FLAG_CATALOG,
      name: "Catalog",
    },
  ],
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
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Sidebar>;
