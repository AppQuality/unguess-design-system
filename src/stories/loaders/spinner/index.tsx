import { Spinner as ZendeskSpinner } from '@zendeskgarden/react-loaders';
import styled from "styled-components";
import { SpinnerArgs } from './_types';

const UgSpinner = styled(ZendeskSpinner)``;

/**
 * Breadcrumbs mark and communicate a user’s location in the product.
 * <hr>
 * Used for this:
    - To show the user where they are in a nested navigation
    - To provide a quick way to navigate to ancestor pages
 */
const Spinner = (props: SpinnerArgs) => <UgSpinner {...props}/>;

export { Spinner };
