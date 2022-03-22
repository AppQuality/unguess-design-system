import React from "react";
import { Modal, Header, Body, Footer } from "@zendeskgarden/react-modals";
import styled from "styled-components";
import { ModalArgs } from "./_types";
import { Button } from "../buttons/button";
import { LG } from "@zendeskgarden/react-typography";
import {ReactComponent as CloseIcon} from "@zendeskgarden/svg-icons/src/16/x-stroke.svg";
import {ReactComponent as AlertIcon} from "@zendeskgarden/svg-icons/src/16/check-circle-stroke.svg";
import { MD } from "../typography/typescale";

const HeaderWrapper = styled(Header)`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const Title = styled(MD)`
  font-weight: bold;
`

const ModalWrapper = styled(Modal)`
  color: #2f3941;
`

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  color: #68737d;
`

const DangerIcon = styled(AlertIcon)``

const BodyContent = styled(LG)`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.154px;
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

  const dangerStyles = {
    buttonStyle:
      { backgroundColor: "#D53032", color: "white", margin: "10px" },
    titleStyle:
      { width: '100%', marginLeft: '0.5vw', color: '#D53032'} }
  const defaultStyles = { backgroundColor: '#003A57', margin: "10px" }

  if(open)
    return <ModalWrapper isLarge={isLarge}>
      <HeaderWrapper>
        {isDanger && <DangerIcon />}
        <Title style={isDanger ? dangerStyles.titleStyle : {}}>{title}</Title>
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
        <Button
          isPrimary
          style={isDanger ? dangerStyles.buttonStyle : defaultStyles}
          onClick={onConfirm}
        >
          {confirmText}
        </Button>
      </Footer>
    </ModalWrapper>
  return <></>
}

export {StyledModal}