import { ComponentMeta, Story } from "@storybook/react";
import { useState } from 'react';
import { Dropdown, Trigger, Menu, Item  } from "@zendeskgarden/react-dropdowns";  //TODO: replace with unguess component
import { Button } from "../button";
import { IconButton } from "../icon-button";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { SplitButton } from ".";
import { SplitButtonArgs } from "./_types";

const Template: Story<SplitButtonArgs> = (args) => {
  const [rotated, setRotated] = useState<boolean>();
  return (
    <SplitButton>
      <Button isBasic>button</Button>
      <Dropdown
        onStateChange={(options) =>
          options.hasOwnProperty("isOpen") && setRotated(options.isOpen)
        }
      >
        <Trigger>
          <IconButton isPill={false} aria-label="other actions" isRotated={rotated}>
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

export default {
  title: "Atoms/Buttons/SplitButton",
  component: SplitButton,
} as ComponentMeta<typeof IconButton>;
