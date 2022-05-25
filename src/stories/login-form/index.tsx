import { Formik, Form } from "formik";
import { Card } from "../cards";
import { Field, Hint } from "../forms/field";
import { Input } from "../forms/input";
import { Button } from "../buttons/button";
import { Title } from "../title";
import { LoginFormArgs } from "./_types";
import { Message } from "../dropdowns/select";
import { theme } from "../theme";
import { XL } from "../typography/typescale";
import { Anchor } from "../buttons/anchor";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-left-stroke.svg";

/**
 * Login Form
 * <hr>
 * Used for this:
    - Login user to the application
 */

const LoginForm = (props: LoginFormArgs) => (
  <>
    <Card isFloating {...props.card}>
      <Title
        style={{
          textAlign: "center",
          marginTop: theme.space.sm,
          marginBottom: theme.space.lg,
        }}
      >
        <XL style={{ color: theme.palette.blue[600] }}>{props.title}</XL>
      </Title>
      <Formik
        {...props}
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validate={props.validate}
      >
        {({
          values,
          status,
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
                
                  {...(errors && errors.password
                    ? { validation: "error" }
                    : touched.password
                    ? { validation: "success" }
                    : "")}
                />
                {errors.password && (
                  <Message validation="error">{errors.password}</Message>
                )}
                {props.passwordForgotLink && (
                  <Hint style={{ textAlign: "right" }}>
                    <Anchor
                      href={props.passwordForgotLink}
                      style={{ color: theme.palette.grey[500] }}
                    >
                      {props.passwordForgotLabel || "Forgot Password?"}
                    </Anchor>
                  </Hint>
                )}
              </Field>
              <br />
              <Button
                type="submit"
                isStretched
                disabled={
                  Object.keys(errors).length
                    ? true
                    : isSubmitting
                    ? true
                    : false
                }
                isPrimary
                style={{ marginBottom: theme.space.md }}
              >
                {props.buttonText}
              </Button>

              {status &&  (
                <div style={{ textAlign: "center" }}>
                  <Message validation="error">{status.message}</Message>
                  </div>
                )}
            </Form>
          );
        }}
      </Formik>
    </Card>
    {props.onBackClick && (
      <Button
        onClick={props.onBackClick}
        isBasic
        style={{ marginTop: theme.space.md }}
      >
        <Button.StartIcon>
          <ChevronIcon />
        </Button.StartIcon>
        {props.backToLabel || "Back to UNGUESS"}
      </Button>
    )}
  </>
);

export { LoginForm };
