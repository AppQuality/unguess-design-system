import { Meta, StoryObj } from "@storybook/react";
import { ReactNode } from "react";
import { ReactComponent as LeafIcon } from "@zendeskgarden/svg-icons/src/16/leaf-stroke.svg";
import { Tag } from "../../tags";
import { theme } from "../../theme";
import { StatusCompletedIcon } from "../../icons";
import { TemplateCard, TemplateCardsProps } from ".";

type StoryArgs = TemplateCardsProps & {
  exampleFooter?: ReactNode;
};

const ExampleFooter = () => (
  <>
    <TemplateCard.PriceTag text='100¥' />
    <TemplateCard.UserTag text='Users 12' />
    <Tag
      color={theme.palette.green[800]}
      hue="rgba(0,0,0,0)"
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
  i18n: {
    tailoredHeader: 'My tailored activities',
    unguessHeader: 'Suggested by UNGUESS',
  },
  isFast: true,
  isTailored: true,
  title: 'Detailed feedback in real time.',
  superTitle: 'Moderated',
  thumbUrl: 'https://admin.unguess.io/uploads/Icona_severtity_esperienziale_39f5178d1b.svg',
  description: 'Gain qualitative insights by observing users as they lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Quisquam, quos.',
  lineClamp: 2,
  exampleFooter: <ExampleFooter />,
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

