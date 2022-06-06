import { Checkbox } from "../.";
import { CheckboxCardArgs } from "./_types";
import { Card } from "../../../cards";
import { Label } from "../../../label";
import styled from "styled-components";
import { cardStyle } from "../../../theme/mixins";
import { useState } from "react";
import { theme } from "../../../theme";
import { SpecialCard } from "../../../special-cards";
import { MD } from "../../../typography/typescale";

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
  color: ${({ theme }) => theme.palette.grey[700]};
  user-select: none;

  &:focus {
    outline: 0;
  }
`;

const StyledLabel = styled(Label)`
  margin: ${({ theme }) => theme.space.base}px auto;
`;

const CheckboxCard = (props: CheckboxCardArgs) => {
  const { card: cardArgs } = props;
  const [checked, setChecked] = useState(props.defaultChecked || false);
  const handleToggle = () => {
    setChecked(!checked);
    props.onToggle && props.onToggle(!checked);
  };

  return (
    <SpecialCard
      title={props.label}
      {...cardArgs}
      {...(props && !props.disabled && { onClick: handleToggle })}
      className={checked ? "card-active" : ""}
    >
      <SpecialCard.Thumb isStretched>
        {props.iconActive && checked ? props.iconActive : props.icon}
      </SpecialCard.Thumb>

      <SpecialCard.Header align="center">
        <SpecialCard.Header.Text>
          <MD isBold style={checked ? { color: theme.colors.primaryHue } : {}}>
            {props.label}
          </MD>
        </SpecialCard.Header.Text>
      </SpecialCard.Header>

      <SpecialCard.Footer direction="column" justifyContent="center" noDivider>
        <Checkbox
          {...props}
          checked={checked}
          value={checked ? 1 : 0}
          onClick={(e) => e.stopPropagation()}
        >
          <StyledLabel hidden>{props.label}</StyledLabel>
        </Checkbox>
      </SpecialCard.Footer>
    </SpecialCard>
  );
};

export { CheckboxCard };
