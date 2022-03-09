import { Close as ZendeskClose } from "@zendeskgarden/react-notifications";
import { CloseArgs } from "./_types";

/**
 * Title is a basic component used to display a title. Often used in card headers.
 */
const Close = (props: CloseArgs) => <ZendeskClose {...props} />;

export { Close };
