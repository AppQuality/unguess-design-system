import { Radio } from "../.";
import { RadioCardArgs } from "./_types";
import { Card } from "../../../cards";
import { Label } from "../../../label";
import styled from "styled-components";
import { cardStyle } from "../../../theme/mixins";

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

const LabelWrapper = styled(Label)`
   margin: ${({ theme }) => theme.space.base}px auto;
   color: ${({ theme }) => theme.palette.grey[600]};
   user-select: none;

   &:focus {
      outline: 0;
   }
`;

const StyledLabel = styled(Label)`
   margin: ${({ theme }) => theme.space.base}px auto;
`;

const RadioCard = ({ card, icon, iconActive, ...props }: RadioCardArgs) => {
   return (
      <StyledCard {...card} {...props} className={props.checked ? "card-active" : ""} onClick={() => { props.onChecked && props.onChecked(props.value) }}>
         <IconWrapper>{(iconActive && props.checked) ? iconActive : icon}</IconWrapper>
         <LabelWrapper>{props.label}</LabelWrapper>
         <Radio {...props} checked={props.checked} onClick={(e) => { e.stopPropagation(); { props.onChecked && props.onChecked(props.value) } }}>
            <StyledLabel hidden>{props.label}</StyledLabel>
         </Radio>
      </StyledCard>
   )
}

export { RadioCard };