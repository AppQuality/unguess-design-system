import { ButtonArgs } from "../button/_types";

const getButtonVariant = (args: ButtonArgs) => {
  return {
    [args.variant as string]: true,
    ...(args.variant === "isDefault" && { isBasic: false }),
  };
};

export { getButtonVariant };
