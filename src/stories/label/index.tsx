import { Label as ZendeskLabel } from "@zendeskgarden/react-forms";
import { LabelArgs } from "./_types";
import styled from "styled-components";

const UgLabel = styled(ZendeskLabel)``;

/**
   * A Label is used to specify a title for an input.
   * <hr>
   **/
const Label = (props: LabelArgs) => <UgLabel {...props} />;

export { Label };
