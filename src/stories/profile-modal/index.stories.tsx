import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import { ProfileModal } from ".";
import { Item } from "../dropdowns/item";
import { Menu, NextItem, PreviousItem, Separator } from "../dropdowns/menu";
import { Dropdown } from "../dropdowns/select";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { Trigger } from "../trigger";
import { ProfileModalArgs } from "./_types";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-down-stroke.svg";
import { Button } from "@zendeskgarden/react-buttons";
import { Title } from "../title";
import { Avatar } from "../avatar";
import styled from "styled-components";

const StyledMenu = styled(Menu)`
  max-height: none !important;
  border: none;
`

const Template: Story<ProfileModalArgs> = (args) => {
  const [state, setState] = useState({
    isOpen: true,
    tempSelectedItem: undefined
  });

  return (
    <Row>
      <Col textAlign="center">
        <Dropdown
          isOpen={true}
          onSelect={item => {
            if (item !== 'need-help' && item !== 'change-language' && item !== 'initial') {
              alert(`You picked ${item}`);
            }
          }}
          onStateChange={(changes, stateAndHelpers) => {
            const updatedState: any = {};

            if (Object.hasOwn(changes, 'isOpen')) {
              updatedState.isOpen =
                changes.selectedItem === 'need-help' ||
                changes.selectedItem === 'change-language' ||
                changes.selectedItem === 'initial' ||
                changes.isOpen;
            }

            if (Object.hasOwn(changes, 'selectedItem')) {
              updatedState.tempSelectedItem = changes.selectedItem;
              stateAndHelpers.setHighlightedIndex(1);
            }

            if (Object.keys(updatedState).length > 0) {
              setState(updatedState);
            }
          }}
        >
          <Trigger>
            <Button>
              
            </Button>
          </Trigger>
          <StyledMenu placement="bottom-end">
            <ProfileModal tempSelectedItem={state.tempSelectedItem} />
          </StyledMenu>
        </Dropdown>
      </Col>
    </Row>
  );
};

const defaultArgs: ProfileModalArgs = {

};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Organisms/ProfileModal",
  component: ProfileModal,
} as ComponentMeta<typeof ProfileModal>;
