import { Grid as ZendeskGrid } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { GridArgs } from "./_types";

const UgGrid = styled(ZendeskGrid)`
  padding-left: 0;
  padding-right: 0;
`;

/**
 * The Grid component is a framework for building modular layouts.
 * <hr>
 * Used for this:
    - To structure the layout of a page
 */
const Grid = (props: GridArgs) => <UgGrid {...props} />;

export { Grid };
