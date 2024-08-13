import { ModalArgs } from "../_types";
import { Meta, StoryFn } from "@storybook/react";
import { ModalFullScreen } from ".";
import { Button } from "../../buttons/button";
import { Logo } from "../../logo";
import { Breadcrumb } from "../../breadcrumbs";
import { Anchor } from "../../buttons/anchor";
import { Span } from "../../typography/span";
import { theme } from "../../theme";
import useWindowSize from "../../../hooks/useWindowSize";
import styled from "styled-components";

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
      onClick: () => {
        alert("ACME's Workspace clicked");
      },
    },
  ],
  onClose: (e) => {
    alert("Close clicked");
  },
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const Template: StoryFn<ModalStoryArgs> = (args) => {
  const { isDanger, breadcrumbs } = args;
  const { width } = useWindowSize();

  return (
    <ModalFullScreen {...args}>
      <ModalFullScreen.Header isDanger={isDanger}>
        {width > parseInt(theme.breakpoints.sm) ? (
          <Container>
            <Logo
              type="icon"
              size={25}
              style={{ marginRight: theme.space.xs }}
            />
            <Breadcrumb {...args}>
              {breadcrumbs.map((item: any) => (
                <Anchor {...item} />
              ))}
              <Span>Nuovo test esplorativo express</Span>
            </Breadcrumb>
          </Container>
        ) : (
          <Span>Nuovo test esplorativo express</Span>
        )}
        <ModalFullScreen.Close aria-label="Close modal" />
      </ModalFullScreen.Header>
      <ModalFullScreen.Body>Modal Body</ModalFullScreen.Body>
      <ModalFullScreen.Footer>
        <ModalFullScreen.FooterItem>
          <Button isBasic onClick={args.onClose}>
            Secondary
          </Button>
        </ModalFullScreen.FooterItem>
        <ModalFullScreen.FooterItem>
          <Button
            isPrimary
            {...(isDanger && { isDanger: true })}
            onClick={() => {
              alert("Ahoy!");
            }}
          >
            Primary
          </Button>
        </ModalFullScreen.FooterItem>
      </ModalFullScreen.Footer>
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
} as Meta<typeof ModalFullScreen>;
