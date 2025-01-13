import styled from "styled-components";
import { DracCardArgs } from "./_types";

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
  align-items: flex-start;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.md}`};
  border-radius: ${({ theme }) => theme.borderRadii.sm};
  box-shadow: 0px 4px 8px 0px rgba(47, 57, 65, 0.15);
  &:hover {
    box-shadow: 0px 20px 28px 0px rgba(47, 57, 65, 0.35);
  }
`;

const DracCardHeader = styled.div<{ headerBackground: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${(props) => props.headerBackground};
`;

const DracCardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DracCard = (props: DracCardArgs) => {
  return (
    <DracCardContainer>
      <DracCardHeader headerBackground={props.background}></DracCardHeader>
      <DracCardBody></DracCardBody>
    </DracCardContainer>
  );
};

export { DracCard };
