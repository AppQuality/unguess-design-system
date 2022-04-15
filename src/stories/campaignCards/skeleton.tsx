import { CardHeader, CardBody, CardFooter, Divider, Wrapper } from ".";
import { Skeleton } from "../loaders/skeleton";
import { theme } from "../theme";

export const CampaignCardSkeleton = () => {
  return (
    <Wrapper>
      <CardHeader>
        <Skeleton width="30%" />
      </CardHeader>
      <CardBody>
        <Skeleton height="18px" width="50%" />
        <br />
        <Skeleton
          height="26px"
          style={{ backgroundColor: theme.palette.blue[400] }}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <Skeleton height="18px" width="45%" />{" "}
        <Skeleton width="26px" height="26px" style={{ borderRadius: "100%" }} />
      </CardFooter>
    </Wrapper>
  );
};
