import {
  Accordion,
  Stepper as ZendeskStepper,
} from "@zendeskgarden/react-accordions";
import { StepperArgs } from "./_types";
import styled from "styled-components";
import useWindowSize from "../../hooks/useWindowSize";
import { theme } from "../theme";

const UgStep = styled(ZendeskStepper.Step)`
  svg {
    color: ${({ theme }) => theme.palette.green[700]};
  }
`;

const UgLabel = styled(ZendeskStepper.Label)``;

const UgStepper = styled(ZendeskStepper)`
  div[data-garden-id="accordions.step_icon"] {
    background-color: ${({ theme }) => theme.palette.grey[200]};
    color: ${({ theme }) => theme.palette.grey[800]};
    font-weight: bold;
  }

  ${(props) =>
    props.activeIndex !== undefined &&
    `
      ${UgStep}:nth-child(${props.activeIndex + 1})  {
        
        div[data-garden-id="accordions.step_icon"] {
            background-color: ${props.theme.palette.blue[600]};
            color: white;
        }

        ${UgLabel} {
            font-weight: 500;
            color: ${props.theme.palette.blue[600]};
        }
      }
    `}
`;

const UgContent = styled(ZendeskStepper.Content)`
  padding: ${({ theme }) =>
    `${theme.space.sm} ${theme.space.sm} ${theme.space.sm} 24px`};
  margin-top: 0;
  margin-bottom: 0;
  > div {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`;

/**
 * A Stepper guides users through steps of a task in sequential order.

 * Used for this:
    - For multi-step flows that must be completed in order
 */
const Stepper = (props: StepperArgs) => {
  const { width } = useWindowSize();
  const smBreakpoint = Number(theme.breakpoints.sm.replace("px", ""));

  return width <= smBreakpoint ? (
    <Accordion level={1} isBare isExpandable isAnimated>
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label>{props.accordionTitle}</Accordion.Label>
        </Accordion.Header>
        <Accordion.Panel>
          <UgStepper {...props} />
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  ) : (
    <UgStepper {...props} />
  );
};

Stepper.Step = UgStep;
Stepper.Label = UgLabel;
Stepper.Content = UgContent;

export { Stepper };
