import styled from "styled-components";
import { MD } from "../typography/typescale";
import { EditorHeaderArgs } from "./_types";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const Title = styled(MD)<EditorHeaderArgs>`
  ${({ validation, theme }) => {
    if (validation === "success") {
      return `color: ${theme.colors.successHue};`;
    } else if (validation === "warning") {
      return `color: ${theme.colors.warningHue};`;
    } else if (validation === "error") {
      return `color: ${theme.palette.dangerHue};`;
    } else {
      return `color: ${theme.colors.primaryHue};`;
    }
  }}
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
