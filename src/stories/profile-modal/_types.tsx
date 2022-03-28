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
