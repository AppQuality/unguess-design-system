import { Card } from "../cards";
import { theme } from "../theme";
import { cardStyle } from "../theme/mixins";
import { InfoCardProps } from "./_types";
import styled from "styled-components";
import { LG, SM } from "../typography/typescale";
import { SpecialCard } from "../special-cards";

const ButtonsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
`;

const InfoCard = (props: InfoCardProps) => {
  return (
    <SpecialCard {...props}>
      {props.infoImg && <SpecialCard.Thumb isStretched>{props.infoImg}</SpecialCard.Thumb>}
      <SpecialCard.Header>
        {props.infoSubtitle && (
          <SpecialCard.Header.Label>
            {props.infoSubtitle}
          </SpecialCard.Header.Label>
        )}
        {props.infoTitle && (
          <SpecialCard.Header.Title>{props.infoTitle}</SpecialCard.Header.Title>
        )}
      </SpecialCard.Header>
      {props.infoButtons && (
        <SpecialCard.Footer direction="column" justifyContent="center">
          <ButtonsWrap>
            {props.infoButtons.map((button, index) => button)}
          </ButtonsWrap>
        </SpecialCard.Footer>
      )}
    </SpecialCard>
  );
};

export { InfoCard };
