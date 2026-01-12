import { Grid as ZendeskGrid } from "@zendeskgarden/react-grid";
import styled from "styled-components";
import { theme } from "../../theme";
import { ColArgs } from "./_types";

const StyledCol = styled(ZendeskGrid.Col)`
  margin-bottom: ${theme.space.lg};

  @media screen and (max-width: ${theme.breakpoints.sm}) {
    margin-bottom: ${theme.space.md};
  }
`;

const Col = (props: ColArgs) => <StyledCol {...props} />;

export { Col };
