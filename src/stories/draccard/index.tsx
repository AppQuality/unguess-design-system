import styled from "styled-components";
import { DracCardArgs } from "./_types";
import { LG, MD, SM } from "../typography/typescale";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { theme } from "../theme";

/**
 * DracCard are Cards styled with icons and images to engage CTA.

 * Used for this:
    - Like Radios, Tiles are for choices that can't occur at the same time

 * Not for this:
    - To choose more than one option at once, use a Checkbox instead
    - To select from a long list of options, use a Select
    - To define an action, use a Button instead
    - For navigation, use an Anchor instead
 */

const DracCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 4px 8px 0px rgba(47, 57, 65, 0.15);
  &:hover {
    box-shadow: 0px 20px 28px 0px rgba(47, 57, 65, 0.35);
  }
  border-radius: ${({ theme }) => theme.borderRadii.lg};
`;

const DracCardHeader = styled.div<{ headerBackground: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.headerBackground};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: ${({ theme }) =>
    `${theme.borderRadii.lg} ${theme.borderRadii.lg} 0 0`};
`;

const DracCardTextContaier = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledSM = styled(SM)<{ isStrikethrough: boolean }>`
  text-decoration: ${(props) =>
    props.isStrikethrough ? "line-through" : "none"};
`;
const DracCardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.palette.white[800]};
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: ${({ theme }) =>
    `0 0 ${theme.borderRadii.lg} ${theme.borderRadii.lg}`};
`;
const DracCardAdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

const DracCard = (props: DracCardArgs) => {
  return (
    <DracCardContainer>
      <DracCardHeader headerBackground={props.background}>
        <DracCardTextContaier>
          <SM color="white">{props.description}</SM>
          <LG color="white" isBold>
            {props.title}
          </LG>
        </DracCardTextContaier>
        {props.icon}
      </DracCardHeader>
      <DracCardBody>
        <DracCardTextContaier>
          {props.price.firstRow && (
            <StyledSM
              color={`${theme.palette.grey[600]}`}
              isStrikethrough={props.price.firstRow.isStrikeThrough}
            >
              {props.price.firstRow.value}
            </StyledSM>
          )}
          <MD style={{ color: props.background, fontWeight: 500 }}>
            {props.price.currentPrice}
          </MD>
        </DracCardTextContaier>
        <DracCardAdditionalInfo>
          {props.additionalInfo.map((info) => (
            <div key={info.text}>
              {info.icon}
              <SM color={`${theme.palette.grey[700]}`}>{info.text}</SM>
            </div>
          ))}
          <ArrowRight color={props.background} />
        </DracCardAdditionalInfo>
      </DracCardBody>
    </DracCardContainer>
  );
};

export { DracCard };
