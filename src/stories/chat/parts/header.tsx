import { Title } from "../../title";
import styled from "styled-components";

export const ChatTitle = styled(Title)`
  color: ${({ theme }) => theme.palette.blue[600]};
  margin: ${({ theme }) => `0 -${theme.space.md}`};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
`;
