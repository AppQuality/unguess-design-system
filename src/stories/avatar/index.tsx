import { Avatar as ZendeskAvatar } from "@zendeskgarden/react-avatars";
import { theme } from "../theme";
import styled from "styled-components";
import { AvatarArgs } from "./_types";

const UgAvatar = styled(ZendeskAvatar)`
  ${(props) => {
    return `
    background: ${props.backgroundColor || theme.gradients.dark};
   `;
  }}
`;

/**
 * An Avatar is a visual way to represent a person or brand in the product. They can display text, icons, or images.
 * <hr>
 * Used for this:
    - To visually represent a person, brand, or product
 */
const Avatar = (props: AvatarArgs) => {
  const fixedBadge = props.badge && props.badge > 9 ? "9+" : props.badge;
  return <UgAvatar {...props} badge={fixedBadge} />;
};
Avatar.Text = UgAvatar.Text;

export { Avatar };
