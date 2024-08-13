import { DrawerArgs } from "./_types";
import { Meta, StoryFn } from "@storybook/react";
import { Drawer } from ".";
import { Button } from "../buttons/button";
import { LoremIpsum } from "./loremIpsum";

const defaultArgs: DrawerArgs = {
  isOpen: true,
  onClose: (e) => {
    alert("Close clicked");
    console.log(e);
  },
};

const Template: StoryFn<DrawerArgs> = (args) => {
  return (
    <Drawer isOpen={args.isOpen} onClose={args.onClose}>
      <Drawer.Header>What a title</Drawer.Header>
      <Drawer.Body>
        <LoremIpsum />
      </Drawer.Body>
      <Drawer.Footer>
        <Drawer.FooterItem>
          <Button isBasic onClick={args.onClose}>
            Cancel
          </Button>
        </Drawer.FooterItem>
        <Drawer.FooterItem>
          <Button
            isPrimary
            onClick={() => {
              alert("Confirm clicked!");
            }}
          >
            Confirm
          </Button>
        </Drawer.FooterItem>
      </Drawer.Footer>
      <Drawer.Close />
    </Drawer>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Molecules/Drawers",
  component: Drawer,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Drawer>;
