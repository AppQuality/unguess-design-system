import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { useState } from "react";
import { SplitButton } from ".";
import { ReactComponent as LeafIcon } from "../../../assets/icons/chevron-down-stroke.svg";
import { Item } from "../../dropdowns/item";
import { Menu } from "../../dropdowns/menu";
import { Dropdown } from "../../dropdowns/select";
import { Trigger } from "../../trigger";
import { Button } from "../button";
import { IconButton } from "../icon-button";
import { SplitButtonArgs } from "./_types";

const Template: Story<SplitButtonArgs> = (args) => {
  const [rotated, setRotated] = useState<boolean>();
  return (
    <SplitButton {...args}>
      <Button>button</Button>
      <Dropdown
        onStateChange={(options) =>
          options.hasOwnProperty("isOpen") && setRotated(options.isOpen)
        }
      >
        <Trigger>
          <IconButton
            isPill={false}
            isBasic={false}
            aria-label="other actions"
            isRotated={rotated}
          >
            <LeafIcon />
          </IconButton>
        </Trigger>
        <Menu placement="bottom-end">
          <Item value="prune">Prune</Item>
          <Item value="water">Water</Item>
          <Item value="fertilize">Fertilize</Item>
        </Menu>
      </Dropdown>
    </SplitButton>
  );
};

export const Default = Template.bind({});
Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=102%3A9661",
  },
};

export default {
  title: "Atoms/Buttons/SplitButton",
  component: SplitButton,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof IconButton>;
