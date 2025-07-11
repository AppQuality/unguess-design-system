import { ComponentProps } from "react";
import styled from "styled-components";
import { IconButton } from "../../buttons/icon-button";
import { Tooltip } from "../../tooltip";
import { PlayerShortCut } from "../shortcuts";

type ShortcutType = ComponentProps<typeof PlayerShortCut>["type"];

const ControlButtonWithTooltip = (
  props: ComponentProps<typeof IconButton> & {
    tooltip?: {
      description: string;
      type: ShortcutType;
    };
  }
) => {
  if (!props.tooltip) return <IconButton {...props} />;
  return (
    <Tooltip
      size="medium"
      maxWidth="unset"
      placement="end"
      appendToNode={this}
      content={
        <PlayerShortCut type={props.tooltip.type}>
          {props.tooltip.description}
        </PlayerShortCut>
      }
      type="light"
    >
      <IconButton {...props} />
    </Tooltip>
  );
};

export const ControlButton = styled(ControlButtonWithTooltip)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;
