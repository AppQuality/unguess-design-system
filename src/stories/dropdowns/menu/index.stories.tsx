import { useState } from 'react';
import { ReactComponent as ChevronIcon } from "../../../assets/icons/chevron-down-stroke.svg";
import { ComponentMeta, Story } from '@storybook/react';
import { Row } from '../../grid/row';
import { Col } from '../../grid/col';
import { Dropdown } from '../select';
import { Trigger } from '../../trigger';
import { Menu, NextItem, PreviousItem, Separator } from '.';
import { Item } from '../item';
import { Button } from '@zendeskgarden/react-buttons';

const items = [
  {
    label: "All Tests",
    value: "all",
  },
  {
    label: "Bug Hunting & Customer Feedbacks",
    value: "1",
  },
  {
    label: "Special",
    value: "2",
  },
  {
    label: "Functional Testing (Bug Hunting)",
    value: "3",
  },
  {
    label: "Functional Testing (Customer Feedbacks)",
    value: "4",
  },
  {
    label: "Functional Testing (Special)",
    value: "5",
  },
  {
    label: "Functional Testing (Bug Hunting & Customer Feedbacks)",
    value: "6",
  },
  {
    label: "Functional Testing (Bug Hunting & Special)",
    value: "7",
  },
  {
    label: "Functional Testing (Customer Feedbacks & Special)",
    value: "8",
  },
  {
    label: "Functional Testing (Bug Hunting, Customer Feedbacks & Special)",
    value: "9",
  },
]

const Template: Story<any> = (args) => {
  const [rotated, setRotated] = useState<boolean | undefined>();

  return (
    <Row>
      <Col textAlign="center">
        <Dropdown
          onSelect={item => alert(`You choose ${item.label}`)}
          onStateChange={options => Object.hasOwn(options, 'isOpen') && setRotated(options.isOpen)}
        >
          <Trigger>
            <Button>
              Choose test
              <Button.EndIcon isRotated={rotated}>
                <ChevronIcon />
              </Button.EndIcon>
            </Button>
          </Trigger>
          <Menu>
            {items.map((item) => (
              <Item
                key={item.value}
                value={item}
              >
                {item.label}
              </Item>
            ))}
          </Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};
export const Default = Template.bind({});
Default.args = {
  // ...defaultArgs
}

const NestedTemplate: Story<any> = (args) => {
  const [state, setState] = useState({
    isOpen: false,
    tempSelectedItem: undefined
  });

  return (
    <Row>
      <Col textAlign="center">
        <Dropdown
          isOpen={state.isOpen}
          onSelect={item => {
            if (item !== 'fruits' && item !== 'berry') {
              alert(`You picked a ${item}`);
            }
          }}
          onStateChange={(changes, stateAndHelpers) => {
            const updatedState: any = {};

            if (Object.hasOwn(changes, 'isOpen')) {
              updatedState.isOpen =
                changes.selectedItem === 'berry' ||
                changes.selectedItem === 'fruits' ||
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
              Fruit
              <Button.EndIcon isRotated={state.isOpen}>
                <ChevronIcon />
              </Button.EndIcon>
            </Button>
          </Trigger>
          <Menu placement="end">
            {state.tempSelectedItem === 'berry' ? (
              <>
                <PreviousItem value="fruits">Fruit</PreviousItem>
                <Separator />
                <Item value="strawberry">Strawberry</Item>
                <Item value="loganberry">Loganberry</Item>
                <Item value="boysenberry">Boysenberry</Item>
              </>
            ) : (
              <>
                <Item value="orange">Orange</Item>
                <NextItem value="berry">Berry</NextItem>
                <Item value="apple">Apple</Item>
              </>
            )}
          </Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export const Nested = NestedTemplate.bind({});

export default {
  title: "Molecules/Dropdown/Menu",
  component: Menu
} as ComponentMeta<typeof Menu>