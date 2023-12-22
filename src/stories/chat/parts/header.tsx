import { ReactNode } from "react";
import { MD } from "../../typography/typescale";
import { Title } from "../../title";
import styled from "styled-components";
import { NavDivider } from "../../navigation/nav/nav-item";

export const ChatTitle = styled(Title)`
  color: ${({ theme }) => theme.palette.blue[600]};
  margin: ${({ theme }) => `0 -${theme.space.md}`};
  padding: ${({ theme }) => `0 ${theme.space.md} ${theme.space.sm}`};
  border-bottom: ${({ theme }) => `1px solid ${theme.palette.grey[200]}`};
`;
