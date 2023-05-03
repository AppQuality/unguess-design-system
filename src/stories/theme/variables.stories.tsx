import { Story } from "@storybook/react";
import { theme } from ".";

const Template: Story = () => {
  return (
    <pre>
      {JSON.stringify(theme, function(key, val) {
        return (typeof val === 'function') ? '' + val : val;
}, 2)}
    </pre>
  );
};

export const Default = Template.bind({});
Default.args = {
  
};

export default {
  title: "Theme/Variables",
  argTypes: {
    cards: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
};
