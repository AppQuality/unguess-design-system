import { Label as ZendeskLabel } from "@zendeskgarden/react-forms";
import { LabelArgs } from "./_types";
import styled from "styled-components";

export const StyledLabel = styled(ZendeskLabel)``;

/**
 * A Label is used to specify a title for an input.
 * <hr>
 **/
const Label = (props: LabelArgs) => <StyledLabel {...props} />;

export { Label };
