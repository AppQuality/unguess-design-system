import { ModalArgs } from "../_types";
import { ComponentMeta, Story } from "@storybook/react";
import { ModalFullScreen } from ".";
import { ModalClose, FooterItem } from "../.";
import { Button } from "../../buttons/button";
import { Logo } from "../../logo";
import { Breadcrumb } from "../../breadcrumbs";
import { Anchor } from "../../buttons/anchor";
import { Span } from "../../typography/span";
import { theme } from "../../theme";

interface ModalStoryArgs extends ModalArgs {
  breadcrumbs?: any;
  isDanger?: boolean;
}

const design = {
  type: "figma",
  url: "https://www.figma.com/file/sByLYaJ4MdJhmqmvom9T88/UNGUESS-%7C-Express-MVP-(Output)",
};

const defaultArgs: ModalStoryArgs = {
  breadcrumbs: [
    {
      children: "ACME's Workspace",
      onClick: () => { alert("ACME's Workspace clicked") }
    },
    {
      children: "Le mie campagne",
      onClick: () => { alert("Le mie campagne clicked") }
    },
  ],
  onClose: (e) => { alert("Close clicked"); }
};

const Template: Story<ModalStoryArgs> = (args) => {
  const { isDanger, breadcrumbs } = args;

  return (
    <ModalFullScreen {...args}>
      <ModalFullScreen.Header isDanger={isDanger}>
        <Logo type="icon" size={25} style={{ marginRight: theme.space.xs }} />
        <Breadcrumb {...args}>
          {breadcrumbs.map((item: any) => (
            <Anchor {...item} />
          ))}
          <Span>Nuovo test esplorativo express</Span>
        </Breadcrumb>
      </ModalFullScreen.Header>
      <ModalFullScreen.Body>asdsadsadsadsada</ModalFullScreen.Body>
      <ModalFullScreen.Footer>
        <FooterItem>
          <Button isBasic onClick={args.onClose}>
            Secondary
          </Button>
        </FooterItem>
        <FooterItem>
          <Button
            isPrimary
            {...isDanger && { isDanger: true }}
            onClick={() => {
              alert("Ahoy!");
            }}
          >
            Primary
          </Button>
        </FooterItem>
      </ModalFullScreen.Footer>
      <ModalClose aria-label="Close modal" />
    </ModalFullScreen>
  );
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};
Default.parameters = {
  design,
};

export default {
  title: "Molecules/Modals/Fullscreen",
  component: ModalFullScreen,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof ModalFullScreen>;
