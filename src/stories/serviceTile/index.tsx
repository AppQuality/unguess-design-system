import styled from "styled-components";
import { ServiceTileArgs } from "./_types";
import { LG, MD, SM } from "../typography/typescale";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { theme } from "../theme";

/**
 * ServiceTile are Cards styled with icons and images to engage CTA.

 * Used for this:
    - Like Radios, Tiles are for choices that can't occur at the same time

 * Not for this:
    - To choose more than one option at once, use a Checkbox instead
    - To select from a long list of options, use a Select
    - To define an action, use a Button instead
    - For navigation, use an Anchor instead
 */

const ServiceTileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 8px 0px rgba(47, 57, 65, 0.15);
  &:hover {
    box-shadow: 0px 20px 28px 0px rgba(47, 57, 65, 0.35);
  }
  border-radius: ${({ theme }) => theme.borderRadii.lg};
`;

const ServiceTileHeader = styled.div<{ headerBackground: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.headerBackground};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) =>
    `${theme.borderRadii.lg} ${theme.borderRadii.lg} 0 0`};
`;

const ServiceTileTextContaier = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
`;
const StyledSM = styled(SM)<{ isStrikethrough: boolean }>`
  text-decoration: ${(props) =>
    props.isStrikethrough ? "line-through" : "none"};
`;
const ServiceTileBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.palette.white[800]};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) =>
    `0 0 ${theme.borderRadii.lg} ${theme.borderRadii.lg}`};
`;
const ServiceTileAdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const MeasurementWrapper = styled.span`
  background: linear-gradient(91deg, #003a57 11.98%, #00b280 100%);
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ServiceTile = (props: ServiceTileArgs) => {
  return (
    <ServiceTileContainer onClick={props.onClick}>
      <ServiceTileHeader headerBackground={props.background}>
        <ServiceTileTextContaier>
          <SM color="white">{props.description}</SM>
          <LG color="white" isBold>
            {props.title}
          </LG>
        </ServiceTileTextContaier>
        {props.icon}
      </ServiceTileHeader>
      <ServiceTileBody>
        <ServiceTileTextContaier>
          {props.price.firstRow && (
            <StyledSM
              isBold
              color={`${theme.palette.grey[600]}`}
              isStrikethrough={props.price.firstRow.isStrikeThrough}
            >
              {props.price.firstRow.value}
            </StyledSM>
          )}
          <MD isBold>
            {props.price.currentPrice}{" "}
            <MeasurementWrapper>Token</MeasurementWrapper>
          </MD>
        </ServiceTileTextContaier>
        <ServiceTileAdditionalInfo>
          {props.additionalInfo.map((info) => (
            <div
              key={info.text}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              {info.icon}
              <SM isBold color={`${theme.palette.grey[700]}`}>
                {info.text}
              </SM>
            </div>
          ))}
          <ArrowRight />
        </ServiceTileAdditionalInfo>
      </ServiceTileBody>
    </ServiceTileContainer>
  );
};

export { ServiceTile };
