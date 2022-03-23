import { BrandItemArgs } from "../header/header-item/_types";
import { AvatarArgs } from "src/stories/avatar/_types";
import { HeaderArgs } from "../header/_types";

export interface AppHeaderArgs extends HeaderArgs {
  /** Display the changelog trigger item */
  hasChangelog?: boolean;
  /** Triggered when the changelog is clicked */
  onChangelogClick?: () => void;
  /** Set Brand Item settings */
  brand?: BrandItemArgs;
  /** Set Avatar settings */
  avatar?: AvatarArgs & {
    onProfileModalToggle?: () => void;
  };
}
