import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { AutocompleteNew as Autocomplete, AutocompleteProps } from ".";
import { Field } from "@zendeskgarden/react-dropdowns.next";
import { Label } from "../../label";

interface AutocompleteStoryArgs extends AutocompleteProps {
  allowNew?: boolean;
}

const items = [
  { label: "Ferdinand ThreeMelons", value: "item-1" },
  { label: "Giommo Cornelio", value: "item-2" },
  { label: "Rubber tree", value: "item-3" },
];

const Template: Story<AutocompleteStoryArgs> = (args) => {
  return (
    <div style={{ width: "300px" }}>
        <Field>
        <Label>Food Manager</Label>
          <Autocomplete {...args} options={items} onOptionClick={(inputValue) => console.log('inputValue', inputValue)} />
        </Field>
    </div>
  );
};

const itemsMedia = [
  {
    thumbSrc: "https://via.placeholder.com/60x40",
    label: "Ferdinand ThreeMelons",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    value: "item-1",
  },
  {
    thumbSrc: "https://via.placeholder.com/60x40",
    label: "Giommo Cornelio",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    value: "item-2",
  },
  {
    thumbSrc: "https://via.placeholder.com/40x60",
    label: "Rubber Tree",
    description: "Lorem ",
    value: "item-3",
  },
];

const TemplateWithItemMedia: Story<AutocompleteStoryArgs> = (args) => {
  return (
      <Field>
        <Label>Food Manager</Label>
        <Autocomplete {...args}
          options={itemsMedia}
          renderOption={(option) => <div style={{display: "flex", flexDirection: 'row', alignItems: "center", justifyContent: "flex-start"}}>
          <img src={option.thumbSrc} style={{marginRight: '12px', width: '100%', maxWidth: '60px'}} />
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
            <div>{option.label}</div>
            {option.description && <div style={{fontSize: '12px', color: '#999'}}>{option.description}</div>}
            </div>
          </div>
          }
        />
      </Field>
  );
};

export const Default = Template.bind({});
Default.args = {
  allowNew: false,
};

export const WithMedia = TemplateWithItemMedia.bind({});
WithMedia.args = {
  allowNew: false,
};

export default {
  title: "Molecules/Dropdown/AutocompleteNew",
  component: Autocomplete,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Autocomplete>;
