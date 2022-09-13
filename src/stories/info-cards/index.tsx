import { InfoCardProps } from "./_types";
import styled from "styled-components";
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
    <SpecialCard
      {...(props.infoTitle && { title: props.infoTitle })}
      {...props}
    >
      {props.infoImg && (
        <SpecialCard.Thumb isStretched>{props.infoImg}</SpecialCard.Thumb>
      )}
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
          <ButtonsWrap>{props.infoButtons.map((button) => button)}</ButtonsWrap>
        </SpecialCard.Footer>
      )}
    </SpecialCard>
  );
};

export { InfoCard };
