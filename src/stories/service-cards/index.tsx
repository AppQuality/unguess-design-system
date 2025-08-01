import { LG, SM } from "../typography/typescale";
import { Tag } from "../tags";
import { ServiceCardsProps } from "./_types";
import styled from "styled-components";
import { SpecialCard } from "../special-cards";

const ServiceSubtitle = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[500]};
  margin-bottom: ${({ theme }) => theme.space.base}px;
`;

const ServiceTitle = styled(LG)`
  color: ${({ theme }) => theme.palette.blue[600]};
  margin-bottom: ${({ theme }) => theme.space.base}px;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const StyledTag = styled(Tag)`
  margin-right: ${({ theme }) => theme.space.xs};
  margin-top: ${({ theme }) => theme.space.xs};
`;

const CardContent = styled.div`
  transition: all 0.3s ease-in-out;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  word-break: break-word;
`;

const ButtonsWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  margin-top: ${({ theme }) => theme.space.base}px;

  button {
    padding: ${({ theme }) => theme.space.xxs} 0;
  }

  button:not(:first-child) {
    margin-top: ${({ theme }) => theme.space.base * 4}px;
  }
`;

const HoverBody = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 100%;
  margin-top: 0;
  padding: ${({ theme }) => theme.components.notification.card.padding};
  background-color: ${({ theme }) => theme.palette.white};
  transition: all 0.3s ease-in-out;
  z-index: 2;
  display: flex;
  align-items: space-between;
  flex-direction: column;
  justify-content: space-between;
  word-break: break-word;
`;

const HoverMetaContainer = styled.div``;

const StyledCard = styled(SpecialCard)<ServiceCardsProps>`
  overflow: hidden;
  ${({ isHoverable }) =>
    isHoverable &&
    `
    &:hover {
        ${HoverBody} {
            top: 0;
            transition: all 0.3s ease-in-out;
        }

        ${CardContent} {
            opacity: 0;
            transition: all 0.3s ease-in-out;
        }
      }
    `}
`;

const ServiceCard = (props: ServiceCardsProps) => {
  const { serviceIcon, serviceTitle, serviceSubtitle } = props;
  return (
    <StyledCard {...props}>
      {props.isHoverable && (
        <HoverBody>
          <HoverMetaContainer>
            {props.hoverTitle && (
              <ServiceTitle>{props.hoverTitle}</ServiceTitle>
            )}
            {props.hoverSubtitle && (
              <ServiceSubtitle>{props.hoverSubtitle}</ServiceSubtitle>
            )}
          </HoverMetaContainer>
          {props.hoverButtons && (
            <ButtonsWrap>
              {props.hoverButtons.map((button) => button)}
            </ButtonsWrap>
          )}
        </HoverBody>
      )}
      <CardContent>
        <>
          {serviceIcon && <SpecialCard.Thumb>{serviceIcon}</SpecialCard.Thumb>}
          <SpecialCard.Header>
            <SpecialCard.Header.Label>
              {serviceSubtitle}
            </SpecialCard.Header.Label>
            <SpecialCard.Header.Title>{serviceTitle}</SpecialCard.Header.Title>
          </SpecialCard.Header>
        </>
        {props.tags && (
          <SpecialCard.Footer justifyContent={"start"} wrap>
            {props.tags.map((tag, index) => (
              <StyledTag key={index} size="large">
                <StyledTag.Avatar>{tag.icon}</StyledTag.Avatar>
                {tag.label}
              </StyledTag>
            ))}
          </SpecialCard.Footer>
        )}
      </CardContent>
    </StyledCard>
  );
};

export { ServiceCard };
