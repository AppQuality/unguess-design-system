import { MenuItem, MenuItemBody } from "./menuItem";

import { ReactComponent as CheckIcon } from "../../assets/icons/check-lg.svg";
import { ReactComponent as EmptyIcon } from "../../assets/icons/empty.svg";
import { ReactComponent as TranslationIcon } from "../../assets/icons/translation-exists.svg";
import { PreviousButton } from "./previousMenuButton";
import { Separator } from "../dropdowns/menu";
import { MD } from "../typography/typescale";
import styled from "styled-components";
import { theme } from "../theme";
import { flexStart } from "../theme/mixins";
import { Button } from "../buttons/button";
import { Language, MenuItemProps } from "./_types";
import { Span } from "../typography/span";

interface LanguagesProps extends MenuItemProps {
  title: string;
  value: string;
  languages: { [key: string]: Language };
  currentLanguage: string;
  currentLanguageLabel?: string;
  onSelectLanguage: (lang: string) => void;
}


const StyledBody = styled.div`
  margin: ${({ theme }) => theme.space.base * 6}px
    ${({ theme }) => theme.space.base * 4}px;
`;

const StyledButtonContainer = styled.div`
  ${flexStart}
  & button { 
    justify-content: flex-start;
  }
`;

const StyledButton = styled(Button)`
  ${props => `
  &:hover,
  &:focus,
  &:active {
    background-color: ${props.theme.palette.blue[50]};
    color: ${props.isDanger ? props.theme.palette.red[500] : props.theme.palette.grey[800]};
  }`};
`; 

export const LanguageItem = (props: LanguagesProps) => {

  const content = (
    <>
      <PreviousButton onClick={() => props.setActive("")} isBasic>
        {props.title}
      </PreviousButton>
      <Separator />
      <StyledBody>
        <StyledButtonContainer>
          {Object.keys(props.languages).map((key) => (
            <StyledButton
              isBasic
              isStretched
              value={key}
              onClick={() => props.onSelectLanguage(key)}
            >
              <StyledButton.StartIcon>
                {props.currentLanguage === key ? <CheckIcon /> : <EmptyIcon />}
              </StyledButton.StartIcon>
              <Span isBold={props.currentLanguage === key}>{props.languages[key].label}</Span>
            </StyledButton>
          ))}
        </StyledButtonContainer>
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
        icon={<TranslationIcon fill={theme.palette.blue[600]} />}
      >
        <MenuItemBody>
          {props.title}
          <MD style={{ color: theme.palette.grey[600] }}>
            {props.currentLanguageLabel ?? "Now:"}
            { " " + props.languages[props.currentLanguage].label}
          </MD>
        </MenuItemBody>
      </MenuItem>
    </>
  );
};
