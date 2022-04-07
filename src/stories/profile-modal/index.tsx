import styled from "styled-components";
import { Modal } from "../modals";
import { UserMenu } from "./userMenu";
import { ProfileModalArgs } from "./_types";

const StyledBody = styled(Modal.Body)`
  margin: ${({ theme }) => theme.space.base * 4 + "px " + theme.space.xs};
  padding: 0;
`;

/**
 * Profile Modal

 * Used for this:
    - Show user main infos and actions

 */
const ProfileModal = ({ menuArgs, ...args }: ProfileModalArgs) => {
  return (
    <Modal {...args} style={{ width: "300px" }}>
      <StyledBody>
        <UserMenu {...menuArgs} />
      </StyledBody>
    </Modal>
  );
};

export { ProfileModal };
