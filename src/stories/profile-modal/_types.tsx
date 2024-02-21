import { InputHTMLAttributes, LiHTMLAttributes } from "react";
import { NextItemArgs } from "../dropdowns/menu/_types";
import { ModalArgs } from "../modals/_types";

export interface ProfileModalArgs extends ModalArgs {
  menuArgs: UserMenuArgs;
}

export interface MenuItemProps extends NextItemArgs {
  selectedItem?: string;
  icon?: React.ReactNode;
  content?: any;
  setActive: (item: string) => void;
}

export interface Language {
  key: string;
  label: string;
}

export interface UserProfileProps {
  name: string;
  email: string;
  picture?: string;
  company?: string;
}

export interface UserMenuArgs extends LiHTMLAttributes<HTMLLIElement> {
  user: UserProfileProps;
  csm: UserProfileProps;
  feedbackTitle?: string;
  feedbackSubTitle?: string;
  csmTitle?: string;
  csmContactLabel?: string;
  copyLabel?: string;
  chatSupportLabel?: string;
  languageTitle?: string;
  currentLanguageLabel?: string;
  languages: { [key: string]: Language };
  currentLanguage: string;
  logoutTitle?: string;
  privacy: {
    title?: string;
    url?: string;
  };
  privacyTitle?: string;
  onSelectLanguage: (lang: string) => void;
  onFeedbackClick?: () => void;
  onToggleChat: () => void;
  onLogout: () => void;
  onCopyEmail?: () => void;
  chatSupport?: boolean;
  settingValue?: number;
  i18n?: {
    settingsTitle?: string;
    settingsIntroText?: string;
    settingsOutroText?: {
      paragraph_1: string;
      paragraph_2?: string;
      paragraph_3?: string;
    };
    settingsToggle?: {
      title: string;
      on: string;
      off: string;
    };
  };
  onSetSettings: (value: number) => void;
}
