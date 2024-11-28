import { ITooltipProps } from "@zendeskgarden/react-tooltips";

export interface TooltipArgs extends ITooltipProps {
  isTransparent?: boolean;
  maxWidth?: number | "unset";
}
