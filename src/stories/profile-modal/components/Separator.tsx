import styled from "styled-components";

const Separator = styled.hr`
  display: block;
  margin: 4px 0px;
  border-top: none;
  border-bottom: 1px solid ${(props) => props.theme.palette.grey[300]};
`;

export { Separator };
