import { Avatar as ZendeskAvatar } from '@zendeskgarden/react-avatars';
import styled from "styled-components";
import { AvatarArgs } from './_types';

const UgAvatar = styled(ZendeskAvatar)``;

/**
 * Breadcrumbs mark and communicate a user’s location in the product.
 * <hr>
 * Used for this:
    - To show the user where they are in a nested navigation
    - To provide a quick way to navigate to ancestor pages
 */
const Avatar = (props: AvatarArgs) => <UgAvatar {...props}/>;
Avatar.Text = UgAvatar.Text;

export { Avatar };
