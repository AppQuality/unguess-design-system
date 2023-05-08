import { ComponentMeta, Story } from "@storybook/react";

import { Col } from "../grid/col";
import { Row } from "../grid/row";

import { ProfileModalArgs, UserMenuArgs } from "./_types";
import { ProfileModal } from ".";
import { ToastProvider, useToast, Notification } from "../notifications";

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

const ProfileModalComponent = ({
  menuArgs,
  ...args
}: ProfileModalArgs) => {
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
