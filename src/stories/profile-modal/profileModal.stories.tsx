import { ComponentMeta, Story } from "@storybook/react";
import { TestModal } from "./profileModal";

import { Col } from "../grid/col";
import { Row } from "../grid/row";

import { ProfileModalArgs } from "./_types";



const Template: Story<ProfileModalArgs> = (args) => {

  return (
    <Row>
      <Col>
        <TestModal {...args} />
      </Col>
    </Row>
  );
};

const defaultArgs: ProfileModalArgs = {
  userInfos: {
    initials: "MM",
    fullName: "Martino Martinelli",
    email: "m.martinelli@enel.com",
    company: "ENEL",
  },
  csmContactInfos: {
    initials: "GP",
    fullName: "Gianluca Peretti",
    email: "gianluca.peretti@unguess.io",
  },
  currentLanguage: "IT" as const,
};

export const Test = Template.bind({});
Test.args = defaultArgs;

export default {
  title: "Organisms/ProfileModalTest",
  component: TestModal,
} as ComponentMeta<typeof TestModal>;
