import styled from "styled-components";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow-right.svg";
import { theme } from "../theme";
import { LG, MD, SM } from "../typography/typescale";

const Container = styled.div`
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

const Header = styled.div<{ headerBackground: string }>`
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

const TextContainer = styled.div`
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
const Body = styled.div`
  position: relative;
  background: ${({ theme }) => theme.palette.white};
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.xxl} ${theme.space.sm} ${theme.space.md}`};
  border-radius: ${({ theme }) =>
    `0 0 ${theme.borderRadii.lg} ${theme.borderRadii.lg}`};
  .footer-icon {
    position: absolute;
    right: ${p => p.theme.space.md};
    bottom: ${p => p.theme.space.sm};
  }
`;
const AdditionalInfo = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.space.xxs};
`;

const PriceWrapper = styled(MD)`
  flex: 0 0 auto;
  background: linear-gradient(91deg, ${p => p.theme.palette.blue[600]} 11.98%,${p => p.theme.palette.green[400]}   100%);
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
    <Container onClick={props.onClick}>
      <Header headerBackground={props.background}>
        <TextContainer>
          <SM color="white">{props.description}</SM>
          <LG color="white" isBold>
            {props.title}
          </LG>
        </TextContainer>
        {props.icon}
      </Header>
      <Body>
        {props.superscript && (
          <Superscript isStrikethrough={props.isSuperscriptStrikethrough}>
            {props.superscript}
          </Superscript>
        )}
        <AdditionalInfo>
          <PriceWrapper>{props.price}</PriceWrapper>
          {props.additionalInfo}
        </AdditionalInfo>
        <ArrowRight
          className="footer-icon"
          color={`${theme.palette.blue[700]}`}
          stroke={`${theme.palette.blue[700]}`}
        />
      </Body>
    </Container>
  );
};

export { ServiceTile };
