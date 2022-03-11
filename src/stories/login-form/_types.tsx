import { FormikValues } from "formik";

export interface LoginFormArgs {
  /**
   * Handles accordion expansion changes
   *
   * @param {number} index A section index
   */
  onSubmit: (values: FormikValues, actions: any) => void | Promise<any>;
  onChange?: (formData: any) => void;
  onBlur?: (formData: any) => void;
  validate?: (values: FormikValues) => any;
  errors: any;
  isSubmitting: boolean;
  isValid: boolean;
  initialValues: LoginFields
}


export interface LoginFields {
  email: string;
  password: string;
}
