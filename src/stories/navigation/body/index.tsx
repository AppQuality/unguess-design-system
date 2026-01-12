import styled from "styled-components";

const UgBody = styled.div`
  background-color: ${({ theme }) => theme.palette.white};
`;

/**
 * A Body defines the main content of an HTML document which displays on the browser
 */
const Body = () => <UgBody />;

export { Body };
