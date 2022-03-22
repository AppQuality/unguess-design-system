import { ComponentMeta, Story } from "@storybook/react";
import { ReactComponent as ChangelogIcon } from "@zendeskgarden/svg-icons/src/16/megaphone-stroke.svg";
import { ReactComponent as ChevronIcon } from "@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg";
import { BrandItem, HeaderItem, HeaderItemIcon } from "./header-item";
import { theme } from "../../theme";
import { Header } from ".";
import { IconButton } from "../../buttons/icon-button";
import { Default as DefaultAvatar } from "../../avatar/index.stories";
import { AvatarArgs } from "../../avatar/_types";
import { HeaderArgs } from "./_types";
import styled from "styled-components";
import useWindowSize from "../../../hooks/useWindowSize";

interface HeaderStoryArgs extends HeaderArgs {
  /** Display a brand identity name */
  brandName: string;
  avatar: AvatarArgs & { type: "icon" | "image" | "text" };
}

const ChevronButton = styled(IconButton)`
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const Template: Story<HeaderStoryArgs> = (args) => {
  const { width } = useWindowSize();
  return (
    <Header {...args}>
      <BrandItem {...args} menuLabel={"menu"}/>
      <HeaderItem
        onClick={() => alert("What a wonderful changelog")}
        style={{ marginRight: "-" + theme.space.sm }}
      >
        <HeaderItemIcon>
          <ChangelogIcon />
        </HeaderItemIcon>
      </HeaderItem>
      <HeaderItem
        isRound
        onClick={() => {
          alert("Trigger modal");
        }}
      >
        <HeaderItemIcon>
          <>
            <DefaultAvatar
              {...args.avatar}
              size={
                width > parseInt(theme.breakpoints.sm) ? "small" : "extrasmall"
              }
            />
            <ChevronButton size="small">
              <ChevronIcon />
            </ChevronButton>
          </>
        </HeaderItemIcon>
      </HeaderItem>
    </Header>
  );
};

const defaultArgs = {
  isStandalone: true,
  brandName: "Enel's Workspace",
  avatar: {
    ...DefaultAvatar.args,
    type: DefaultAvatar?.args?.type || "text",
  },
};

export const Default = Template.bind({});
Default.args = defaultArgs;

Default.parameters = {
  design: {
    type: "figma",
    url: "https://www.figma.com/file/BSagFENAXxMy2UpnQVa0mI/UNGUESS-%7C-Garden?node-id=3673%3A29791",
  },
};

export default {
  title: "Organisms/Header",
  component: Header,
} as ComponentMeta<typeof Header>;
