import { Stepper as ZendeskStepper } from "@zendeskgarden/react-accordions";
import { StepperArgs } from "./_types";
import styled from "styled-components";

const UgStep = styled(ZendeskStepper.Step)`
  svg {
    color: ${({ theme }) => theme.palette.green[700]};
  }
`;

const UgLabel = styled(ZendeskStepper.Label)``;

const UgStepper = styled(ZendeskStepper)`
  ${(props) => {
    console.log("Active index: ", props.activeIndex);
    return "";
  }}

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

/**
 * A Stepper guides users through steps of a task in sequential order.

 * Used for this:
    - For multi-step flows that must be completed in order
 */
const Stepper = (props: StepperArgs) => <UgStepper {...props} />;

Stepper.Step = UgStep;
Stepper.Label = UgLabel;
Stepper.Content = UgStepper.Content;

export { Stepper };
