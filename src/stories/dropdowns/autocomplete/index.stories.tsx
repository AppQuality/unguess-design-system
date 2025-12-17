import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { fn } from "@storybook/test";
import { Field, Label } from "@zendeskgarden/react-dropdowns";
import { Autocomplete, AutocompleteProps } from ".";
import { Button, Input, TooltipModal } from "../../..";
import { ItemContent } from "../item-content";

let items = [
  {
    label: "Ferdinand ThreeMelons",
    value: "item-1",
    id: "item-1",
    isSelected: true,
  },
  { label: "Giommo Cornelio", value: "item-2", id: "item-2" },
  { label: "Rubber tree", value: "item-3", id: "item-3" },
];

const Template: Story<AutocompleteProps> = (args) => {
  return (
    <div style={{ width: "300px" }}>
      <Field>
        <Label>Food Manager</Label>
        <Autocomplete {...args} options={items} />
      </Field>
    </div>
  );
};

const TemplateCreatable: Story<AutocompleteProps> = (args) => {
  return (
    <Field>
      <Label>Food Manager</Label>
      <Autocomplete
        {...args}
        options={items}
        isCreatable
        onCreateNewOption={async (inputValue) => {
          // mock a promise to create a new item
          return await new Promise((resolve) =>
            setTimeout(() => {
              if (inputValue === "invalid") {
                alert("Invalid value");
                resolve(false);
              } else {
                resolve({
                  label: inputValue,
                  value: inputValue,
                  id: inputValue,
                });
              }
            }, 1000)
          );
        }}
      />
    </Field>
  );
};
const dataImg =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAAoCAYAAACiu5n/AAAFZElEQVR4AexYXWxURRT+9v6VghCKIaioiEgEDSKCAYGKKCLUaEltLZVqSEgMRkUfjGIBMVhAUdT4IA8moCa0GgGTKv4kKqhNIGoIWqKogIBBaapQfkrb3bu7nLM/d2dmd9vde/eFSzf37Jw595wz852ZOTNztTVlndGLiTRcZL8+wH4fcK3kioDfMUr4tMXvFOGJ94swoUyXXvi1ElvDAy8NYM7jJubXWwjEJH6FC0jwRk7QUPuK5V+0hEwCTHVceYOGiff5d3prn74eYpwSzVxoSnU/VbSWr8P4Y1dYwmT2A64elzb4ks6FWAkEEF/D21aHEFYGekql4QrT6Cka7l5sSjR6cu/BG3u7jlmPmrhjoYHpDxng9ocMD7jqQzajeUvNOOBoFGg7GpH0rhnfeyclg0SFc8AkygEiVSyzMGBw9s7zWWDesyZuLddxW5WB0gUGZhLwov7ZbRLN5VxcP03HmOl6HDBbHfxRBqzTMuaO8Lt8aMdGG6daKYKCkaYD1avIoSAT2fm0HULBtuezMP79U+6TaJMPXzwogHIKKNto/Me07xt5HbOs5HKlFyzMgRqeD4Jnjag6bJSGm+cQclFIPI/m4GFyO6fbovjybWWNka7bZ8HLFnQjbu0APnFMHhV+7RZwO43wzndtdiHR7MdM9Lsk4MgY6LSaRE8SUg7U5qXBRM17MeMRA0NHpNp0ALNrbozLJA0amlJMynItd2+x0XZYDiJHuWplampX01TmzCn63LnJRvtx2U58nw9/2XUapj4oBTS1htmRmqn5yMlyt9S4LIiIMtCc1DgjT602MES5uLQeimD3VsXAZeMa4axZTcEVxuzX78IyYDsoR3ZAiaDtouGOdlqLG9LX4v3PmJjxMPVI8Bm2gca6dF1BJS+26gVLWj7nqC9N60IyYHVKh7rzaiOj8t4vwji2X862GucuJZafrA+h84wc8IwOcxDeNEvHtRO1lCa5bagLxhKpIAV0I5BSIq7jJGlS6fX5cEUQdjC7l0N7IviNplt2jdzf8DKc+yRNZcHk+wYbbUfiWCTA6tXwzH9xJcHWFdt9Dmh6LfN0DXYCW1b1EI08W6x91QKv36QZA20mwMm6BNhUboanaT9MKnotu85mDl7YjqYlNrdt8bGWtzrR/p/fI7hzkeGQA7h4IE1nekTlUwUCzKe2yhVKNBMNcbtlT8tTMPEq78KwFADkYfxsHZMrDIccwCMynJ2PH5CTDdm7eh5YbsEqzm7KSeaqG52uZFcswBunlbGlDhtze/ZEFN0dMdbTHx/aR02SfSPD7K56UV57nhrtwdjpychbeK9IaR74wfvoFvUHeM9NeSWOwG58Koj//yaGqsmHdSvqMk/7pE5v5f7mMHj74QNPNooB5jnODYoOf2qik4AocMFXv2TBUDC00CWl9WAEjcvj+6Lolu/NTKIsHz5KY3Tk5wgO781OGt9gOIuJjvkAwOlclOXLs9/hY2LxdEx5e9r+Znx74i3v2/fSg1r+XM/r3XHmktHUTZr98KmHS7fEl/176Gak2n+8lkaVRiEp3/WRDfWWZhYBVSuVaZE0KEApDwE5PNoSgfoxgMR5PTVrLGnzZ2M+Tf1FJyrmRfqATmHqkZa/p427S84poo0XXgLM2xAvei8O+RONeP9kX3ys3Faf+TTFX0eaN6dP7blLTPCXCrYvJMUAR+hjxy9fhbGJsicvfC8NlNYaaeafvxVCTxeR5kY77Q6sk5uyJfSX5s2bQON1tL6yC9vfiCcTb+6AdeVdWHuvTPt2UER7cbxhUXea3db6wvQp1TSg8acYnnKi0M98bEr7GaCKrQ+wGhG/1ftG2G8jquI5DwAA//8TJjA8AAAABklEQVQDAK+VQteCSnLWAAAAAElFTkSuQmCC";
const itemsMedia = [
  {
    label: "Ferdinand ThreeMelons",
    value: "item-1",
    id: "item-1",
    children: (
      <ItemContent
        label="Ferdinand ThreeMelons"
        thumbSrc={dataImg}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
    ),
  },
  {
    label: "Giommo Cornelio",
    value: "item-2",
    id: "item-2",
    children: (
      <ItemContent
        label="Giommo Cornelio"
        thumbSrc={dataImg}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
    ),
  },
  {
    label: "Rubber Tree",
    value: "item-3",
    id: "item-3",
    children: (
      <ItemContent
        label="Rubber Tree"
        thumbSrc={dataImg}
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      />
    ),
  },
];

