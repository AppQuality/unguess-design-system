import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { DracCard } from ".";

interface Tile {
  value: string;
  label: string;
  icon: React.FC;
  description: string;
  disabled?: boolean;
}

interface TilesStoryProps {
  tiles: Array<Tile>;
  hasDescription: boolean;
}

const Template: Story<TilesStoryProps> = ({
  tiles,
  hasDescription,
  ...args
}) => {
  return (
  <div>ciao</div>
  );
};

export const Default = Template.bind({});
Default.args = {
};

export default {
  title: "Atoms/DracCard",
  component: DracCard,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof DracCard>;
