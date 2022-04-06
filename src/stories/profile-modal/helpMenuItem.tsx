import { MenuItem } from "./menuItem";
import { ReactComponent as QuestionMark } from "../../assets/icons/question-mark.svg";
import { PreviousButton } from "./previousMenuButton";
import { Separator } from "../dropdowns/menu";

interface HelpItemProps {
  title: string;
  selectedItem?: string;
  value: string;
  csm: {
    name: string;
    email: string;
    picture?: string;
  };
  setActive: (item: string) => void;
}

export const HelpItem = (props: HelpItemProps) => {
  const copyToClipBoard = () => {
    navigator.clipboard.writeText(props.csm.email);
  };

  const content = (
    <>
      <PreviousButton onClick={() => props.setActive("")} isBasic>
        {props.title}
      </PreviousButton>
      <Separator />
      lorem ipsum
    </>
  );

  return (
    <>
      <MenuItem
        content={content}
        value={props.value}
        selectedItem={props.selectedItem}
        setActive={props.setActive}
        icon={<QuestionMark/>}
      >
        {props.title}
      </MenuItem>
    </>
  );
};
