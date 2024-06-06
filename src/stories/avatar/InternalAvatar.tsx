import styled from "styled-components";
import LogoIcon from "../../assets/logo-icon.svg";

const StyledInternalAvatar = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const InternalAvatar = () => {
  return (
    <StyledInternalAvatar>
      <img alt="avatar" src={LogoIcon} />
    </StyledInternalAvatar>
  );
};

export default InternalAvatar;
