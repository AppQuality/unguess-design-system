import styled from "styled-components";
import { PageHeaderProps } from "./_types";
import { Breadcrumb } from "../../breadcrumbs";
import {
  Main,
  MainMeta,
  MainDescription,
  MainOverline,
  MainTitle,
} from "./styled/main";
import { BreadcrumbArgs } from "../../breadcrumbs/_types";
import { PropsWithChildren } from "react";

const StyledPageHeader = styled.div<PageHeaderProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
  padding-top: ${({ theme }) => theme.space.lg};
  padding-bottom: ${({ theme }) => theme.space.md};
`;

const PullLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: ${({ theme }) => theme.space.md} 0;
  padding: ${({ theme }) => theme.space.xxs} 0;
`;

const StyledBreadcrumbs = (props: BreadcrumbArgs) => {
  return (
    <PullLeft>
      <Breadcrumb {...props} />
    </PullLeft>
  );
};

const StyledFooter = (props: PropsWithChildren<{}>) => (
  <FooterContainer {...props} />
);

/**
 * A PageHeader is a modular container used for pages with an opinionated set of default spaces and subcomponents order.
 * <hr>
 * Used for this:
    - Display page informations and meta data
    - As a container for the top part of the page
 */
const PageHeader = (props: PageHeaderProps) => <StyledPageHeader {...props} />;

PageHeader.Breadcrumbs = StyledBreadcrumbs;
PageHeader.Main = Main;
PageHeader.Overline = MainOverline;
PageHeader.Title = MainTitle;
PageHeader.Description = MainDescription;
PageHeader.Meta = MainMeta;
PageHeader.Footer = StyledFooter;

export { PageHeader };
