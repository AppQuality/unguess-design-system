import { Message } from "@zendeskgarden/react-forms";
import { Form, Formik } from "formik";
import styled from "styled-components";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-left-stroke.svg";
import useWindowSize from "../../hooks/useWindowSize";
import { Anchor } from "../buttons/anchor";
import { Button } from "../buttons/button";
import { ContainerCard } from "../cards";
import { FormField as Field, FormHint as Hint } from "../forms/field";
import { Input } from "../forms/input";
import { theme } from "../theme";
import { Title } from "../title";
import { XL } from "../typography/typescale";
import { LoginFormArgs } from "./_types";

const StyledCard = styled(ContainerCard)`
  @media screen and (max-width: ${theme.breakpoints.sm}) {
    border: 0;
  }
`;

/**
 * Login Form
 * <hr>
 * Used for this:
    - Login user to the application
 */

const LoginForm = (props: LoginFormArgs) => {
  const { width } = useWindowSize();
  const breakpointMd = parseInt(theme.breakpoints.md, 10);

  return (
    <>
      <StyledCard
        {...(width > breakpointMd && { isFloating: true })}
        {...props.card}
      >
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
                  isAccent
                  style={{ marginBottom: theme.space.md }}
                >
                  {props.buttonText}
                </Button>
                {(typeof props.registerCta !== 'undefined') && (
                  props.registerCta
                )}  
                {status && (
                  <div style={{ textAlign: "center" }}>
                    <Message validation="error">{status.message}</Message>
                  </div>
                )}
              </Form>
            );
          }}
        </Formik>
      </StyledCard>
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
};

export { LoginForm };
