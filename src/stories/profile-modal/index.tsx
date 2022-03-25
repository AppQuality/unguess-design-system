import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import styled from "styled-components";
import { Avatar } from "../avatar";
import { Card } from "../cards";
import { Item } from "../dropdowns/item";
import { ItemMeta, MediaBody, MediaFigure, MediaItem, NextItem, PreviousItem, Separator } from "../dropdowns/menu";
import { Label } from "../label";
import { theme } from "../theme";
import { ReactComponent as ThumbsUp } from "../../assets/icons/thumbs-up.svg";
import { ReactComponent as QuestionMark } from "../../assets/icons/question-mark.svg";
import { ReactComponent as TranslationExists } from "../../assets/icons/translation-exists.svg";
import { ReactComponent as Exit } from "../../assets/icons/exit.svg";
import { ReactComponent as CheckLg } from "../../assets/icons/check-lg.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy.svg";
import { ReactComponent as InfoFill } from "../../assets/icons/info-fill.svg";
import { Language, ProfileModalArgs, ProfileModalViewsEnum, UserInfos } from "./_types";
import { Button } from "../buttons/button";

const ProfileModalCard = styled(Card)`
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 16px 8px 8px;

   position: relative;
   width: 296px;
   height: 437px;

   background: #FFFFFF;

   box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.176);
   border-radius: 8px;
`

const StyledSeparator = styled(Separator)`
   width: 100%;
`

const StyledItem = styled(Item)`
   width: -webkit-fill-available;
   height: 52px;
   display: flex;
   align-items: center;
   padding: 8px 20px;
`
const StyledPreviousItem = styled(PreviousItem)`
   width: -webkit-fill-available;
   display: flex;
   align-items: center;
`
const StyledNextItem = styled(NextItem)`
   width: -webkit-fill-available;
   height: 52px;
   display: flex;
   align-items: center;
   padding: 8px 20px;

   div:first-child {
      height: 52px;
      padding: 4px 0;
   }
`

const InfoWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;

   padding: 8px 8px 0px;

   position: static;
   height: 143px;

   flex: none;
   order: 0;
   align-self: stretch;
   flex-grow: 0;
   margin-bottom: 24px;
`

const CompanyLabel = styled(Label)`
   font-size: 12px;
   line-height: 16px;

   display: flex;
   align-items: center;
   text-align: center;
   letter-spacing: -0.000427656px;
`

const NameLabel = styled(Label)`
   font-size: 14px;
   line-height: 20px;

   display: flex;
   align-items: center;
   text-align: center;
   justify-content: center;
   letter-spacing: -0.154px;

   margin: 2px 0px;
`

const Description = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   font-weight: 400;
   font-size: 12px;
   line-height: 140%;

   text-align: center;

   color: ${theme.palette.grey["600"]};

   margin: 2px 0px;

   a {
      color: ${theme.palette.grey["600"]};
   }
`

const StyledMediaFigure = styled(MediaFigure)`
   margin-right: 4px;
`

const GreenThumbsUp = styled(ThumbsUp)`
   path {
      fill: ${theme.palette.kale["600"]};
   }
`

const StandardQuestionMark = styled(QuestionMark)`
   path {
      fill: ${theme.palette.blue["600"]};
   }
`

const StandardTranslationExists = styled(TranslationExists)`
   path {
      fill: ${theme.palette.blue["600"]};
   }
`

const StandardInfoFill = styled(InfoFill)`
   path {
      fill: ${theme.palette.blue["600"]};
   }
`

const RedExit = styled(Exit)`
   path {
      fill: ${theme.palette.red["600"]};
   }
`

const EmptyIcon = styled.span`
   float: left;
   margin-top: 2px !important;
   width: 16px;
   height: 16px;
`

const HelpInfoWrapper = styled(InfoWrapper)`
   margin-top: 20px;
   align-items: flex-start;
`

const CSMInfos = styled.div`
   display: flex;
   flex-direction: column;
   align-items: flex-start;
   width: 100%;
`

const StyledItemSmall = styled(StyledItem)`
   height: 24px;
`

const Footer = styled.div`
   position: fixed;
   bottom: 0;
   right: 0;
   left: 0;
`

