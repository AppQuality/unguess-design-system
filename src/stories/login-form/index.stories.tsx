import { ComponentMeta, Story } from "@storybook/react";
import { LoginForm } from ".";
import { LoginFormArgs, LoginFields } from "./_types";

const Template: Story<LoginFormArgs> = (args) => <LoginForm {...args} />;

const defaultArgs: LoginFormArgs = {
  onSubmit: (values, actions) => {
    console.log(values);
    actions.setSubmitting(false);
  },
  initialValues: {
    email: "",
    password: "",
  },
  isSubmitting: false,
  isValid: false,
  errors: {},
  onChange: (formData) => {
    console.log(formData);
  },
  validate: (values) => {
    const errors = {email: "", password: ""};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  },
};

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Filled = Template.bind({});
Filled.args = {
  ...defaultArgs,
  initialValues: {
    email: "john.doe@contoso.com",
    password: "password",
  },
  isValid: true,
};

export default {
  title: "Organisms/LoginForm",
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;
