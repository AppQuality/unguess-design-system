import { ReactComponent as ChangelogIcon } from "@zendeskgarden/svg-icons/src/16/megaphone-stroke.svg";
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";
import { theme } from "../../theme";
import { Avatar } from "../../avatar";
import { IconButton } from "../../buttons/icon-button";
import { Header } from "../header";
import { BrandItem, HeaderItem, HeaderItemIcon } from "../header/header-item";
import { AppHeaderArgs } from "./_types";

const ChevronButton = styled(IconButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

/**
 * An Header is a visual way to display general information. 
 * This can include navList Items, modal, profile settings.
 */
const AppHeader = ({ brand, avatar, ...args }: AppHeaderArgs) => {
  const { width } = useWindowSize();
  return (
    <Header {...args}>
      <BrandItem {...brand} />
      {args.hasChangelog && (
        <HeaderItem
          onClick={args.onChangelogClick}
          style={{ marginRight: "-" + theme.space.sm }}
        >
          <HeaderItemIcon>
            <ChangelogIcon />
          </HeaderItemIcon>
        </HeaderItem>
      )}

      <HeaderItem isRound onClick={avatar?.onProfileModalToggle}>
        <HeaderItemIcon>
          <>
            <Avatar
              {...avatar}
              size={
                width > parseInt(theme.breakpoints.sm) ? "small" : "extrasmall"
              }
            />
            <ChevronButton size="small">
              <ChevronIcon />
            </ChevronButton>
          </>
        </HeaderItemIcon>
      </HeaderItem>
    </Header>
  );
};

export { AppHeader };