const NeedHelpView = ({csmContactInfos}: {csmContactInfos: UserInfos}) => {
   const copyToClipBoard = () => {
      navigator.clipboard.writeText(csmContactInfos.email);
   };

   return (
      <>
         <StyledPreviousItem value={ProfileModalViewsEnum.INITIAL}>Bisogno di aiuto</StyledPreviousItem>
         <StyledSeparator />
         <HelpInfoWrapper>
            <Description>Contatta il tuo CSM</Description>
            <Avatar avatarType="text" size="large" status="available">{csmContactInfos.initials}</Avatar>
            <CSMInfos>
               <NameLabel>{csmContactInfos.fullName}</NameLabel>
               <Description>
                  <a 
                     href={`mailto:${csmContactInfos.email}`}
                  >
                     {csmContactInfos.email}
                  </a>
                  <Button
                     isBasic
                     onClick={copyToClipBoard}
                     size="small"
                     variant="isBasic"
                  >
                     <Button.StartIcon>
                        <Copy />
                     </Button.StartIcon>
                     Copy
                  </Button>   
               </Description>
            </CSMInfos>
         </HelpInfoWrapper>
         <Footer>
            <StyledSeparator />
            {/* TODO: qui agganciare customerly => https://docs.customerly.io/api/is-it-possible-to-open-the-live-chat-directly-from-a-link-or-a-custom-button */}
            <StyledItemSmall value="report-error" onClick={() => {}}>
               <StyledMediaFigure>
                  <StandardInfoFill />
               </StyledMediaFigure>
               <MediaBody>
                  Segnala un problema tecnico
               </MediaBody>
            </StyledItemSmall>
         </Footer>
      </>
   );
};

const SetLanguageView = ({currentLanguage, setCurrentLanguage}: {currentLanguage: Language, setCurrentLanguage: Dispatch<SetStateAction<Language>>}) => (
   <>
      <StyledPreviousItem value={ProfileModalViewsEnum.INITIAL}>Cambia Lingua</StyledPreviousItem>
      <StyledSeparator />
      <StyledItem value={Language.IT} onClick={() => setCurrentLanguage(Language.IT)}>
         <StyledMediaFigure>
            {currentLanguage === Language.IT ? <CheckLg /> : <EmptyIcon />}
         </StyledMediaFigure>
         <MediaBody>
            <Label isRegular={currentLanguage !== Language.IT}>Italiano</Label>
         </MediaBody>
      </StyledItem>
      <StyledItem value={Language.EN} onClick={() => setCurrentLanguage(Language.EN)}>
         <StyledMediaFigure>
            {currentLanguage === Language.EN ? <CheckLg /> : <EmptyIcon />}
         </StyledMediaFigure>
         <MediaBody>
            <Label isRegular={currentLanguage !== Language.EN}>English</Label>
            <ItemMeta>Inglese</ItemMeta>
         </MediaBody>
      </StyledItem>
   </>
);

const MainView = ({userInfos, currentLanguage}: {userInfos: UserInfos, currentLanguage: Language}) => {
   return (
      <>
         <InfoWrapper>
            <CompanyLabel>{userInfos.company}</CompanyLabel>
            <Avatar avatarType="text" size="large" status="available">{userInfos.initials}</Avatar>
            <div>
               <NameLabel>{userInfos.fullName}</NameLabel>
               <Description>{userInfos.email}</Description>
            </div>
         </InfoWrapper>
         <StyledSeparator />
         <StyledItem id="feedback" value="feedback">
            <StyledMediaFigure>
               <GreenThumbsUp />
            </StyledMediaFigure>
            <MediaBody>
               Fornisci un feedback
               <ItemMeta>Aiutaci a migliorare UNGUESS!</ItemMeta>
            </MediaBody>
         </StyledItem>
         <StyledSeparator />
         <StyledNextItem value={ProfileModalViewsEnum.NEED_HELP}>
            <StyledMediaFigure>
               <StandardQuestionMark />
            </StyledMediaFigure>
            <MediaBody>
               Bisogno d'aiuto?
            </MediaBody>
         </StyledNextItem>
         <StyledNextItem value={ProfileModalViewsEnum.CHANGE_LANGUAGE}>
            <StyledMediaFigure>
               <StandardTranslationExists />
            </StyledMediaFigure>
            <MediaBody>
               Cambia lingua
               <ItemMeta>Adesso: {currentLanguage}</ItemMeta>
            </MediaBody>
         </StyledNextItem>
         {/* TODO: aggancia logout */}
         <StyledItem value="logout" onClick={() => {}}>
            <StyledMediaFigure>
               <RedExit />
            </StyledMediaFigure>
            <MediaBody>
               Log out
            </MediaBody>
         </StyledItem>
      </>
   );
};

/**
 * Profile Modal

 * Used for this:
    - Show user main infos and actions

 */
const ProfileModal = (props: PropsWithChildren<ProfileModalArgs>) => {
   const [currentLanguage, setCurrentLanguage] = useState(props.currentLanguage!);

   return (
      <ProfileModalCard isFloating>
         {props.tempSelectedItem === ProfileModalViewsEnum.NEED_HELP &&
            <NeedHelpView csmContactInfos={props.csmContactInfos} />
         }
         {props.tempSelectedItem === ProfileModalViewsEnum.CHANGE_LANGUAGE &&
            <SetLanguageView currentLanguage={currentLanguage} setCurrentLanguage={setCurrentLanguage}/>
         }
         {(!props.tempSelectedItem || props.tempSelectedItem === ProfileModalViewsEnum.INITIAL) &&
            <MainView userInfos={props.userInfos} currentLanguage={currentLanguage} />
         }
      </ProfileModalCard>
   );
};

export { ProfileModal };
    
