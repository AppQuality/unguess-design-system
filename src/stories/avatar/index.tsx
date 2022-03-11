import { Avatar as ZendeskAvatar } from '@zendeskgarden/react-avatars';
import { theme } from '../theme'; 
import styled from "styled-components";
import { AvatarArgs } from './_types';

const UgAvatar = styled(ZendeskAvatar)``;

/**
 * An Avatar is a visual way to represent a person or brand in the product. They can display text, icons, or images.
 * <hr>
 * Used for this:
    - To visually represent a person, brand, or product
 */
const Avatar = (props: AvatarArgs) => <UgAvatar {...props}/>;
Avatar.Text = UgAvatar.Text;

export { Avatar };
