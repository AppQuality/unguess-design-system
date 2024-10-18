import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";

import { Col } from "../grid/col";
import { Row } from "../grid/row";

import { ProfileModal } from ".";
import { Notification, ToastProvider, useToast } from "../notifications";
import { ProfileModalArgs, UserMenuArgs } from "./_types";

const languages = {
  en: {
    key: "en",
    label: "English",
  },
  fr: {
    key: "fr",
    label: "French",
  },
  it: {
    key: "it",
    label: "Italian",
  },
};

const csm = {
  name: "Alessandro Giommi",
  email: "alessandro.giommi@app-quality.com",
  // picture: "https://placeimg.com/300/300/animal",
};

const ProfileModalComponent = ({ menuArgs, ...args }: ProfileModalArgs) => {
  const { addToast } = useToast();
  return (
    <ProfileModal
      {...args}
      menuArgs={{
        ...menuArgs,
        onCopyEmail: () => {
          menuArgs.onCopyEmail?.();
          addToast(
            ({ close }) => (
              <Notification
                onClose={() => {
                  close();
                }}
                type="success"
                message="Copied to clipboard!"
                isPrimary
              />
            ),
            {
              placement: "top",
            }
          );
        },
      }}
    />
  );
};

const Template: Story<ProfileModalArgs> = (args) => {
  return (
    <ToastProvider zIndex={9999}>
      <Row>
        <Col>
          <ProfileModalComponent {...args} />
        </Col>
      </Row>
    </ToastProvider>
  );
};

const defaultArgs: UserMenuArgs = {
  user: {
    name: "John Doe",
    email: "gionni@contoso.com",
    company: "Enel",
    // picture: "https://placeimg.com/300/300/people"
  },
  csm: csm,
  languages: languages,
  currentLanguage: "en",
  onSelectLanguage: (lang) => {
    alert("Selected language: " + lang);
  },
  onToggleChat: () => {
    alert("Toggle chat clicked");
  },
  onLogout: () => {
    alert("Logout clicked");
  },
  privacy: {
    url: "https://www.iubenda.com/privacy-policy/12345678",
    title: "Privacy Policy",
  },
  onCopyEmail: () => {
    alert("Copied to clipboard!");
  },
  i18n: {
    settingsTitle: "Notifications settings",
    settingsIntroText: "Manage the notifications we send you by email.",
    settingsOutroText: {
      paragraph_1: "By turning on notifications, you will be updated on:",
      paragraph_2:
        "a comment, a campaign starting, a campaign ending, a mention and an invitation",
      paragraph_3:
        "By turning off notifications, you will be only updated on mentions and invitations.",
    },
    settingsToggle: {
      title: "Allow notifications",
      on: "Yes",
      off: "No",
    },
  },
  settingValue: "0",
  // set disableMenuLanguageSettings to false to show the language settings or omit the property
  disableMenuLanguageSettings: true,
  onSetSettings: (value: string) => {
    alert(value === "1" ? "Notifications enabled" : "Notifications disabled");
  },
};

export const Default = Template.bind({});
Default.args = {
  menuArgs: defaultArgs,
};

export default {
  title: "Organisms/ProfileModal",
  component: ProfileModal,
  argTypes: {
    currentLanguage: {
      control: {
        type: "select",
        options: ["en", "it", "fr"],
      },
    },
  },
} as ComponentMeta<typeof ProfileModal>;
