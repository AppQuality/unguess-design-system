import styled from "styled-components";
import { Modal } from "../modals";
import { UserMenu } from "./userMenu";
import { ProfileModalArgs } from "./_types";
import useWindowSize from "../../hooks/useWindowSize";
import { theme } from "../theme";

const StyledModal = styled(Modal)`
  margin: 0;
  left: auto;
  right: auto;
  top: auto;
  bottom: auto;

  max-height: calc(100vh - ${({ theme }) => theme.space.xxl});

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    margin-top: calc(
      ${({ theme }) => `${theme.components.chrome.header.height} - ${theme.space.xs}`}
    );
    margin-right: ${({ theme }) => theme.space.base * 3}px;
  }
`;

const StyledBody = styled(Modal.Body)`
  margin: ${({ theme }) => theme.space.xxs + " " + theme.space.xs};
  padding: 0;
`;

const backDropStyle = {
  backgroundColor: "transparent",
  alignItems: "start",
  justifyContent: "end",
};

/**
 * Profile Modal

 * Used for this:
    - Show user main infos and actions

 */
const ProfileModal = ({ menuArgs, ...args }: ProfileModalArgs) => {
  const { width } = useWindowSize();

  const smBreakpoint = parseInt(theme.breakpoints.sm);

  let backDrop = {
    style: {
      ...(width > smBreakpoint && { ...backDropStyle }),
    },
  };

  return (
    <StyledModal {...args} style={{ width: "300px" }} backdropProps={backDrop}>
      <StyledBody>
        <UserMenu {...menuArgs} />
      </StyledBody>
    </StyledModal>
  );
};

export { ProfileModal };
