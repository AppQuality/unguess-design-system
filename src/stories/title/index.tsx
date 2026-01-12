import { Alert } from "@zendeskgarden/react-notifications";
import { TitleArgs } from "./_types";

/**
 * Title is a basic component used to display a title. Often used in card headers.
 */
const Title = (props: TitleArgs) => <Alert.Title {...props} />;

export { Title };
