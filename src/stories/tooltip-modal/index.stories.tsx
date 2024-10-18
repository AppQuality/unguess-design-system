import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { useRef, useState } from "react";
import { TooltipModal } from ".";
import { Button } from "../buttons/button";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { TooltipModalArgs } from "./_types";

const Template: Story<TooltipModalArgs> = (props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>();
  return (
    <Row>
      <Col textAlign="center">
        <Button
          ref={buttonRef}
          onClick={() => {
            setReferenceElement(buttonRef.current);
          }}
        >
          Tooltip modal
        </Button>
        <TooltipModal
          referenceElement={referenceElement}
          onClose={() => setReferenceElement(null)}
          {...props}
        >
          <TooltipModal.Title>Tooltip modal header</TooltipModal.Title>
          <TooltipModal.Body>
            Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot
            courgette tatsoi pea sprouts fava bean collard greens dandelion okra
            wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini.
          </TooltipModal.Body>
          <TooltipModal.Close aria-label="Close" />
        </TooltipModal>
      </Col>
    </Row>
  );
};

const defaultArgs: TooltipModalArgs = {
  placement: "auto",
  hasArrow: true,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Molecules/TooltipModal",
  component: TooltipModal,
  argTypes: {
    placement: {
      name: "Placement",
      description: "The placement of the tooltip modal",
      control: {
        type: "select",
        options: [
          "auto",
          "top",
          "top-start",
          "top-end",
          "bottom",
          "bottom-start",
          "bottom-end",
          "end",
          "end-top",
          "end-bottom",
          "start",
          "start-top",
          "start-bottom",
        ],
      },
    },
    hasArrow: {
      name: "Has arrow",
      description: "Whether the tooltip modal has an arrow",
      control: "boolean",
    },
    zIndex: {
      table: {
        disable: true,
      },
    },
    referenceElement: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof TooltipModal>;
