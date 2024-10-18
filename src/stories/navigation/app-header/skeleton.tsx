import { Skeleton } from "../../loaders/skeleton";
import { theme } from "../../theme";
import { Header } from "../header";
import { HeaderItem, HeaderItemIcon } from "../header/header-item";

export const HeaderSkeleton = () => {
  return (
    <Header isStandalone>
      <HeaderItem style={{ marginRight: "auto", marginLeft: "-4px" }}>
        {window.matchMedia(`only screen and (min-width: 576px)`).matches ? (
          <Skeleton width="200px" height={theme.space.sm} />
        ) : (
          <Skeleton
            width="80px"
            height={theme.space.sm}
            style={{ marginLeft: theme.space.sm }}
          />
        )}
      </HeaderItem>

      <HeaderItem isRound>
        <HeaderItemIcon>
          <>
            <Skeleton
              width="32px"
              height="32px"
              style={{ borderRadius: "100%" }}
            />
          </>
        </HeaderItemIcon>
      </HeaderItem>
    </Header>
  );
};
