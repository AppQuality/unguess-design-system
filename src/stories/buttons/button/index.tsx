import { Button as ZendeskButton } from "@zendeskgarden/react-buttons";
import styled from "styled-components";
import { paddingDefault } from "../shared/_shared";
import { ButtonArgs } from "./_types";

const UgButton = styled(ZendeskButton)`
  ${paddingDefault}
`;

const Button = (props: ButtonArgs) => <UgButton {...props} />;

Button.StartIcon = UgButton.StartIcon;
Button.EndIcon = UgButton.EndIcon;

export { Button };
