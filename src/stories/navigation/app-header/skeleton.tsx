import { HeaderItem, HeaderItemIcon } from "../header/header-item";
import { Skeleton } from "../../loaders/skeleton";
import { theme } from "../../theme";
import { Header } from "../header";
import { LogoIconContainer } from "../header/header-item/brandItem";
import { Logo } from "../../logo";

export const HeaderSkeleton = () => {
  return (
    <Header isStandalone>
      <LogoIconContainer hasLogo>
        <HeaderItemIcon>
          <Logo type={"icon"} size={150} />
        </HeaderItemIcon>
      </LogoIconContainer>

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
