import styled from "styled-components";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { theme } from "../theme";
import { LG, MD, SM } from "../typography/typescale";

const ServiceTileContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-shadow: 0px 4px 8px 0px rgba(47, 57, 65, 0.15);
  transition: box-shadow 0.3s;
  &:hover {
    box-shadow: 0px 20px 28px 0px rgba(47, 57, 65, 0.35);
  }
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  flex-grow: 1;
`;

const ServiceTileHeader = styled.div<{ headerBackground: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-grow: 1;
  background: ${(props) => props.headerBackground};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) =>
    `${theme.borderRadii.lg} ${theme.borderRadii.lg} 0 0`};

  gap: ${({ theme }) => theme.space.md};
  svg {
    flex-shrink: 0;
  }
`;

const ServiceTileTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xxs};
`;
const Superscript = styled(SM)<{ isStrikethrough?: boolean }>`
  text-decoration: ${(props) =>
    props.isStrikethrough ? "line-through" : "none"};
  color: ${({ theme }) => theme.palette.grey[600]};
`;
Superscript.defaultProps = {
  isBold: true,
};
const ServiceTileBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  background: ${({ theme }) => theme.palette.white[800]};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) =>
    `0 0 ${theme.borderRadii.lg} ${theme.borderRadii.lg}`};
`;
const ServiceTileAdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xxs};
`;

const PriceWrapper = styled(MD)`
  ${({ theme }) =>
    `background: linear-gradient(91deg, ${theme.palette.blue[600]} 11.98%,${theme.palette.green[400]}   100%);`}
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;
PriceWrapper.defaultProps = {
  isBold: true,
};

const ServiceTile = (props: {
  onClick?: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  price: string;
  superscript?: string;
  isSuperscriptStrikethrough?: boolean;
  additionalInfo?: React.ReactNode;
  background: string;
}) => {
  return (
    <ServiceTileContainer onClick={props.onClick}>
      <ServiceTileHeader headerBackground={props.background}>
        <ServiceTileTextContainer>
          <SM color="white">{props.description}</SM>
          <LG color="white" isBold>
            {props.title}
          </LG>
        </ServiceTileTextContainer>
        {props.icon}
      </ServiceTileHeader>
      <ServiceTileBody>
        <ServiceTileTextContainer>
          {props.superscript && (
            <Superscript isStrikethrough={props.isSuperscriptStrikethrough}>
              {props.superscript}
            </Superscript>
          )}
          <PriceWrapper>{props.price}</PriceWrapper>
        </ServiceTileTextContainer>
        <ServiceTileAdditionalInfo>
          {props.additionalInfo}
          <ArrowRight
            color={`${theme.palette.blue[700]}`}
            stroke={`${theme.palette.blue[700]}`}
          />
        </ServiceTileAdditionalInfo>
      </ServiceTileBody>
    </ServiceTileContainer>
  );
};

export { ServiceTile };
