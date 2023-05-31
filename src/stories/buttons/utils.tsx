import { Col as ZendeskCol, Row as ZendeskRow } from "@zendeskgarden/react-grid";
import { MD as ZendeskMD } from "@zendeskgarden/react-typography";
import styled from "styled-components";

export const sizes = ["small", "medium", "large"] as const;
export const variants = [
  {},
  { isDanger: true },
  { isAccent: true },
  { disabled: true },
] as const;

export const Row = styled(ZendeskRow)`
  margin-bottom: 20px;
  max-width: 768px;
  align-items: center;
  justify-content: center;
`;

export const Col = styled(ZendeskCol)`
  display: flex;
  justify-content: center;
`;

export const MD = styled(ZendeskMD)`
  max-width: 768px;  
  text-align: center;
  margin-botto: 10px;
`;
