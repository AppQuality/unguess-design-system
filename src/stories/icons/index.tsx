import styled from "styled-components";
import { ReactComponent as UnguessSquare } from "../../assets/icons/ug_square.svg";
import { ReactComponent as UnguessCircle } from "../../assets/icons/ug_circle.svg";
import { ReactComponent as UnguessTriangle } from "../../assets/icons/ug_triangle.svg";
import { ReactComponent as StatusCompletedIcon } from "../../assets/icons/campaign-completed.svg";
import { ReactComponent as StatusLockedIcon } from "../../assets/icons/campaign-locked.svg";
import { ReactComponent as StatusIncomingIcon } from "../../assets/icons/campaign-incoming.svg";
import { ReactComponent as StatusRunningIcon } from "../../assets/icons/campaign-progress.svg";
import { ReactComponent as CampaignExperientialIcon } from "../../assets/icons/campaign-experiential.svg";
import { ReactComponent as CampaignFunctionalIcon } from "../../assets/icons/campaign-functional.svg";
import { IconArgs } from "./_types";

const StyledUgIcon = styled.span``;

export const Icon = (props: IconArgs) => {
  const { type, size } = props;
  const dim = size ?? 24;

  return (
    <StyledUgIcon>
      {type === "square" && <UnguessSquare width={dim} height={dim} />}
      {type === "triangle" && <UnguessTriangle width={dim} height={dim} />}
      {type === "circle" && <UnguessCircle width={dim} height={dim} />}
    </StyledUgIcon>
  );
};

export {
  StatusCompletedIcon,
  StatusLockedIcon,
  StatusIncomingIcon,
  StatusRunningIcon,
  CampaignExperientialIcon,
  CampaignFunctionalIcon,
};
