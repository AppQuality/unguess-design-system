import { Button as ZendeskButton, IButtonProps } from '@zendeskgarden/react-buttons'; 
import styled from 'styled-components';

const DressBerryButton = styled(ZendeskButton)`
    padding: 0.5rem 1rem;
    background-color: magenta;
    color: white;
`;


export const Button = (props: IButtonProps) => <DressBerryButton {...props} />;
