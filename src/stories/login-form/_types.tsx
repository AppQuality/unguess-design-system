import { FormikTouched, FormikErrors, FormikValues } from "formik";

export interface LoginFormArgs {
  /**
   * Handles accordion expansion changes
   *
   * @param {number} index A section index
   */
  onSubmit: (values: FormikValues, actions: any) => void | Promise<any> | any;
  // onChange?: (values: FormikValues, actions: any) => void;
  onBlur?: (formData: any) => void;
  validate?: (values: FormikValues) => void | object | Promise<FormikErrors<LoginFields>>;
  validateOnChange: boolean;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  initialValues: LoginFields;
}


export interface LoginFields {
  email: string;
  password: string;
}
