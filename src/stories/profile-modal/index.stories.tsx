import { ComponentMeta, Story } from "@storybook/react";
import { useState } from "react";
import { ProfileModal } from ".";
import { Menu } from "../dropdowns/menu";
import { Dropdown } from "../dropdowns/select";
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { Trigger } from "../trigger";
import { Language, ProfileModalArgs, ProfileModalViewsEnum } from "./_types";
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
            if (item !== ProfileModalViewsEnum.INITIAL 
              && item !== ProfileModalViewsEnum.NEED_HELP 
              && item !== ProfileModalViewsEnum.CHANGE_LANGUAGE
            ) {
              alert(`You picked ${item}`);
            }
          }}
          onStateChange={(changes) => {
            const updatedState: any = {};

            if (Object.hasOwn(changes, 'isOpen')) {
              updatedState.isOpen =
              changes.selectedItem === ProfileModalViewsEnum.INITIAL 
                || changes.selectedItem === ProfileModalViewsEnum.NEED_HELP 
                || changes.selectedItem === ProfileModalViewsEnum.CHANGE_LANGUAGE
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
  currentLanguage: Language.IT
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Organisms/ProfileModal",
  component: ProfileModal,
  argTypes: {
    tempSelectedItem: {
      control: {
        type: "select",
        options: [ProfileModalViewsEnum.INITIAL, ProfileModalViewsEnum.NEED_HELP, ProfileModalViewsEnum.CHANGE_LANGUAGE],
      },
    },
  },
} as ComponentMeta<typeof ProfileModal>;
