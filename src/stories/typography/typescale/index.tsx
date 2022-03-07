import {
  SM as ZendeskSM,
  MD as ZendeskMD,
  LG as ZendeskLG,
  XL as ZendeskXL,
  XXL as ZendeskXXL,
  XXXL as ZendeskXXXL,
} from "@zendeskgarden/react-typography";
import { SMArgs, MDArgs, LGArgs, XLArgs, XXLArgs, XXXLArgs } from "./_types";

/**
 *  Type components come in small, medium, large, extra-large, extra-extra-large, and extra-extra-extra-large.
 */
const SM = (props: SMArgs) => <ZendeskSM {...props}/>;
const MD = (props: MDArgs) => <ZendeskMD {...props}/>;
const LG = (props: LGArgs) => <ZendeskLG {...props}/>;
const XL = (props: XLArgs) => <ZendeskXL {...props}/>;
const XXL = (props: XXLArgs) => <ZendeskXXL {...props}/>;
const XXXL = (props: XXXLArgs) => <ZendeskXXXL {...props}/>;


export { SM, MD, LG, XL, XXL, XXXL };
