import { ComponentMeta, Story } from "@storybook/react";
import { Tiles } from ".";
import { TilesArgs } from "./_types";
import { Row } from "../grid/row";
import { Col } from "../grid/col";
import { ReactComponent as LeafIcon } from '../../assets/icons/leaf-stroke.svg';
import { ReactComponent as ImageIcon } from '../../assets/icons/file-image-stroke.svg';
import { ReactComponent as PresentationIcon } from '../../assets/icons/file-presentation-stroke.svg';
import styled from "styled-components";
import { mediaQuery } from "@zendeskgarden/react-theming";

interface Tile {
  value: string;
  label: string;
  icon: React.FC;
  description: string;
  disabled?: boolean;
}

interface TilesStoryProps extends TilesArgs {
  tiles: Array<Tile>,
  hasDescription: boolean
}

const StyledCol = styled(Col)`
  ${p => mediaQuery('down', 'xs', p.theme)} {
    :not(:first-child) {
      margin-top: ${p => p.theme.space.sm};
    }
  }
`;
const Template: Story<TilesStoryProps> = ({tiles, hasDescription, ...args}) => {
  return (
    <Tiles {...args} name="example" aria-label="Tiles component example">
      <Row>
        {tiles.map((item) => (
          <StyledCol sm={4}>
            <Tiles.Tile value={item.value} disabled={item.disabled}>
              <Tiles.Icon><item.icon /></Tiles.Icon>
              <Tiles.Label>{item.label}</Tiles.Label>
              {hasDescription && <Tiles.Description>{item.description}</Tiles.Description>}
            </Tiles.Tile>
          </StyledCol>
        ))}
      </Row>
    </Tiles>
  )
};

const tiles = [
  {
    value: 'leaf',
    label: 'Leaf',
    icon: LeafIcon,
    description: 'Nori grape silver beet broccoli kombu beet greens fava bean potato quandong celery.',
  },
  {
    value: 'image',
    label: 'Image',
    icon: ImageIcon,
    description: 'Bunya nuts black-eyed pea prairie turnip leek lentil turnip greens parsnip.',
  },
  {
    value: 'presentation',
    label: 'Presentation',
    icon: PresentationIcon,
    description: 'Sea lettuce lettuce water chestnut eggplant winter purslane fennel azuki bean.',
  }
];

export const Default = Template.bind({});
Default.args = {
  tiles
};

export const Description = Template.bind({});
Description.args = {
  tiles,
  hasDescription: true
};

export const Disabled = Template.bind({});
Disabled.args = {
  tiles: tiles.map((tile, index) => ({...tile, disabled: index === 0 ? true : false}))
};

export default {
  title: "Atoms/Tiles",
  component: Tiles,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Tiles>;
