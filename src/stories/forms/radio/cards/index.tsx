import { RadioCardArgs } from "./_types";
import { Card } from "../../../cards";
import { cardStyle } from "../../../theme/mixins";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/check-lg.svg";
import { Divider } from "../../../campaign-cards";
import { LG } from "@zendeskgarden/react-typography";
import styled from "styled-components";

interface CircleProps {
   checked: boolean;
}

const StyledCard = styled(Card)`
   ${cardStyle}
   text-align: center;
   justify-content: center;
   align-items: center;

   &.card-active {
      border-color: ${({ theme }) => theme.palette.blue[300]};
   }
`;

const IconWrapper = styled.div`
   margin: ${({ theme }) => theme.space.base}px auto;
`;

const StyledText = styled(LG)`
   margin: ${({ theme }) => theme.space.base}px auto;
   color: ${({ theme }) => theme.palette.grey[600]};
   font-weight: ${({ theme }) => theme.fontWeights.medium};
   color: ${({ theme }) => theme.colors.primaryHue};
   user-select: none;

   &:focus {
      outline: 0;
   }
`;

const Circle = styled.div<CircleProps>`
   width: ${({ theme }) => theme.space.base * 6}px;
   height: ${({ theme }) => theme.space.base * 6}px;
   padding: ${({ theme }) => theme.space.base * 1.25}px;
   border-radius: 50%;
   background-color: ${({ theme }) => theme.colors.primaryHue};
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   margin-left: auto;
   ${({ checked }) => !checked && `
      opacity: 0;
      visibility: hidden;
   `}
`;

const StyledDivider = styled(Divider)`
   background-color: ${({ theme }) => theme.palette.blue[100]};
   margin: ${({ theme }) => theme.space.base * 4}px auto;
`;

const RadioCard = ({ card, icon, iconActive, ...props }: RadioCardArgs) => {
   return (
      <StyledCard {...card} {...props} className={props.checked ? "card-active" : ""} onClick={() => { props.onChecked && props.onChecked(props.value) }}>
         <Circle checked={props.checked ?? false}><CheckIcon fill="white" /></Circle>
         <IconWrapper>{(iconActive && props.checked) ? iconActive : icon}</IconWrapper>
         <input hidden type="radio" value={props.value} name={props.name} checked={props.checked} />
         <StyledDivider />
         <StyledText>{props.label}</StyledText>
      </StyledCard>
   )
}

export { RadioCard };