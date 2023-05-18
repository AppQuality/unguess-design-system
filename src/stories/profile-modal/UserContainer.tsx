import styled from "styled-components";
import { Avatar } from "../avatar";
import { theme } from "../theme";
import { flexColumnCenter } from "../theme/mixins";
import { MD, SM } from "../typography/typescale";
import { getInitials } from "./utils";
import { UserProfileProps } from "./_types";
import { retrieveComponentStyles } from "@zendeskgarden/react-theming";

const ProfileContainer = styled.div`
  ${flexColumnCenter}
  padding-top: ${({ theme }) => theme.space.base * 2}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
`;

const CompanyHolder = styled(SM)`
  text-transform: uppercase;
  margin-top: ${({ theme }) => theme.space.base * 2}px;
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
  ${props => retrieveComponentStyles("text.primary", props)}
`;

const UserDetails = styled.div`
  margin-top: ${({ theme }) => theme.space.base * 4}px;
  margin-bottom: ${({ theme }) => theme.space.base * 6}px;
  text-align: center;
`;


export const UserContainer = (props: UserProfileProps) => {
  return (
    <ProfileContainer>
      {props.company && <CompanyHolder isBold>{props.company}</CompanyHolder>}
      <Avatar
        children={props.picture ?? getInitials(props.name)}
        avatarType={props.picture ? "image" : "text"}
        size={"large"}
      />

      <UserDetails>
        <MD isBold style={{ color: theme.palette.blue[600] }}>
          {props.name}
        </MD>
        <SM style={{ color: theme.palette.grey[600] }}>{props.email}</SM>
      </UserDetails>
    </ProfileContainer>
  );
};
