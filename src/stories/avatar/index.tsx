import { Avatar as ZendeskAvatar } from "@zendeskgarden/react-avatars";
import { theme } from "../theme";
import styled from "styled-components";
import { AvatarArgs } from "./_types";

const UgAvatar = styled(ZendeskAvatar)<AvatarArgs>`
  text-transform: uppercase;

  ${(props) =>
    props.avatarType &&
    props.avatarType !== "image" &&
    `background: ${props.backgroundColor || theme.gradients.dark};`}
`;

/**
 * An Avatar is a visual way to represent a person or brand in the product. They can display text, icons, or images.
 * <hr>
 * Used for this:
    - To visually represent a person, brand, or product
 */
const Avatar = (props: AvatarArgs) => {
  const fixedBadge = props.badge && props.badge > 9 ? "9+" : props.badge;
  const wrapChildren = (type: string) => {
    if (type === "icon") return props.children;
    if (type === "image")
      return <img alt="avatar" src={props.children as string} />;
    if (type === "text") return <Avatar.Text>{props.children}</Avatar.Text>;
  };

  return (
    <UgAvatar
      {...props}
      badge={fixedBadge}
      children={wrapChildren(props.avatarType || "text")}
      size={props.size || "small"}
    />
  );
};
Avatar.Text = UgAvatar.Text;

export { Avatar };
