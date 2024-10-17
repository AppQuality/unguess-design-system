import { Meta as ComponentMeta, StoryFn as Story } from "@storybook/react";
import { LoginForm } from ".";
import { Col } from "../grid/col";
import { Grid } from "../grid/grid";
import { Row } from "../grid/row";
import { LoginFormArgs } from "./_types";

const Template: Story<LoginFormArgs> = (args) => (
  <Grid>
    <Row>
      <Col>
        <LoginForm {...args} />
      </Col>
    </Row>
  </Grid>
);

const defaultArgs: LoginFormArgs = {
  onSubmit: (values, actions) => {
    setTimeout(() => {
      alert("Submitted with a 2 seconds fake delay!");
      actions.setSubmitting(false);
    }, 2000);
  },
  initialValues: {
    email: "",
    password: "",
  },
  validateOnChange: true,
  errors: {},
  touched: {},
  title: "Welcome to Unguess",
  buttonText: "Sign In",
  placeholderEmail: "Insert Email",
  placeholderPassword: "Insert Password",
  passwordForgotLabel: "Forgot Password?",
  backToLabel: "Back to UNGUESS",
  onBackClick: () => {
    alert("back ");
  },
  validate: (values) => {
    let errors: any = {};
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
};

export default {
  title: "Organisms/LoginForm",
  argTypes: {
    isValid: {
      table: {
        disable: true,
      },
    },
    touched: {
      table: {
        disable: true,
      },
    },
    errors: {
      table: {
        disable: true,
      },
    },
    validateOnChange: {
      table: {
        disable: true,
      },
    },
    onBlur: {
      table: {
        disable: true,
      },
    },
    onSubmit: {
      table: {
        disable: true,
      },
    },
    validate: {
      table: {
        disable: true,
      },
    },
  },
  component: LoginForm,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof LoginForm>;
