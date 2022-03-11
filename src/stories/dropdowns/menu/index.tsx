import { Menu as ZendeskMenu } from "@zendeskgarden/react-dropdowns";
import { MenuArgs } from "./_types";
import styled from "styled-components";

const UgMenu = styled(ZendeskMenu)``;

/**
   * A Menu is a wrapper for items elements
   **/
const Menu = (props: MenuArgs) => <UgMenu {...props} />;

export { Menu };