const editableItems = [
  {
    label: "Apple",
    value: "apple",
    id: "apple",
    actions: ({ closeModal }: { closeModal?: () => void }) => (
      <Button
        type="button"
        isDanger
        onClick={(e) => {
          alert("delete item");
          if (closeModal) closeModal();
        }}
      >
        Delete
      </Button>
    ),
  },
  {
    label: "Banana",
    value: "banana",
    id: "banana",
    actions: ({ closeModal }: { closeModal?: () => void }) => (
      <>
        <TooltipModal.Title tag="h2">Edit or delete a Tag</TooltipModal.Title>
        <TooltipModal.Body>
          <label htmlFor="title-input">label</label>
          <Input
            value={"Banana"}
            type="text"
            id="title-input"
            onKeyDown={(e) => {
              // if is enter save and close the modal
              if (e.key === "Enter") {
                alert("edit tag" + e.currentTarget.value);
                e.currentTarget.blur();
                if (closeModal) closeModal();
              }
            }}
            onClick={(e) => {
              e.currentTarget.focus();
            }}
          />
          <Button
            type="button"
            isDanger
            onClick={(e) => {
              alert("delete item");
              if (closeModal) closeModal();
            }}
          >
            Delete
          </Button>
        </TooltipModal.Body>
      </>
    ),
  },
  { label: "Not Editable", value: "orange", id: "orange" },
];

const TemplateWithItemMedia: Story<AutocompleteProps> = (args) => {
  return (
    <Field>
      <Label>Food Manager</Label>
      <Autocomplete {...args} options={itemsMedia} isExpanded />
    </Field>
  );
};

const TemplateEditable: Story<AutocompleteProps> = (args) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxWidth: "400px",
      }}
    >
      <Field>
        <Label>Food Manager</Label>
        <Autocomplete {...args} options={editableItems} />
      </Field>
      <Field>
        <Label>Food Manager Creatable</Label>
        <Autocomplete
          {...args}
          isCreatable
          options={editableItems}
          onCreateNewOption={async (inputValue) => {
            // mock a promise to create a new item
            return await new Promise((resolve) =>
              setTimeout(() => {
                if (inputValue === "invalid") {
                  alert("Invalid value");
                  resolve(false);
                } else {
                  resolve({
                    label: inputValue,
                    value: inputValue,
                    id: inputValue,
                  });
                }
              }, 1000)
            );
          }}
        />
      </Field>
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  },
};

export const Creatable = TemplateCreatable.bind({});
Creatable.args = {
  isMultiselectable: true,
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  },
};

export const Editable = TemplateEditable.bind({});
Editable.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  },
  isEditable: true,
  listboxAppendToNode: document.body,
};

export const WithMedia = TemplateWithItemMedia.bind({});
WithMedia.args = {
  onOptionClick: (value) => {
    console.log("Option clicked", value);
  },
};

export default {
  title: "Molecules/Dropdown/Autocomplete",
  component: Autocomplete,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
  args: {
    onChange: fn(),
  },
} as ComponentMeta<typeof Autocomplete>;
