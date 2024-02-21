import { Paragraph } from "@zendeskgarden/react-notifications";
import { MenuItemProps } from "../_types";
import { PreviousButton } from "../components/previousMenuButton";
import { ReactComponent as GearIcon } from "../../../assets/icons/gear-fill.svg";
import styled from "styled-components";
import { Separator } from "../../dropdowns/menu";
import { Toggle } from "../../forms/toggle";
import { MenuItem } from "../components/menuItem";
import { theme } from "../../theme";
import { Field } from "../../forms/field";
import { Label } from "../../label";
import { useState } from "react";

interface SettingsProps extends MenuItemProps {
    settingValue?: number;
    settingsTitle?: string;
    settingsIntroText?: string;
    settingsOutroText?: string;
    onSetSettings?: React.ChangeEventHandler<HTMLInputElement>;
}

const StyledBody = styled.div`
  margin: ${({ theme }) => theme.space.base * 6}px
    ${({ theme }) => theme.space.base * 4}px;
`;

export const SettingsItem = (props: SettingsProps) => {
    const [value, setValue] = useState(props.settingValue || 0);
    
    const content = (
        <>
            <PreviousButton onClick={() => props.setActive("")} isBasic>
                {props.title}
            </PreviousButton>
            <Separator />
            <StyledBody>
                {props.settingsIntroText && <Paragraph>{props.settingsIntroText}</Paragraph>}
                <Field>
                    <Toggle 
                        checked={value === 1}
                        onChange={(e) => {
                            props.onSetSettings?.(e);
                            setValue(value === 1 ? 0 : 1);
                        }
                    }>
                        <Label>{props.settingValue}</Label>
                    </Toggle>
                </Field>
                {props.settingsOutroText && <Paragraph>{props.settingsOutroText}</Paragraph>}
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
            {props.title}
          </MenuItem>
        </>
      );
};