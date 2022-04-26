import {
  SM as ZendeskSM,
  MD as ZendeskMD,
  LG as ZendeskLG,
  XL as ZendeskXL,
  XXL as ZendeskXXL,
  XXXL as ZendeskXXXL,
} from "@zendeskgarden/react-typography";
import { theme } from "../../theme";
import { SMArgs, MDArgs, LGArgs, XLArgs, XXLArgs, XXXLArgs } from "./_types";

/**
 *  Type components come in small, medium, large, extra-large, extra-extra-large, and extra-extra-extra-large.
 */
const SM = (props: SMArgs) => <ZendeskSM style={props.isMonospace ? { lineHeight: theme.lineHeights.sm } : {}} {...props}/>;
const MD = (props: MDArgs) => <ZendeskMD style={props.isMonospace ? { lineHeight: theme.lineHeights.md } : {}} {...props}/>;
const LG = (props: LGArgs) => <ZendeskLG style={props.isMonospace ? { lineHeight: theme.lineHeights.lg } : {}} {...props}/>;
const XL = (props: XLArgs) => <ZendeskXL {...props}/>;
const XXL = (props: XXLArgs) => <ZendeskXXL {...props}/>;
const XXXL = (props: XXXLArgs) => <ZendeskXXXL {...props}/>;


export { SM, MD, LG, XL, XXL, XXXL };
