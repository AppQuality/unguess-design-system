import styled from "styled-components";
import { Col } from "../../../grid/col";
import { Row } from "../../../grid/row";
import { theme } from "../../../theme";
import { Paragraph } from "../../../typography/paragraph";
import { MD } from "../../../typography/typescale";
import { PageHeaderMainProps } from "../_types";

const MainContainer = styled.div`
  width: 100%;
`;

const InformationContainer = styled.div`
  padding: ${theme.space.xs} 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100%;
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Overline = styled(MD)`
  color: ${theme.palette.grey[600]};
  margin-bottom: ${theme.space.md};
  font-weight: ${theme.fontWeights.semibold};
  line-height: ${theme.lineHeights.md};
`;

const Title = styled.h1`
  color: ${theme.colors.primaryHue};
  font-size: ${theme.fontSizes.xxxl};
  font-weight: ${theme.fontWeights.semibold};
  line-height: ${theme.lineHeights.xxxl};
`;

const Description = styled(Paragraph)`
  color: ${theme.palette.grey[600]};
  margin: ${theme.space.md} 0;
  line-height: ${theme.lineHeights.lg};
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  max-height: ${theme.components.pageHeader.imgMaxHeight};
`;

const Counters = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${theme.space.md};

  > *:first-child {
    padding-left: 0;
  }
`;

const StyledCol = styled(Col)`
  margin: 0;
`

export const Main = (props: PageHeaderMainProps) => {
  return (
    <MainContainer>
      <Row>
        <StyledCol orderXs={2} orderSm={1} xs={12} sm={props.metaImage ? 6 : 12}>
          <InformationContainer>
            {props.infoOverline && <Overline>{props.infoOverline}</Overline>}
            {props.infoTitle && <Title>{props.infoTitle}</Title>}
            {props.infoDescription && (
              <Description>{props.infoDescription}</Description>
            )}
            {props.infoCounters && (
              <Counters>
                {props.infoCounters}
              </Counters>
            )}
          </InformationContainer>
        </StyledCol>
        {props.metaImage && (
          <StyledCol orderXs={1} orderSm={2} xs={12} sm={props.metaImage ? 6 : 12}>
            <MetaContainer>
              <Image src={props.metaImage} />
            </MetaContainer>
          </StyledCol>
        )}
      </Row>
    </MainContainer>
  );
};
