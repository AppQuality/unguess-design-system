import { Skeleton as ZendeskSkeleton } from '@zendeskgarden/react-loaders';
import styled from "styled-components";
import { SkeletonArgs } from './_types';

const UgSkeleton = styled(ZendeskSkeleton)`
  background-color: ${(props) => props.theme.palette.grey[500]};
  border-radius: ${(props) => props.theme.borderRadii.xxl};
`;

/**
 * A Skeleton loader shows users a blank version of a page or section of a page into which content is gradually loaded. It provides a visual estimate of the space needed.
 * <hr>
 * Used for this:
    - Skeleton is the default loader, used whenever the system can predict the format of the loading content
    - To progressively load different parts of a page
    - To avoid large layout shifts
 
 * Not for this:
   - When the system doesn’t have control over the content that is loading, use a Spinner instead
   - To indicate that a component (like a button or search input) is busy, use Dots instead
   - To communicate a typing status, use Inline instead
 */
const Skeleton = (props: SkeletonArgs) => <UgSkeleton {...props}/>;

export { Skeleton };
