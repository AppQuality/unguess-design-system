import {
  OrderedList as ZendeskOrderedList,
  UnorderedList as ZendeskUnorderedList,
} from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { OrderedListArgs, UnorderedListArgs } from "./_types";

const UgOrderedList = styled(ZendeskOrderedList)``;
const UgUnorderedList = styled(ZendeskUnorderedList)``;

/**
 *  Use Lists to style and format ordered and unordered lists.
 *  <hr>
 *  Use Lists to style and format ordered (`<ol>`) and unordered (`<ul>`) lists.
 */
const OrderedList = (props: OrderedListArgs) => <UgOrderedList {...props} />;
OrderedList.Item = UgOrderedList.Item;

const UnorderedList = (props: UnorderedListArgs) => <UgUnorderedList {...props} />;
UnorderedList.Item = UgUnorderedList.Item;

export { OrderedList, UnorderedList };
