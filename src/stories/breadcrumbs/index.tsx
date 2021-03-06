import { Breadcrumb as ZendeskBreadcrumb } from '@zendeskgarden/react-breadcrumbs';
import { BreadcrumbArgs } from './_types';

/**
 * Breadcrumbs mark and communicate a user’s location in the product.
 * <hr>
 * Used for this:
    - To show the user where they are in a nested navigation
    - To provide a quick way to navigate to ancestor pages
 */
const Breadcrumb = (props: BreadcrumbArgs) => <ZendeskBreadcrumb {...props}/>;

export { Breadcrumb };
