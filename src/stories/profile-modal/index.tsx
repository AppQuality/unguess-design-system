import { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import styled, { css } from "styled-components";
import { Avatar } from "../avatar";
import { Card } from "../cards";
import { Item } from "../dropdowns/item";
import {
  ItemMeta,
  MediaBody,
  MediaFigure,
  NextItem,
  PreviousItem,
  Separator,
} from "../dropdowns/menu";
import { Label } from "../label";
import { theme } from "../theme";
import { ReactComponent as ThumbsUp } from "../../assets/icons/thumbs-up.svg";
import { ReactComponent as QuestionMark } from "../../assets/icons/question-mark.svg";
import { ReactComponent as TranslationExists } from "../../assets/icons/translation-exists.svg";
import { ReactComponent as Exit } from "../../assets/icons/exit.svg";
import { ReactComponent as CheckLg } from "../../assets/icons/check-lg.svg";
import { ReactComponent as Copy } from "../../assets/icons/copy.svg";
import { ReactComponent as InfoFill } from "../../assets/icons/info-fill.svg";
import { ProfileModalArgs, UserInfos } from "./_types";
import { Button } from "../buttons/button";
import { flexCenter, flexColumnCenter, flexStart } from "../theme/mixins";

const ProfileModalCard = styled(Card)`
  ${flexColumnCenter}
  padding: ${`${4 * theme.space.base}px`} ${theme.space.xs} ${theme.space.xs};

  position: relative;
  width: 296px;
  height: 437px;

  box-shadow: ${theme.shadows.lg("16px", "48px", "rgba(0, 0, 0, 0.176)")};
  border-radius: ${theme.borderRadii.lg};
`;

// Main section
const CompanyLabel = styled(Label)`
  font-size: ${theme.fontSizes.sm};
  line-height: ${theme.lineHeights.sm};

  ${flexCenter}
  text-align: center;
  letter-spacing: -0.000427656px;
`;

const InfoWrapper = styled.div`
  ${flexColumnCenter}
  justify-content: space-between;

  padding: ${theme.space.xs} ${theme.space.xs} 0px;

  position: static;
  height: 143px;

  flex: none;
  align-self: stretch;
  margin-bottom: ${`${6 * theme.space.base}px`};
`;

const NameLabel = styled(Label)`
  font-size: ${theme.fontSizes.md};
  line-height: ${theme.lineHeights.md};

  ${flexCenter}
  text-align: center;
  justify-content: center;
  letter-spacing: -0.154px;

  margin: 2px 0px;
`;

const Description = styled.div`
  ${flexCenter}
  justify-content: space-between;
  text-align: center;
  width: 100%;
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.sm};
  line-height: 140%;
  color: ${theme.palette.grey["600"]};
  margin: 2px 0px;

  a {
    color: ${theme.palette.grey["600"]};
  }
`;

// Menu nested Items
const itemCommons = css`
  width: -webkit-fill-available;
  height: 52px;
  ${flexCenter}
  padding: ${theme.space.xs} ${theme.space.md};
`;
const StyledItem = styled(Item)`
  ${itemCommons}
`;
const StyledPreviousItem = styled(PreviousItem)`
  width: -webkit-fill-available;
  ${flexCenter}
`;
const StyledNextItem = styled(NextItem)`
  ${itemCommons}

  div:first-child {
    height: 52px;
    padding: ${theme.space.xxs} 0;
  }
`;

const StyledSeparator = styled(Separator)`
  width: 100%;
`;

interface Prippo {
  fill: string;
}
const StyledMediaFigure = styled(MediaFigure).attrs((props: Prippo) => ({
  fill: props.fill,
}))`
  margin-right: ${theme.space.xxs};

  path {
    fill: ${(props) => theme.palette["blue"]["600"]};
  }
`;

const EmptyIcon = styled.span`
  float: left;
  margin-top: 2px !important;
  width: ${theme.iconSizes.md};
  height: ${theme.iconSizes.md};
`;

// Help Section
const HelpInfoWrapper = styled(InfoWrapper)`
  margin-top: ${theme.space.md};
  align-items: flex-start;
`;

const CSMInfos = styled.div`
  ${flexStart}
  width: 100%;
`;

const StyledItemSmall = styled(StyledItem)`
  height: 24px;
`;

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
`;

const NeedHelpView = ({ csmContactInfos }: { csmContactInfos: UserInfos }) => {
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(csmContactInfos.email);
  };

  return (
    <>
      <StyledPreviousItem value={"initial"}>
        Bisogno di aiuto
      </StyledPreviousItem>
      <StyledSeparator />
      <HelpInfoWrapper>
        <Description>Contatta il tuo CSM</Description>
        <Avatar avatarType="text" size="large" status="available">
          {csmContactInfos.initials}
        </Avatar>
        <CSMInfos>
          <NameLabel>{csmContactInfos.fullName}</NameLabel>
          <Description>
            <a href={`mailto:${csmContactInfos.email}`}>
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
            <InfoFill />
          </StyledMediaFigure>
          <MediaBody>Segnala un problema tecnico</MediaBody>
        </StyledItemSmall>
      </Footer>
    </>
  );
};

const SetLanguageView = ({
  currentLanguage,
  setCurrentLanguage,
}: {
  currentLanguage: string;
  setCurrentLanguage: Dispatch<SetStateAction<"EN" | "IT">>;
}) => (
  <>
    <StyledPreviousItem value={"initial"}>Cambia Lingua</StyledPreviousItem>
    <StyledSeparator />
    <StyledItem value="IT" onClick={() => setCurrentLanguage("IT")}>
      <StyledMediaFigure>
        {currentLanguage === "IT" ? <CheckLg /> : <EmptyIcon />}
      </StyledMediaFigure>
      <MediaBody>
        <Label isRegular={currentLanguage !== "IT"}>Italiano</Label>
      </MediaBody>
    </StyledItem>
    <StyledItem value="EN" onClick={() => setCurrentLanguage("EN")}>
      <StyledMediaFigure>
        {currentLanguage === "EN" ? <CheckLg /> : <EmptyIcon />}
      </StyledMediaFigure>
      <MediaBody>
        <Label isRegular={currentLanguage !== "EN"}>English</Label>
        <ItemMeta>Inglese</ItemMeta>
      </MediaBody>
    </StyledItem>
  </>
);

const MainView = ({
  userInfos,
  currentLanguage,
}: {
  userInfos: UserInfos;
  currentLanguage: string;
}) => {
  return (
    <>
      <InfoWrapper>
        <CompanyLabel>{userInfos.company}</CompanyLabel>
        <Avatar avatarType="text" size="large" status="available">
          {userInfos.initials}
        </Avatar>
        <div>
          <NameLabel>{userInfos.fullName}</NameLabel>
          <Description>{userInfos.email}</Description>
        </div>
      </InfoWrapper>
      <StyledSeparator />
      <StyledItem id="feedback" value="feedback">
        <StyledMediaFigure fill="kale">
          <ThumbsUp />
        </StyledMediaFigure>
        <MediaBody>
          Fornisci un feedback
          <ItemMeta>Aiutaci a migliorare UNGUESS!</ItemMeta>
        </MediaBody>
      </StyledItem>
      <StyledSeparator />
      <StyledNextItem value={"need-help"}>
        <StyledMediaFigure>
          <QuestionMark />
        </StyledMediaFigure>
        <MediaBody>Bisogno d'aiuto?</MediaBody>
      </StyledNextItem>
      <StyledNextItem value={"change-language"}>
        <StyledMediaFigure>
          <TranslationExists />
        </StyledMediaFigure>
        <MediaBody>
          Cambia lingua
          <ItemMeta>
            Adesso: {currentLanguage === "IT" ? "Italiano" : "Inglese"}
          </ItemMeta>
        </MediaBody>
      </StyledNextItem>
      {/* TODO: aggancia logout */}
      <StyledItem value="logout" onClick={() => {}}>
        <StyledMediaFigure fill="red">
          <Exit />
        </StyledMediaFigure>
        <MediaBody>Log out</MediaBody>
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
  const [currentLanguage, setCurrentLanguage] = useState(
    props.currentLanguage!
  );

  return (
    <ProfileModalCard isFloating>
      {props.tempSelectedItem === "need-help" && (
        <NeedHelpView csmContactInfos={props.csmContactInfos} />
      )}
      {props.tempSelectedItem === "change-language" && (
        <SetLanguageView
          currentLanguage={currentLanguage}
          setCurrentLanguage={setCurrentLanguage}
        />
      )}
      {(!props.tempSelectedItem || props.tempSelectedItem === "initial") && (
        <MainView
          userInfos={props.userInfos}
          currentLanguage={currentLanguage}
        />
      )}
    </ProfileModalCard>
  );
};

export { ProfileModal };
