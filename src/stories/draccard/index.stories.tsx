import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { DracCard } from ".";
import { DracCardArgs } from "./_types";

const defaultArgs: DracCardArgs = {
  title: "Title",
  description: "Description",
  icon: <div>Icon</div>,
  price: {
    firstRow: {
      value: "First Row",
      isStrikeThrough: false,
    },
    currentPrice: "Value",
  },
  additionalInfo: [
    {
      icon: <div>Icon</div>,
      text: "Text",
    },
  ],
  background: "green",
};

const props: DracCardArgs[] = [
  {
    title: "Title",
    description: "Description",
    icon: <div>Icon</div>,
    price: {
      firstRow: {
        value: "First Row",
        isStrikeThrough: false,
      },
      currentPrice: "Current Price",
    },
    additionalInfo: [
      {
        icon: <div>Icon</div>,
        text: "Text",
      },
    ],
    background: "green",
  },
  {
    title: "Access your product usability",
    description: "Collect valuable feedbacks",
    icon: <div>Icon</div>,
    price: {
      firstRow: {
        value: "First Row",
        isStrikeThrough: false,
      },
      currentPrice: "Offerta Black Friday",
    },
    additionalInfo: [
      {
        icon: <div>Icon</div>,
        text: "72 h",
      },
      {
        icon: <div>Icon</div>,
        text: "5 users",
      },
    ],
    background: "linear-gradient(91deg, #001825 0%, #003A57 100%);",
  },
  {
    title: "Explore your latest release",
    description: "Uncover Critial Issues",
    icon: <div>Icon</div>,
    price: {
      firstRow: {
        value: "8 Token",
        isStrikeThrough: true,
      },
      currentPrice: "5 Token",
    },
    additionalInfo: [
      {
        icon: <div>Icon</div>,
        text: "12 h",
      },
      {
        icon: <div>Icon</div>,
        text: "5 bugs",
      },
    ],
    background: "linear-gradient(90deg, rgba(12,77,94,1) 35%, rgba(43,132,115,1) 100%);",
  },

]

const Template: Story<DracCardArgs> = (args) => {
  return (<>
  {props.map((prop) => (
    <DracCard {...prop} />
  ))}
    </>);
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export default {
  title: "Atoms/DracCard",
  component: DracCard,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof DracCard>;
