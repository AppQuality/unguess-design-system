import { Card } from "../cards";
import { theme } from "../theme";
import { cardStyle } from "../theme/mixins";
import { InfoCardProps } from "./_types";
import styled from "styled-components";
import { LG, SM } from "../typography/typescale";
import { SpecialCard } from "../special-cards";

const StyledCard = styled(Card)`
  ${cardStyle}
`;

const CardContent = styled.div`
  z-index: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
`;

const FooterContent = styled.div`
  padding-top: ${({ theme }) => theme.space.sm};
  margin-top: auto;
  width: 100%;
`;

const ButtonsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;

  button {
    padding: ${({ theme }) => theme.space.xxs} 0;
  }

  button:not(:first-child) {
    margin-top: ${({ theme }) => theme.space.xs};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
`;

const ImgContainer = styled.div`
  width: 100%;

  svg,
  img {
    width: 100%;
    max-width: 100%;
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.space.sm};
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: ${({ theme }) => theme.space.sm};
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.space.base}px 0;
  background-color: ${({ theme }) => theme.palette.grey["300"]};
`;

const InfoSubtitle = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-bottom: ${({ theme }) => theme.space.base}px;
`;

const InfoTitle = styled(LG)`
  color: ${({ theme }) => theme.palette.blue[600]};
  margin-bottom: ${({ theme }) => theme.space.base}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const InfoCard = (props: InfoCardProps) => {
  return (
    <SpecialCard {...props}>
      {props.infoImg && <SpecialCard.Thumb>{props.infoImg}</SpecialCard.Thumb>}
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
