import styled from "styled-components";
import { MD } from "../typography/typescale";
import { EditorHeaderArgs } from "./_types";
import { retrieveComponentStyles } from "@zendeskgarden/react-theming";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
`;

const Title = styled(MD)<EditorHeaderArgs>`
  ${props => retrieveComponentStyles("text.primary", props)}
  ${props => props.validation === "success" && retrieveComponentStyles("text.success", props)}
  ${props => props.validation === "warning" && retrieveComponentStyles("text.warning", props)}
  ${props => props.validation === "error" && retrieveComponentStyles("text.danger", props)}
`;

export const EditorHeader = (props: EditorHeaderArgs) => {
  const { title, validation } = props;
  return (
    <Header>
      <Title isBold validation={validation}>
        {title || "Write"}
      </Title>
    </Header>
  );
};
