import { css } from "styled-components";
import { ButtonArgs } from "./_types";

const paddingDefault = css`
  padding: 0.714rem 1.071rem;
`;

const getButtonVariant = (args: ButtonArgs) => {
  return {
    [args.variant as string]: true,
    ...(args.variant === "isDefault" && { isBasic: false }),
  };
};

export { paddingDefault, getButtonVariant };
