import { Paragraph } from "@zendeskgarden/react-notifications";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as GearIcon } from "../../../assets/icons/gear-fill.svg";
import { Separator } from "../../dropdowns/menu";
import { FormField as Field } from "../../forms/field";
import { Toggle } from "../../forms/toggle";
import { Label } from "../../label";
import { theme } from "../../theme";
import { MD, SM } from "../../typography/typescale";
import { MenuItemProps } from "../_types";
import { MenuItem } from "../components/menuItem";
import { PreviousButton } from "../components/previousMenuButton";

interface SettingsProps extends MenuItemProps {
  settingValue?: string;

  onSetSettings?: (value: string) => void;
  i18n?: {
    settingsTitle?: string;
    settingsIntroText?: string;
    settingsOutroText?: {
      paragraph_1?: string;
      paragraph_2?: string;
      paragraph_3?: string;
    };
    settingsToggle?: {
      title: string;
      on: string;
      off: string;
    };
  };
}

const StyledBody = styled.div`
  margin: ${({ theme }) => theme.space.base * 6}px
    ${({ theme }) => theme.space.base * 4}px;
`;

const TriggerTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.blue[700]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const SettingsIntroText = styled(Paragraph)`
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const SettingsOutroText = styled(Paragraph)`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.space.md};
`;

export const SettingsItem = (props: SettingsProps) => {
  const [value, setValue] = useState(props.settingValue || "0");

  const onToggleSettings = (value: string) => {
    setValue(value);
    props.onSetSettings && props.onSetSettings(value);
  };

  const content = (
    <>
      <PreviousButton onClick={() => props.setActive("")} isBasic>
        {props.i18n?.settingsTitle}
      </PreviousButton>
      <Separator />
      <StyledBody>
        {props.i18n && props.i18n.settingsIntroText && (
          <SettingsIntroText>
            <SM>{props.i18n.settingsIntroText}</SM>
          </SettingsIntroText>
        )}
        <Field>
          <TriggerTitle isBold>
            {props.i18n?.settingsToggle?.title}
          </TriggerTitle>
          <Toggle
            checked={value === "1"}
            onChange={() => onToggleSettings(value === "1" ? "0" : "1")}
          >
            <Label>
              {value === "1"
                ? props.i18n?.settingsToggle?.on
                : props.i18n?.settingsToggle?.off}
            </Label>
          </Toggle>
        </Field>
        {props.i18n && props.i18n.settingsOutroText && (
          <>
            <SettingsOutroText>
              <SM>{props.i18n.settingsOutroText.paragraph_1}</SM>
              <SM>{props.i18n.settingsOutroText.paragraph_2}</SM>
            </SettingsOutroText>
            <SettingsOutroText>
              <SM>{props.i18n.settingsOutroText.paragraph_3}</SM>
            </SettingsOutroText>
          </>
        )}
      </StyledBody>
    </>
  );

  return (
    <>
      <MenuItem
        content={content}
        value={props.value}
        selectedItem={props.selectedItem}
        setActive={props.setActive}
        icon={<GearIcon color={theme.palette.blue[600]} />}
      >
        {props.i18n?.settingsTitle}
      </MenuItem>
    </>
  );
};
