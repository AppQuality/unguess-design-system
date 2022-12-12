import { Breadcrumb as ZendeskBreadcrumb } from "@zendeskgarden/react-breadcrumbs";
import { BreadcrumbArgs } from "./_types";
import styled from "styled-components";

/**
 * Breadcrumbs mark and communicate a user’s location in the product.
 * <hr>
 * Used for this:
    - To show the user where they are in a nested navigation
    - To provide a quick way to navigate to ancestor pages
 */

const StyledBreadcrumb = styled(ZendeskBreadcrumb)`
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    > ol {
      display: block;

      > li {
        display: none;

        &:nth-last-child(3) {
          // Show only third last child (3) = Last item + arrow + upper (current) level
          width: 100%;
          display: block;
          text-overflow: ellipsis;
          overflow: hidden;
          position: relative;
          padding-left: ${({ theme }) => theme.space.base * 4}px;

          &::before {
            content: "<";
            position: absolute;
            left: 0;
          }
        }
      }
    }
  }
`;

const Breadcrumb = (props: BreadcrumbArgs) => <StyledBreadcrumb {...props} />;

export { Breadcrumb };
