import { NextItemArgs } from "../dropdowns/menu/_types";

export interface ProfileModalArgs {
  tempSelectedItem?: string;
  currentLanguage: "EN" | "IT";
  csmContactInfos: UserInfos;
  userInfos: UserInfos;
}

export interface UserInfos {
  initials: string;
  fullName: string;
  email: string;
  company?: string;
}


export interface MenuItemProps extends NextItemArgs {
  selectedItem?: string;
  icon?: React.ReactNode;
  content?: any;
  setActive: (item: string) => void;
}