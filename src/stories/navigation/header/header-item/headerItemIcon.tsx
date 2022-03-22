import { PropsWithChildren } from "react";
import { HeaderItemIcon as ZendeskHeaderItemIcon } from "@zendeskgarden/react-chrome";
import { HeaderItemIconArgs } from "./_types";

const HeaderItemIcon = (props: PropsWithChildren<HeaderItemIconArgs>) => (
  <ZendeskHeaderItemIcon {...props} />
);

export { HeaderItemIcon };
