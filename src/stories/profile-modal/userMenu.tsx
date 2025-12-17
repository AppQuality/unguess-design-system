import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import { ReactComponent as LockIcon } from "../../assets/icons/lock-locked-fill.svg";
import { ReactComponent as ThumbsUp } from "../../assets/icons/thumbs-up.svg";
import { ReactComponent as UserIcon } from "../../assets/icons/user-fill.svg";
import { Separator } from "../dropdowns/menu";
import { theme } from "../theme";
import { MD } from "../typography/typescale";
import { MenuItem, MenuItemBody } from "./components/menuItem";
import { UserContainer } from "./components/UserContainer";
import { HelpItem } from "./items/helpMenuItem";
import { LanguageItem } from "./items/languageMenuItem";
import { UserMenuArgs } from "./_types";

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
`;

export const UserMenu = (props: UserMenuArgs) => {
  const [item, setActiveItem] = useState("");

  const disableMenuLanguageSettings =
    props.disableMenuLanguageSettings || false;

  const toggleItem = (item: string) => {
    setActiveItem(item);
  };

  return (
    <>
      {item === "" && <UserContainer {...props.user} />}
      <StyledList>
        {item === "" && props.onFeedbackClick && <Separator />}
        {props.onFeedbackClick && (
          <MenuItem
            value={"feedback"}
            selectedItem={item}
            icon={<ThumbsUp />}
            setActive={() =>
              props.onFeedbackClick
                ? props.onFeedbackClick()
                : console.log("feedback fired")
            }
          >
            <MenuItemBody>
              {props.feedbackTitle || "Give us your feedback"}
              <MD style={{ color: theme.palette.grey[600] }}>
                {props.feedbackSubTitle || "Help us improve UNGUESS!"}
              </MD>
            </MenuItemBody>
          </MenuItem>
        )}
        {item === "" && <Separator />}

        <MenuItem
          value={"profile"}
          selectedItem={item}
          icon={<UserIcon color={theme.palette.blue[600]} />}
          setActive={() => props?.profile?.onClick()}
        >
          {props?.profile?.title || "Edit Profile"}
        </MenuItem>

        <HelpItem
          value={"csm"}
          selectedItem={item}
          setActive={(i) => toggleItem(i)}
          title={props.csmTitle || "Need Help?"}
          contactLabel={props.csmContactLabel || "Contact your CSM"}
          csm={props.csm}
          toggleChat={props.onToggleChat}
          chatSupportLabel={props?.chatSupportLabel}
          copyLabel={props?.copyLabel}
          onCopyEmail={props?.onCopyEmail}
          chatSupport={props?.chatSupport}
        />
        {
          <LanguageItem
            disabled={disableMenuLanguageSettings}
            title={props.languageTitle || "Change Language"}
            value={"language-selector"}
            selectedItem={item}
            setActive={(i) => toggleItem(i)}
            languages={props.languages}
            currentLanguage={props.currentLanguage}
            currentLanguageLabel={props.currentLanguageLabel}
            onSelectLanguage={(lang) => props.onSelectLanguage(lang)}
          />
        }
        <MenuItem
          value={"privacy"}
          selectedItem={item}
          icon={<LockIcon color={theme.palette.blue[600]} />}
          setActive={() => {
            if (document.querySelector(".iubenda-cs-preferences-link")) {
              const iubendaBtn: HTMLElement | null = document.querySelector(
                ".iubenda-cs-preferences-link"
              );

              if (iubendaBtn) {
                iubendaBtn.click();
              }
            }
          }}
        >
          {props.privacy?.title || "Privacy settings"}
        </MenuItem>

        <MenuItem
          value={"logout"}
          selectedItem={item}
          icon={<ExitIcon color={theme.palette.red[600]} />}
          setActive={() => props.onLogout()}
        >
          {props.logoutTitle || "Log out"}
        </MenuItem>
      </StyledList>
    </>
  );
};
