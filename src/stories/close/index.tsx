import { Close as ZendeskClose } from "@zendeskgarden/react-notifications";
import { CloseArgs } from "./_types";
import styled from "styled-components";

const UgClose = styled(ZendeskClose)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${({theme}) => theme.space.xl};
    height: ${({theme}) => theme.space.xl};
    position: relative;
    top: unset;
    left: unset;
`;

/**
 * Title is a basic component used to display a title. Often used in card headers.
 */
const Close = (props: CloseArgs) => <UgClose {...props} />;

export { Close };
