import { Item as ZendeskItem } from "@zendeskgarden/react-dropdowns";
import { ItemArgs } from "./_types";
import styled from "styled-components";

const UgItem = styled(ZendeskItem)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  > div {
    height: 100%;
  }

  &[disabled] * {
    opacity: 0.85;
  }

  &[disabled] svg {
    opacity: 0.5;
  }

  &[disabled]:hover {
    background-color: transparent;
  }
`;

const Item = (props: ItemArgs) => <UgItem {...props} />;

export { Item };
