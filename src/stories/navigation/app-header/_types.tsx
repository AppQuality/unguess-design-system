import { BrandItemArgs } from "../header/header-item/_types";
import { AvatarArgs } from "../../avatar/_types";
import { HeaderArgs } from "../header/_types";

export interface AppHeaderArgs extends HeaderArgs {
  /** Display the changelog trigger item */
  hasChangelog?: boolean;
  /** Changelog element */
  changelogItem?: React.ReactNode;
  /** Set Brand Item settings */
  brand?: BrandItemArgs;
  /** Set Avatar settings */
  avatar?: AvatarArgs;
  /** Set the profile modal open flag */
  isProfileModalOpen?: boolean;
  /** Callback when the Profile Modal is toggled */
  onProfileModalToggle?: () => void;
  /** Callback when the Sidebar is toggled */
  onSidebarMenuToggle?: () => void;
  /** Callback when the Logo Item is clicked */
  onLogoItemClick?: () => void;
}
