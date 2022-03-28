import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import { ProfileModal } from ".";
import { Menu } from "../dropdowns/menu";
import { Dropdown } from "../dropdowns/select";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { Trigger } from "../trigger";
import { ProfileModalArgs } from "./_types";
import { Button } from "@zendeskgarden/react-buttons";
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
            if (item !== 'initial' 
              && item !== 'need-help' 
              && item !== 'change-language'
            ) {
              alert(`You picked ${item}`);
            }
          }}
          onStateChange={(changes) => {
            const updatedState: any = {};

            if (Object.hasOwn(changes, 'isOpen')) {
              updatedState.isOpen =
              changes.selectedItem === 'initial' 
                || changes.selectedItem === 'need-help' 
                || changes.selectedItem === 'change-language'
                || changes.isOpen;
            }

            if (Object.hasOwn(changes, 'selectedItem')) {
              updatedState.tempSelectedItem = changes.selectedItem;
            }

            if (Object.keys(updatedState).length > 0) {
              setState(updatedState);
            }
          }}
        >
          <Trigger>
            <Button></Button>
          </Trigger>
          <StyledMenu placement="bottom-end">
            <ProfileModal {...args} tempSelectedItem={state.tempSelectedItem} />
          </StyledMenu>
        </Dropdown>
      </Col>
    </Row>
  );
};

const defaultArgs: ProfileModalArgs = {
  userInfos: {
    initials: 'MM',
    fullName: 'Martino Martinelli',
    email: 'm.martinelli@enel.com',
    company: 'ENEL',
  },
  csmContactInfos: {
    initials: 'GP',
    fullName: 'Gianluca Peretti',
    email: 'gianluca.peretti@unguess.io',
  },
  currentLanguage: 'IT' as const
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Organisms/ProfileModal",
  component: ProfileModal,
  argTypes: {
    tempSelectedItem: {
      control: {
        type: "select",
        options: ['initial', 'need-help', 'change-language'],
      },
    },
  },
} as ComponentMeta<typeof ProfileModal>;
