import { MenuItem } from "./menuItem";
import { ReactComponent as QuestionMark } from "../../assets/icons/question-mark.svg";
import { ReactComponent as CopyIcon } from "../../assets/icons/copy.svg";
import { ReactComponent as InfoFill } from "../../assets/icons/info-fill.svg";
import { PreviousButton } from "./previousMenuButton";
import { Separator } from "../dropdowns/menu";
import { Paragraph } from "../typography/paragraph";
import { MD, SM } from "../typography/typescale";
import { Avatar } from "../avatar";
import styled from "styled-components";
import { theme } from "../theme";
import { flexCenter } from "../theme/mixins";
import { Button } from "../buttons/button";
import { Anchor } from "../buttons/anchor";
import { MenuItemProps } from "./_types";
import { getInitials } from "./utils";
import { getColor } from "../theme/utils";

interface HelpItemProps extends MenuItemProps {
  title: string;
  value: string;
  contactLabel: string;
  copyLabel?: string;
  chatSupportLabel?: string;
  /** Toggle Chat https://docs.customerly.io/api/is-it-possible-to-open-the-live-chat-directly-from-a-link-or-a-custom-button */
  toggleChat: () => void;
  csm: {
    name: string;
    email: string;
    picture?: string;
  };
  onCopyEmail?: () => void;
  chatSupport?: boolean;
}

const StyledButton = styled(Button)`
  ${(props) => `
  &:hover,
  &:focus,
  &:active {
    background-color: ${getColor(props.theme.colors.primaryHue, 600, undefined, 0.08)};
    color: ${
      props.isDanger
        ? props.theme.palette.red[500]
        : props.theme.palette.grey[800]
    };
  }`};
`;

const StyledFooterButton = styled(StyledButton)`
  color: ${(props) => props.theme.palette.grey[800]};
  padding-left: 0;
  justify-content: flex-start;
`;

const StyledBody = styled.div`
  margin: ${({ theme }) => theme.space.base * 6}px
    ${({ theme }) => theme.space.base * 4}px;
`;

const StyledParagraph = styled(Paragraph)`
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;

const Footer = styled.div`
  margin-top: auto;
`;

const Description = styled.div`
  ${flexCenter}
  justify-content: space-between;
  text-align: left;
  width: 100%;
  font-weight: ${theme.fontWeights.regular};
  font-size: ${theme.fontSizes.sm};
  line-height: 140%;
  color: ${theme.palette.grey["600"]};
  margin: 2px 0px;
`;

export const HelpItem = (props: HelpItemProps) => {
  const { csm } = props;
  const { email } = csm;

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(props.csm.email);
  };

  let csmEmailCut = email;
  if (email.length > 24) {
    csmEmailCut = `${email.substring(0, 21)}...`;
  }

  const content = (
    <>
      <PreviousButton onClick={() => props.setActive("")} isBasic>
        {props.title}
      </PreviousButton>
      <Separator />
      <StyledBody>
        <Paragraph style={{ color: theme.palette.grey[600] }}>
          <SM>{props.contactLabel}</SM>
        </Paragraph>
        <StyledParagraph>
          <Avatar
            children={props.csm.picture ?? getInitials(props.csm.name)}
            avatarType={props.csm.picture ? "image" : "text"}
            size={"large"}
          />
        </StyledParagraph>

        <StyledParagraph>
          <MD isBold>{props.csm.name}</MD>
          <Description>
            <Anchor
              href={`mailto:${props.csm.email}`}
              style={{ color: theme.palette.grey[600] }}
            >
              {csmEmailCut}
            </Anchor>
            <StyledButton
              isBasic
              onClick={() => {
                copyToClipBoard();
                props.onCopyEmail?.();
              }}
              size="small"
              variant="isBasic"
            >
              <StyledButton.StartIcon>
                <CopyIcon />
              </StyledButton.StartIcon>
              {props.copyLabel ?? "Copy"}
            </StyledButton>
          </Description>
        </StyledParagraph>
      </StyledBody>

      {props.chatSupport && (
        <Footer>
        <Separator />
        {/* TODO: qui agganciare customerly => https://docs.customerly.io/api/is-it-possible-to-open-the-live-chat-directly-from-a-link-or-a-custom-button */}
        <StyledFooterButton
          isStretched
          isBasic
          onClick={props.toggleChat}
          style={{ paddingLeft: theme.space.xxs }}
        >
          <StyledFooterButton.StartIcon>
            <InfoFill color={theme.palette.blue[600]} />
          </StyledFooterButton.StartIcon>
          {props.chatSupportLabel ?? "Report a technical issue"}
        </StyledFooterButton>
      </Footer>
      )}
    </>
  );

  return (
    <>
      <MenuItem
        content={content}
        value={props.value}
        selectedItem={props.selectedItem}
        setActive={props.setActive}
        icon={<QuestionMark color={theme.palette.blue[600]} />}
      >
        {props.title}
      </MenuItem>
    </>
  );
};
