import styled from "styled-components";
import { PageHeaderProps } from "./_types";
import { Breadcrumb } from "../../breadcrumbs";
import { Main } from "./styled/main";
import { BreadcrumbArgs } from "../../breadcrumbs/_types";
import { PropsWithChildren } from "react";

const StyledPageHeader = styled.div<PageHeaderProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.white};
  padding: ${({ theme }) =>
    `${theme.space.xxl} ${theme.space.xxl} ${theme.space.md}`};
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
   padding: ${({ theme }) =>
    `${theme.space.md} ${theme.space.md} ${theme.space.xs}`};
  }
`;

const PullLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  padding: ${({ theme }) => `${theme.space.xs} 10px`};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  margin: ${({ theme }) => theme.space.md} 0;
`;

const StyledBreadcrumb = (props: BreadcrumbArgs) => {
  return (
    <PullLeft>
      <Breadcrumb {...props} />
    </PullLeft>
  );
};

const Buttons = (props: PropsWithChildren<{}>) => (
  <ButtonContainer {...props} />
);

/**
 * A PageHeader is a modular container used for pages with an opinionated set of default spaces and subcomponents order.
 * <hr>
 * Used for this:
    - Display page informations and meta data
    - As a container for the top part of the page
 */
const PageHeader = (props: PageHeaderProps) => {
  return <StyledPageHeader {...props} />;
};
PageHeader.Breadcrumb = StyledBreadcrumb;
PageHeader.Main = Main;
PageHeader.Buttons = Buttons;

export { PageHeader };
