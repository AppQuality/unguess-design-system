import { ComponentMeta, Story } from "@storybook/react";
import { PageTemplate, PageTemplatesArgs } from ".";
import { Default as DefaultHeader } from "../navigation/app-header/index.stories";
import { Default as DefaultSidebar } from "../navigation/sidebar/index.stories";

const Template: Story<PageTemplatesArgs> = (args) => <PageTemplate {...args} />;

export const Default = Template.bind({});
Default.args = {
  header: {
    ...DefaultHeader.args,
  },
  sidebar: {
    ...DefaultSidebar.args,
  },
};


export default {
  title: "Templates/PageTemplate",
  component: PageTemplate,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof PageTemplate>;
