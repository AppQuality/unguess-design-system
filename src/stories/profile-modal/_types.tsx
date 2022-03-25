export interface ProfileModalArgs {
  tempSelectedItem?: string;
  currentLanguage: Language;
  csmContactInfos: UserInfos;
  userInfos: UserInfos;
}

export enum ProfileModalViewsEnum {
  INITIAL = 'initial',
  NEED_HELP = 'need-help',
  CHANGE_LANGUAGE = 'change-language',
}

export enum Language {
  EN = 'Inglese',
  IT = 'Italiano'
}

export interface UserInfos {
  initials: string;
  fullName: string;
  email: string;
  company?: string;
}
