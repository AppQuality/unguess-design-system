import { Button as ZendeskButton, IButtonProps } from '@zendeskgarden/react-buttons'; 
import styled from 'styled-components';

const DressBerryButton = styled(ZendeskButton)`
    padding: 0.5rem 2rem;
`;


export const Button = (props: IButtonProps) => <DressBerryButton {...props} />;
