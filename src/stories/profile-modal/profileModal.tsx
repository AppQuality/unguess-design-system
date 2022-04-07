import { PropsWithChildren, useState } from "react";
import { Button } from "../buttons/button";
import { Dropdown } from "../dropdowns/select";
import { Trigger } from "../trigger";
import { ReactComponent as ChevronIcon } from "../../assets/icons/chevron-down-stroke.svg";
import { ProfileModalArgs } from "./_types";
import { Menu, PreviousItem, Separator } from "../dropdowns/menu";
import { Item } from "../dropdowns/item";
import { ReactComponent as QuestionMark } from "../../assets/icons/question-mark.svg";
import { MenuItem } from "./menuItem";
import styled from "styled-components";
import { HelpItem } from "./helpMenuItem";


const StyledList = styled.ul`
 padding: 0;
 `;

export const TestModal = (props: PropsWithChildren<ProfileModalArgs>) => {
  const [item, setActiveItem] = useState("");

  const toggleItem = (item: string) => {
    setActiveItem(item);
  };

  const csm = {
    name: "John Doe",
    email: "john.doe@contoso.org",
    picture: "https://via.placeholder.com/150",
  };

  return (
    <StyledList>
      <MenuItem
        icon={<QuestionMark />}
        content={<h1>Content Title</h1>}
        value={"test-4"}
        selectedItem={item}
        setActive={(i) => toggleItem(i)}
      >
        Test 4
      </MenuItem>
      <HelpItem
        value={"csm"}
        selectedItem={item}
        setActive={(i) => toggleItem(i)}
        title="Need Help?"
        contactLabel="Contact your CSM"
        csm={csm}
        toggleChat={() => {alert("Toggle Chat")}}
      />
      <MenuItem
        value={"test-1"}
        selectedItem={item}
        setActive={(i) => toggleItem(i)}
      >
        Test 1
      </MenuItem>
      <MenuItem
        icon={<QuestionMark />}
        value={"test-2"}
        selectedItem={item}
        setActive={(i) => toggleItem(i)}
      >
        Test 2
      </MenuItem>
      <MenuItem
        value={"test-3"}
        selectedItem={item}
        setActive={(i) => toggleItem(i)}
      >
        Test 3
      </MenuItem>
    </StyledList>
  );
};
