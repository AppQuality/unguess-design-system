import styled from "styled-components";
import { MD } from "../typography/typescale";

const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.space.xs} ${({ theme }) => theme.space.md};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const Title = styled(MD)`
  color: ${({ theme }) => theme.colors.primaryHue};
`;

export const EditorHeader = ({ title }: { title?: string }) => {
  return (
    <Header>
      <Title isBold>{title || "Write"}</Title>
    </Header>
  );
};
