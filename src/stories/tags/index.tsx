import { Tag as ZendeskTag } from '@zendeskgarden/react-tags';
import { theme } from "../theme";
import styled from 'styled-components';
import { TagArgs } from "./_types";

/**
 * Tags let users categorize content using a keyword.

 * Used for this:
    - To add metadata to an element such as category, attribute, or property
    - To communicate status
    - To represent parameters of a filter

 * Not for this:
    - To prompt an action by the user, use a Button instead
 */

    const StyledAvatar = styled(ZendeskTag.Avatar)``;
    const StyledClose = styled(ZendeskTag.Close)``;
    
    const StyledTag = styled(ZendeskTag)<TagArgs>`
      ${(p) =>
        p.color &&
        `
          color: ${p.color};
          ${StyledClose} {
             color: ${p.color};
          }
          &:hover {
            color: ${p.color};
             ${StyledClose} {
                color: ${p.color};
             }
          }
       `}
      ${StyledAvatar} {
        border-radius: 0%;
      }
    `;
    
    const Tag = ({
      isPill = true,
      hue = theme.palette.grey[200],
      color = theme.palette.grey[700],
      ...props
    }: TagArgs) => (
      <StyledTag
        isPill={props.isRound ? false : isPill}
        hue={hue}
        color={color}
        {...props}
      />
    );
    
    Tag.Avatar = StyledAvatar;
    Tag.Close = StyledClose;
    
    export { Tag };
