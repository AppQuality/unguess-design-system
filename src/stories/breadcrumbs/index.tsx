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

const StyledBreadcrumb = styled(ZendeskBreadcrumb)<BreadcrumbArgs>`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    > ol {
      display: block;

      > li {
        display: none;

        &:nth-last-child(${({ showLastArrow }) => (showLastArrow ? 3 : 1)}) {
          display: block;
          width: 100%;
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

const Breadcrumb = ({
  children,
  showLastArrow = true,
  ...props
}: BreadcrumbArgs) =>
  showLastArrow ? (
    <StyledBreadcrumb {...props} showLastArrow={true}>
      {children}
      <div />
    </StyledBreadcrumb>
  ) : (
    <StyledBreadcrumb {...props}>{children}</StyledBreadcrumb>
  );

export { Breadcrumb };
