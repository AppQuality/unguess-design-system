import { Col as ZendeskCol } from "@zendeskgarden/react-grid";
import { ColArgs } from "./_types";
import styled from "styled-components";
import { theme } from "../../theme";

const StyledCol = styled(ZendeskCol)`
  margin-bottom: ${theme.space.lg};

  @media screen and (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: ${theme.space.md};
  }
`;

const Col = (props: ColArgs) => <StyledCol {...props} />;

export { Col };
