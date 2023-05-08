import { Button } from "@zendeskgarden/react-buttons";
import React, { Children, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { ButtonArgs } from "../buttons/button/_types";
import { getColor } from "../theme/utils";
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
        color: ${getColor(theme.colors.primaryHue, 600)};
        background-color: transparent;
        
        border-color: ${getColor(theme.colors.primaryHue, 600)};
        font-weight: ${theme.fontWeights.semibold};
    `}

  ${({ disabled }) =>
    disabled &&
    `
    pointer-events: none; 
    background-color: transparent !important;
    `}

  &:hover {
    background-color: transparent;
    color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
  }
`;

const StyledTabList = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const StyledTabPanel = styled.div<{ hidden?: boolean }>`
  display: ${({ hidden }) => (hidden ? "none" : "block")};
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

const TabPanel = ({ hidden, children, ...rest }: TabPanelProps) => (
  <StyledTabPanel hidden={hidden} {...rest}>{children}</StyledTabPanel>
);

const TabNavItem = (props: TabItemProps) => {
  const { children, isSelected, isDisabled, index, setSelectedTab, className, id } = props;

  const handleTabClick = useCallback(() => {
    setSelectedTab(index);
  }, [setSelectedTab, index]);

  return (
    <StyledNavButton
      disabled={isDisabled}
      isBasic
      isSelected={isSelected}
      onClick={handleTabClick}
      className={className}
      id={id}
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
    <>
      <StyledTabList {...props}>
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

      {tabPanels.map((item, index) => {
        if (
          React.isValidElement<TabPanelProps>(item) &&
          index !== selectedTabIndex
        ) {
          return React.cloneElement(item, { hidden: true });
        }
        return item;
      })}
    </>
  );
};

Tabs.Panel = TabPanel;
