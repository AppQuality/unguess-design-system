import styled from "styled-components";
import { Modal } from "../../modals";


export const Footer = styled(Modal.Footer)`
    padding: ${({ theme }) => `${theme.space.base * 3.5}px ${theme.space.xl}`};
    display: flex;
    justify-content: space-between;
`;