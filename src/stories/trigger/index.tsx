import { Trigger as ZendeskTrigger } from "@zendeskgarden/react-dropdowns";
import { TriggerArgs } from "./_types";

/**
 * A Trigger is a wrapper for input elements
 **/
const Trigger = (props: TriggerArgs) => <ZendeskTrigger {...props} />;

export { Trigger };
