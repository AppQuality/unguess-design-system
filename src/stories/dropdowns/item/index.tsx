import { Item as ZendeskItem } from "@zendeskgarden/react-dropdowns";
import { ItemArgs } from "./_types";
import styled from "styled-components";

const UgItem = styled(ZendeskItem)`
  &[disabled] svg {
    opacity: 0.5;
  }
  &:hover {
    background-color: ${({ theme }) => theme.palette.blue[100]};
  }
`;

const Item = (props: ItemArgs) => <UgItem {...props} />;

export { Item };
