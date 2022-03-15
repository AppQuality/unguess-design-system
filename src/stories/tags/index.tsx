import { Tag as ZendeskTag } from '@zendeskgarden/react-tags';
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
const Tag = (props: TagArgs) => <ZendeskTag {...props} />;

Tag.Avatar = ZendeskTag.Avatar;
Tag.Close = ZendeskTag.Close;

export { Tag };
