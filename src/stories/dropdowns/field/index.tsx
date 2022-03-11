import { Field as ZendeskField } from "@zendeskgarden/react-dropdowns";
import { FieldArgs } from "./_types";
import styled from "styled-components";

const UgField = styled(ZendeskField)``;

const Field = (props: FieldArgs) => <UgField {...props} />;

export { Field };
