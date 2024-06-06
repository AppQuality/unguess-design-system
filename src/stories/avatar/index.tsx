import { Avatar as ZendeskAvatar } from "@zendeskgarden/react-avatars";
import { theme } from "../theme";
import styled from "styled-components";
import { AvatarArgs } from "./_types";
import LogoIcon from "../../assets/logo-icon.svg";
import { getColor } from "../theme/utils";
import InternalAvatar from "./InternalAvatar";

const UgAvatar = styled(ZendeskAvatar)<AvatarArgs>`
  text-transform: uppercase;

  ${(props) =>
    props.avatarType &&
    props.avatarType !== "image" &&
    `background: ${props.backgroundColor || theme.gradients.dark};`}

  ${(props) =>
    props.avatarType &&
    props.avatarType === "system" &&
    `
      box-shadow: 0 0 0 2px ${getColor(theme.colors.primaryHue, 600)};
      background: ${props.backgroundColor || theme.palette.white};
    `}
`;

/**
 * An Avatar is a visual way to represent a person or brand in the product. They can display text, icons, or images.
 * <hr>
 * Used for this:
    - To visually represent a person, brand, or product
 */
const Avatar = ({ isSystem, badge, ...props }: AvatarArgs) => {
  const fixedBadge = badge && Number(badge) > 9 ? "9+" : badge;
  const wrapChildren = (type: string) => {
    if (type === "icon") return props.children;
    if (type === "image")
      return <img alt="avatar" src={props.children as string} />;
    if (type === "text") return <Avatar.Text>{props.children}</Avatar.Text>;
    if (type === "system") return <InternalAvatar />;
  };

  return (
    <UgAvatar
      {...props}
      badge={fixedBadge}
      isSystem={props.avatarType === "system" || isSystem}
      children={wrapChildren(props.avatarType || "text")}
      size={props.size || "small"}
    />
  );
};
Avatar.Text = UgAvatar.Text;

export { Avatar };
