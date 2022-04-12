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
  
  isProfileModalOpen?: boolean;

  onProfileModalToggle?: () => void;
  /** Toggle Sidebar */
  onSidebarMenuToggle?: () => void;
}
