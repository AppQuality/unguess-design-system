import { Item as ZendeskItem } from "@zendeskgarden/react-dropdowns";
import { ItemArgs } from "./_types";
import styled from "styled-components";

const UgItem = styled(ZendeskItem)``;

const Item = (props: ItemArgs) => <UgItem {...props} />;

export { Item };
