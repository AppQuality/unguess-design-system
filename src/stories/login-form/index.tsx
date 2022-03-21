import { Formik, Form } from "formik";
import { Card } from "../cards";
import { Field } from "../forms/field";
import { Input } from "../forms/input";
import { Button } from "../buttons/button";
import { Title } from "../title";
import { LoginFormArgs } from "./_types";
import { Message } from "../dropdowns/select";
import { theme } from "../theme";

/**
 * Login Form
 * <hr>
 * Used for this:
    - Login user to the application
 */

const LoginForm = (props: LoginFormArgs) => (
  <Card isFloating style={{width: "100%"}}>
    <Title style={{ textAlign: "center", margin: theme.space.md }}>
      {props.title}
    </Title>
    <Formik
      {...props}
      initialValues={props.initialValues}
      onSubmit={props.onSubmit}
      validate={props.validate}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <Field>
              <Input
                type="email"
                name="email"
                placeholder={props.placeholderEmail}
                onChange={handleChange}
                value={values.email}
                {...(touched && values.email
                  ? (touched.email = true)
                  : (touched.email = false))}
                {...(errors && errors.email
                  ? { validation: "error" }
                  : touched.email
                  ? { validation: "success" }
                  : "")}
              />
              {errors.email ? (
                <Message validation="error">{errors.email}</Message>
              ) : (
                ""
              )}
            </Field>
            <Field style={{ marginTop: theme.space.md }}>
              <Input
                type="password"
                name="password"
                placeholder={props.placeholderPassword}
                onChange={handleChange}
                value={values.password}
                {...(touched && values.password
                  ? (touched.password = true)
                  : (touched.password = false))}
                {...(errors && errors.password
                  ? { validation: "error" }
                  : touched.password
                  ? { validation: "success" }
                  : "")}
              />
              {errors.password ? (
                <Message validation="error">{errors.password}</Message>
              ) : (
                ""
              )}
            </Field>
            <br />
            <Button
              type="submit"
              isStretched
              disabled={
                Object.keys(errors).length ? true : isSubmitting ? true : false
              }
              isPrimary
            >
              {props.buttonText}
            </Button>
          </Form>
        );
      }}
    </Formik>
  </Card>
);

export { LoginForm };
