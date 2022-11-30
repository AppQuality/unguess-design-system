import { Button } from "@zendeskgarden/react-buttons";
import React, {
  Children,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { ButtonArgs } from "../buttons/button/_types";
import { TabsArgs, TabItemProps, TabPanelProps } from "./_types";

const StyledNavButton = styled(Button)<ButtonArgs & { isSelected?: boolean }>`
  padding: 10px 28px 6px;
  color: ${({ theme }) => theme.palette.grey[600]};
  border-bottom: ${({ theme }) => theme.borderStyles.solid} transparent;
  border-width: 0 0 ${({ theme }) => theme.borderWidths.md} 0;
  border-radius: 0;

  ${({ theme, isSelected }) =>
    isSelected &&
    `
        color: ${theme.colors.primaryHue};
        background-color: transparent;
        
        border-color: ${theme.colors.primaryHue};
        font-weight: ${theme.fontWeights.semibold};
    `}

  ${({ disabled }) => disabled && `pointer-events: none;`}

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primaryHue};
  }
`;

const StyledTabList = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TabPanel = (props: TabPanelProps) => <div>{props.children}</div>;

const TabNavItem = (props: TabItemProps) => {
  const { children, isSelected, isDisabled, index, setSelectedTab } = props;

  const handleTabClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <StyledNavButton
      disabled={isDisabled}
      onClick={handleTabClick}
      isBasic
      isSelected={isSelected}
    >
      {children}
    </StyledNavButton>
  );
};

export const Tabs = (props: TabsArgs) => {
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

  useEffect(() => {
    if (props.onTabChange) {
      props.onTabChange(selectedTabIndex);
    }
  }, [selectedTabIndex]);

  return (
    <div>
      <StyledTabList>
        {tabPanels.map((item, index) => {
          return React.isValidElement<TabPanelProps>(item) ? (
            <TabNavItem
              index={index}
              isSelected={index === selectedTabIndex}
              setSelectedTab={setSelectedTabIndex}
              {...item.props}
            >
              {item.props?.title}
            </TabNavItem>
          ) : null;
        })}
      </StyledTabList>

      {tabPanels[selectedTabIndex]}
    </div>
  );
};

Tabs.Panel = TabPanel;
