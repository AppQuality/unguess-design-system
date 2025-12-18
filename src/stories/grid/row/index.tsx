import { Grid as ZendeskGrid } from "@zendeskgarden/react-grid";
import { RowArgs } from "./_types";

const Row = (props: RowArgs) => <ZendeskGrid.Row {...props} />;

export { Row };
