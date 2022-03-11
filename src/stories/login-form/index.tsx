import { Formik, Form } from "formik";
import { Card } from "../cards";
import { Field } from "../forms/field";
import { Input } from "../forms/input";
import { Label } from "../label";
import { Button } from "../buttons/button";
import { Title } from "../title";
import { Row } from "../grid/row";
import { Col } from "../grid/col";
import { Grid } from "../grid/grid";
import { LoginFormArgs } from "./_types";
import { Message } from "../dropdowns/select";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { theme } from "../theme";

/**
 * Login Form
 * <hr>
 * Used for this:
    - Login user to the application
 */

const LoginForm = (props: LoginFormArgs) => (
  <Grid>
    <Row justifyContent={"center"} alignItems={"center"}>
      <Col size={4} xs={12} sm={12}>
        <Logo style={{ marginBottom: theme.space.md }} />
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
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Card isFloating>
                <Title style={{textAlign: "center", margin: theme.space.md}}>Log In</Title>
                <Field>
                  <Label></Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={values.email}
                    {...errors && errors.email ? {validation: "error"} : {}}
                  />
                  { (errors.email) ? (<Message validation="error">{errors.email}</Message>) : ""}
                </Field>
                <Field>
                  <Label></Label>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password}
                    {...errors && errors.password ? {validation: "error"} : {}}
                  />
                  { (errors.password) ? (<Message validation="error">{errors.password}</Message>) : ""}
                </Field>
                <br />
                <Button
                  type="submit"
                  isStretched
                  disabled={!props.isValid}
                  isPrimary
                >
                  Log in
                </Button>
              </Card>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  </Grid>
);

export { LoginForm };
