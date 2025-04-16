import { Item, Menu } from "@zendeskgarden/react-dropdowns.next";
import { ButtonMenuProps } from "./_types";

const ButtonMenu = ({
  label,
  children,
  onSelect,
  buttonProps,
  ...rest
}: ButtonMenuProps) => {
  return (
    <>
      <Menu
        {...rest}
        button={typeof label === "string" ? label : (props) => label(props)}
        onChange={({ type, value }) => {
          if (type === "menuItem:click") {
            onSelect(value);
          }
        }}
        buttonProps={{
          isPill: true,
          isBasic: true,
          ...buttonProps,
        }}
      >
        {children}
      </Menu>
    </>
  );
};

ButtonMenu.Item = Item;

export { ButtonMenu };
