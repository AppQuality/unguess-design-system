import { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/leaf-stroke.svg";
import { ReactComponent as FolderIcon } from "@zendeskgarden/svg-icons/src/16/folder-open-stroke.svg";
import { Tag } from "../../tags";
import { theme } from "../../theme";
import { StatusCompletedIcon } from "../../icons";
import { TemplateCard, TemplateCardsProps } from ".";

type StoryArgs = TemplateCardsProps & {
  exampleFooter?: ReactNode;
};

const ExampleFooter = () => (
  <>
    <Tag
      color={theme.palette.green[800]}
      hue="rgba(0,0,0,0)"
      style={{ marginBottom: theme.space.xxs }}
    >
      <Tag.Avatar>
        <StatusCompletedIcon />
      </Tag.Avatar>
      Completed
      <Tag.SecondaryText color={theme.palette.grey[700]}>
        1
      </Tag.SecondaryText>
    </Tag>
    <Tag>
      <Tag.Avatar>
        <LeafIcon />
      </Tag.Avatar>
      Counter
      <Tag.SecondaryText
        color={"#000000"}
        isBold
      >
        2
      </Tag.SecondaryText>
    </Tag>
  </>
);



const meta = {
  title: "Molecules/Card/Template Card",
  component: TemplateCard,

  render: ({ children, ...args }) => {
    return (
      <TemplateCard onClick={() => alert('clicked')} {...args}>
        {args.exampleFooter && (
          <TemplateCard.Footer>
            {args.exampleFooter}
          </TemplateCard.Footer>
        )}
      </TemplateCard>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: StoryArgs = {
  isFast: true,
  title: 'Title',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Quisquam, quos.',
  exampleFooter: <ExampleFooter />,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

