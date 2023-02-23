import { Tag as ZendeskTag } from '@zendeskgarden/react-tags';
import { theme } from "../theme";
import styled from 'styled-components';
import { TagArgs } from "./_types";
import { Span } from '../typography/span';

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
const StyledSpan = styled(Span) <{ color?: string; isRegular?: boolean }>`
      margin-left: ${(p) => p.theme.space.xxs};
      font-weight: ${(p) =>
    p.isRegular ? p.theme.fontWeights.regular : p.theme.fontWeights.bold};
      ${(p) => p.color && `color: ${p.color};`}
    `;

const StyledTag = styled(ZendeskTag)<TagArgs>`
    margin-right: ${(p) => p.theme.space.xs};
    &:last-of-type {
      margin-right: 0;
    }
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

      /* Large */
      ${(p) =>
    p.size === 'large' &&
    `
        font-size: ${p.theme.fontSizes.md};
    
        ${StyledClose} svg {
          width: 16px;
          height: 16px;
        }

      `}
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
Tag.SecondaryText = StyledSpan;

export { Tag };
