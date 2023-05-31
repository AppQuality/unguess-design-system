import { RadioCardArgs } from "./_types";
import { ReactComponent as CheckIcon } from "../../../../assets/icons/check-lg.svg";
import { LG } from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { theme } from "../../../theme";
import { SpecialCard } from "../../../special-cards";
import { getColor } from "../../../theme/utils";

interface CircleProps {
  checked: boolean;
}

const StyledText = styled(LG)`
  margin: ${({ theme }) => theme.space.base}px auto;
  color: ${({ theme }) => theme.palette.grey[700]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
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
  background-color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  ${({ checked }) =>
    !checked &&
    `
      opacity: 0;
      visibility: hidden;
   `}
`;

const RadioCard = ({ card, icon, iconActive, ...props }: RadioCardArgs) => {
  return (
    <SpecialCard
      title={props.label}
      {...card}
      {...props}
      className={props.checked ? "card-active" : ""}
      onClick={() => {
        props.onChecked && props.onChecked(props.value);
      }}
    >
      <SpecialCard.Meta justifyContent={"end"}>
        <Circle checked={props.checked ?? false}>
          <CheckIcon fill="white" />
        </Circle>
      </SpecialCard.Meta>

      <SpecialCard.Thumb isStretched>
        {iconActive && props.checked ? iconActive : icon}
      </SpecialCard.Thumb>
      <input
        hidden
        type="radio"
        value={props.value}
        name={props.name}
        checked={props.checked}
      />
      <SpecialCard.Footer direction="column" justifyContent="center">
        <StyledText
          style={props.checked ? { color: getColor(theme.colors.primaryHue, 600) } : {}}
        >
          {props.label}
        </StyledText>
      </SpecialCard.Footer>
    </SpecialCard>
  );
};

export { RadioCard };
