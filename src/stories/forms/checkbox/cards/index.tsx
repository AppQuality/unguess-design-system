import { Checkbox } from "../.";
import { CheckboxCardArgs } from "./_types";
import { Card } from "../../../cards";
import { Label } from "../../../label";
import styled from "styled-components";
import { cardStyle } from "../../../theme/mixins";
import { useState } from "react";

const StyledCard = styled(Card)`
   ${cardStyle}
   text-align: center;
   justify-content: center;
   align-items: center;

   &.card-active {
      border-color: ${({theme}) => theme.palette.blue[300]};
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

const CheckboxCard = (props: CheckboxCardArgs) => {
   const [checked, setChecked] = useState(props.defaultChecked || false);

   const handleToggle = () => {
      setChecked(!checked);
      props.onToggle && props.onToggle(checked);
   };

   return (
      <StyledCard {...props.card} {...props} {...props && !props.disabled && {onClick: handleToggle} } className={checked ? "card-active" : ""}>
         <IconWrapper>{(props.iconActive && checked) ? props.iconActive : props.icon}</IconWrapper>
         <LabelWrapper>{props.label}</LabelWrapper>
         <Checkbox {...props} checked={checked} value={checked ? 1 : 0} onClick={(e) => e.stopPropagation()}>
            <StyledLabel hidden>{props.label}</StyledLabel>
         </Checkbox>
      </StyledCard>
   )
}

export { CheckboxCard };