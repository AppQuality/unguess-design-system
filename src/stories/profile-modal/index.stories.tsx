import { ComponentMeta, Story } from "@storybook/react";

import { Col } from "../grid/col";
import { Row } from "../grid/row";

import { ProfileModalArgs, UserMenuArgs } from "./_types";
import { ProfileModal } from ".";

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

const Template: Story<ProfileModalArgs> = (args) => {

  return (
    <Row>
      <Col>
        <ProfileModal {...args} />
      </Col>
    </Row>
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
  onSelectLanguage: (lang) => { alert ("Selected language: " + lang); },
  onToggleChat: () => { alert ("Toggle chat clicked"); },
  onLogout: () => { alert ("Logout clicked"); }
};

export const Default = Template.bind({});
Default.args = {
  menuArgs: defaultArgs
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
  }
} as ComponentMeta<typeof ProfileModal>;
