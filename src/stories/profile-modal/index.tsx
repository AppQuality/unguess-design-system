import { PropsWithChildren } from "react";
import styled from "styled-components";
import { Avatar } from "../avatar";
import { Card } from "../cards";
import { Item } from "../dropdowns/item";
import { ItemMeta, MediaBody, MediaFigure, MediaItem, NextItem, PreviousItem, Separator } from "../dropdowns/menu";
import { Label } from "../label";
import { theme } from "../theme";
import { ReactComponent as LeafIcon } from "../../assets/icons/leaf-stroke.svg";
import { ReactComponent as ThumbsUp } from "../../assets/icons/thumbs-up.svg";
import { ReactComponent as QuestionMark } from "../../assets/icons/question-mark.svg";
import { ReactComponent as TranslationExists } from "../../assets/icons/translation-exists.svg";
import { ReactComponent as Exit } from "../../assets/icons/exit.svg";
import { ProfileModalArgs } from "./_types";

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

const StyledMediaItem = styled(MediaItem)`
   width: -webkit-fill-available;
`

// const UgItem = (props: any) => (

// )

const InfoWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: space-between;

   padding: 8px 0px 0px;

   position: static;
   height: 143px;

   flex: none;
   order: 0;
   align-self: stretch;
   flex-grow: 0;
   margin-bottom: 24px;
`

const CompanyLabel = styled(Label)`
   font-family: 'Poppins';
   font-style: normal;
   font-weight: 600;
   font-size: 12px;
   line-height: 16px;

   display: flex;
   align-items: center;
   text-align: center;
   letter-spacing: -0.000427656px;
`

const NameLabel = styled(Label)`
   font-family: 'Poppins';
   font-style: normal;
   font-weight: 600;
   font-size: 14px;
   line-height: 20px;

   display: flex;
   align-items: center;
   text-align: center;
   letter-spacing: -0.154px;

   margin: 2px 0px;
`

const Description = styled.div`
   font-family: 'Poppins';
   font-style: normal;
   font-weight: 400;
   font-size: 12px;
   line-height: 140%;

   text-align: center;

   color: ${theme.palette.grey["600"]};

   margin: 2px 0px;
`

const StyledMediaFigure = styled(MediaFigure)`
   margin-right: 4px;
`

/**
 * Profile Modal

 * Used for this:
    - Show user main infos and actions

 */
const ProfileModal = (props: PropsWithChildren<ProfileModalArgs>) => (
   <ProfileModalCard isFloating>
      {props.tempSelectedItem === 'need-help' &&
         <>
            <StyledPreviousItem value="initial">Bisogno di aiuto</StyledPreviousItem>
            <StyledSeparator />
            <InfoWrapper>
               <Description>Contatta il tuo CSM</Description>
               <Avatar avatarType="text" size="large" status="available">GP</Avatar>
               <div>
                  <NameLabel>Gianluca Peretti</NameLabel>
                  <Description>gianluca.peretti@unguess.io</Description>
               </div>
            </InfoWrapper>
         </>
      }
      {props.tempSelectedItem === 'change-language' &&
         <>
            <StyledPreviousItem value="initial">Cambia Lingua</StyledPreviousItem>
            <StyledSeparator />
            <StyledItem value="it">Italiano</StyledItem>
            <StyledItem value="en">English</StyledItem>
         </>
      }
      {(!props.tempSelectedItem || props.tempSelectedItem === 'initial') &&
         <>
            <InfoWrapper>
               <CompanyLabel>ENEL</CompanyLabel>
               <Avatar avatarType="text" size="large" status="available">MM</Avatar>
               <div>
                  <NameLabel>Martino Martinelli</NameLabel>
                  <Description>m.martinelli@enel.com</Description>
               </div>
            </InfoWrapper>
            <StyledSeparator />
            <StyledItem id="feedback" value="feedback">
               <StyledMediaFigure>
                  <ThumbsUp />
               </StyledMediaFigure>
               <MediaBody>
                  Fornisci un feedback
                  <ItemMeta>Aiutaci a migliorare UNGUESS!</ItemMeta>
                  </MediaBody>
            </StyledItem>
            <StyledSeparator />
            <StyledNextItem value="need-help">
               <StyledMediaFigure>
                  <QuestionMark />
               </StyledMediaFigure>
               <MediaBody>
                  Bisogno d'aiuto?
               </MediaBody>
            </StyledNextItem>
            <StyledNextItem value="change-language">
               <StyledMediaFigure>
                  <TranslationExists />
               </StyledMediaFigure>
               <MediaBody>
               Cambia lingua
               <ItemMeta>Adesso: Italiano</ItemMeta>
               </MediaBody>
            </StyledNextItem>
            <StyledItem value="logout">
               <StyledMediaFigure>
                  <Exit />
               </StyledMediaFigure>
               <MediaBody>
                  Log out
               </MediaBody>
            </StyledItem>
         </>
      }
   </ProfileModalCard>
);

export { ProfileModal };
    
