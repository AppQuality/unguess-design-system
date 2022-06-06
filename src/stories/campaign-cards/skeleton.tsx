import { Skeleton } from "../loaders/skeleton";
import { SpecialCard } from "../special-cards";
import { theme } from "../theme";

export const CampaignCardSkeleton = () => {
  return (
    <SpecialCard>
      <SpecialCard.Meta>
        <Skeleton width="30%" />
      </SpecialCard.Meta>
      <SpecialCard.Header>
        <Skeleton height="18px" width="50%" />
        <br />
        <Skeleton
          height="26px"
          style={{ backgroundColor: theme.palette.blue[400] }}
        />
      </SpecialCard.Header>
      <SpecialCard.Footer>
        <Skeleton height="18px" width="45%" />
        <Skeleton width="26px" height="26px" style={{ borderRadius: "100%" }} />
      </SpecialCard.Footer>
    </SpecialCard>
  );
};
