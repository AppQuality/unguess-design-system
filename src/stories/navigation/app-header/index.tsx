import styled from "styled-components";
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron-down-stroke.svg";
import { Avatar } from "../../avatar";
import { IconButton } from "../../buttons/icon-button";
import { theme } from "../../theme";
import { Header } from "../header";
import { HeaderItem, HeaderItemIcon } from "../header/header-item";
import { AppHeaderArgs } from "./_types";
import { HeaderSkeleton } from "./skeleton";

const ChevronButton = styled(IconButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

/**
 * An Header is a visual way to display general information.
 * This can include navList Items, modal, profile settings.
 */
const AppHeader = ({
  brand,
  avatar,
  isLoading,
  style,
  ...args
}: AppHeaderArgs) => {
  return isLoading ? (
    <HeaderSkeleton />
  ) : (
    <Header
      {...args}
      style={{
        ...style,
        zIndex: style?.zIndex || theme.levels.front,
      }}
    >
      {args.hasChangelog && args.changelogItem && (
        <HeaderItem style={{ marginRight: "-" + theme.space.xs }}>
          <HeaderItemIcon>{args.changelogItem}</HeaderItemIcon>
        </HeaderItem>
      )}

      <HeaderItem isRound onClick={args.onProfileModalToggle}>
        <HeaderItemIcon>
          <>
            <Avatar {...avatar} />
            <ChevronButton size="small" isRotated={args.isProfileModalOpen}>
              <ChevronIcon />
            </ChevronButton>
          </>
        </HeaderItemIcon>
      </HeaderItem>
    </Header>
  );
};

export { AppHeader };
