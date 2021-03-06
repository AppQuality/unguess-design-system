import { useState } from "react";
import { UserMenuArgs } from "./_types";
import { ReactComponent as ExitIcon } from "../../assets/icons/exit.svg";
import { ReactComponent as ThumbsUp } from "../../assets/icons/thumbs-up.svg";
import { MenuItem, MenuItemBody } from "./menuItem";
import styled from "styled-components";
import { HelpItem } from "./helpMenuItem";
import { LanguageItem } from "./languageMenuItem";
import { theme } from "../theme";
import { Separator } from "../dropdowns/menu";
import { MD } from "../typography/typescale";
import { UserContainer } from "./UserContainer";

const StyledList = styled.ul`
  padding: 0;
  margin: 0;
`;

export const UserMenu = (props: UserMenuArgs) => {
  const [item, setActiveItem] = useState("");

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
            selectedItem={item}
            icon={<ThumbsUp />}
            setActive={() => props.onFeedbackClick ? props.onFeedbackClick() : console.log("feedback fired")}
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
        />
        <LanguageItem
          title={props.languageTitle || "Change Language"}
          value={"language-selector"}
          selectedItem={item}
          setActive={(i) => toggleItem(i)}
          languages={props.languages}
          currentLanguage={props.currentLanguage}
          currentLanguageLabel={props.currentLanguageLabel}
          onSelectLanguage={(lang) => props.onSelectLanguage(lang)}
        />

        <MenuItem
          selectedItem={item}
          icon={<ExitIcon fill={theme.palette.red[600]} />}
          setActive={() => props.onLogout()}
        >
          {props.logoutTitle || "Log out"}
        </MenuItem>
      </StyledList>
    </>
  );
};
