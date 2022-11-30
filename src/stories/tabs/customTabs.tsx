import { Button } from "@zendeskgarden/react-buttons";
import { ITabsProps } from "@zendeskgarden/react-tabs";
import React, { Children, ReactElement, useCallback, useState } from "react";
import styled from "styled-components";
import { ButtonArgs } from "../buttons/button/_types";
import { CustomTabsArgs, TabsArgs } from "./_types";

interface TabItemProps {
  children: React.ReactNode;
  index: number;
  isSelected?: boolean;
  isDisabled?: boolean;
  setSelectedTab: (index: number) => void;
}

interface TabPanelProps {
  children: React.ReactNode;
  title: string;
}
const TabPanel = ({ children, title }: TabPanelProps) => <div>{children}</div>;

const StyledNavButton = styled(Button)<ButtonArgs & { isSelected?: boolean }>`
  padding: 10px 28px 6px;
  color: ${({ theme }) => theme.palette.grey[600]};
  border-bottom: 3px solid transparent;
  border-radius: 0;

  ${({ theme, isSelected }) =>
    isSelected &&
    `
        color: ${theme.colors.primaryHue};
        background-color: transparent;
        border-bottom: 3px solid ${theme.colors.primaryHue};
        font-weight: ${theme.fontWeights.semibold};
    `}

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledTabList = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TabNav = (props: TabItemProps) => {
  const { children, isSelected, isDisabled, index, setSelectedTab } = props;

  const handleTabClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <StyledNavButton onClick={handleTabClick} isBasic isSelected={isSelected}>
      {children}
    </StyledNavButton>
  );
};

export const CustomTabs = (props: CustomTabsArgs) => {
  const { children, selectedIndex } = props;
  const tabs = Children.toArray(children);

  // Filter valid elements
  const tabPanels = tabs.filter(
    (tab) => typeof tab !== "string" && typeof tab !== "number"
  );

  const internalIndex =
    selectedIndex && selectedIndex < tabPanels.length ? selectedIndex : 0;

  // SelectedItem or first child
  const [selectedTabIndex, setSelectedTabIndex] =
    useState<number>(internalIndex);

  return (
    <div>
      <StyledTabList>
        {tabPanels.map((item, index) => {
          return React.isValidElement<TabPanelProps>(item) ? (
            <TabNav
              index={index}
              isSelected={index === selectedTabIndex}
              setSelectedTab={setSelectedTabIndex}
            >
              {item.props?.title}
            </TabNav>
          ) : null;
        })}
      </StyledTabList>

      {tabPanels[selectedTabIndex]}
    </div>
  );
};
