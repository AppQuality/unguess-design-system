import React from "react";
import { Modal, Header, Body, Footer } from "@zendeskgarden/react-modals";
import styled from "styled-components";
import { ModalArgs } from "./_types";
import { Button } from "../buttons/button";
import { LG } from "../typography/typescale";
import {ReactComponent as CloseIcon} from "@zendeskgarden/svg-icons/src/16/x-stroke.svg";
import {ReactComponent as AlertIcon} from "@zendeskgarden/svg-icons/src/16/alert-error-stroke.svg";
import { MD } from "../typography/typescale";
import { theme } from "../theme";

const getHeaderWrapper = (isDanger?: boolean) => styled(Header)`
  font-style: normal;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${isDanger ? 'padding-left: 1rem;' : ''}
`

const getTitle = (isDanger?: boolean) => styled(MD)`
  font-weight: bold;
  font-size: ${theme.fontSizes.md}
  ${isDanger ? 'width: 100%; margin-left: 0.5rem; color:'+ theme.palette.red["600"] : ''}
`

const ModalWrapper = styled(Modal)`
  color: #2f3941;
`

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  color: #68737d;
`
const getButton = (isDanger?: boolean) => styled(Button)`
  ${isDanger ? 'background-color:'+ theme.palette.red["600"] + '; color:'+ theme.palette.white + ' ; margin: 10px': 'background-color: ' + theme.palette.blue["600"] +'; margin: 10px'}
`

const DangerIcon = styled(AlertIcon)``

const BodyContent = styled(LG)`
  font-style: normal;
  font-weight: 400;
  font-size: ${theme.fontSizes.md}
`


const StyledModal = (props: ModalArgs) => {

  const {
    isDanger,
    isLarge,
    title,
    customContent,
    content,
    cancelText,
    confirmText,
    onCancel,
    onConfirm,
    onClose,
    open
  } = props

  const HeaderWrapper = getHeaderWrapper(isDanger);
  const Title = getTitle(isDanger)
  const ConfirmButton = getButton(isDanger)

  if(open)
    return <ModalWrapper isLarge={isLarge}>
      <HeaderWrapper>
        {isDanger && <DangerIcon />}
        <Title>{title}</Title>
        <CloseButton onClick={onClose} />
      </HeaderWrapper>
      <Body>
        <BodyContent>
        {content}
        {customContent}
        </BodyContent>
      </Body>
      <Footer>
        <Button
          isBasic
          onClick={onCancel}>{cancelText}</Button>
        <ConfirmButton
          isPrimary
          onClick={onConfirm}
        >
          {confirmText}
        </ConfirmButton>
      </Footer>
    </ModalWrapper>
  return <></>
}

export {StyledModal}