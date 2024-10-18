import { Field, Item, Menu } from "@zendeskgarden/react-dropdowns.next";
import styled from "styled-components";
import { ReactComponent as DotsIcon } from "../../assets/icons/dots-icon.svg";
import { IDotsMenu } from "./_types";

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const DotsMenu = ({ children, onSelect, style, ...props }: IDotsMenu) => {
  return (
    <Field style={style}>
      <Menu
        {...props}
        button={(props) => (
          <IconButton {...props}>
            <DotsIcon />
          </IconButton>
        )}
        onChange={({ type, value }) => {
          if (type === "menuItem:click" && onSelect) {
            onSelect(value);
          }
        }}
      >
        {children}
      </Menu>
    </Field>
  );
};

DotsMenu.Item = Item;

export { DotsMenu };
