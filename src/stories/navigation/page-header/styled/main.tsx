import styled from "styled-components";
import { Col } from "../../../grid/col";
import { Row } from "../../../grid/row";
import { LG, MD } from "../../../typography/typescale";
import { PageHeaderMainProps } from "../_types";

const MainContainer = styled.div`
  width: 100%;
`;

const InformationContainer = styled.div`
  padding: ${({ theme }) => theme.space.xs}; 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) 
    height: auto;
  } 
`;

const MetaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Overline = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.md};
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primaryHue};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.xxxl};
`;

const Description = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin: ${({ theme }) => theme.space.md} 0;
  line-height: ${({ theme }) => theme.lineHeights.lg};
`;

const Counters = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${({ theme }) => theme.space.md};

  > div {
    padding: 0;
    margin-right: ${({ theme }) => theme.space.sm};
  }
`;

const StyledCol = styled(Col)`
  margin: 0;
`;

const Image = styled.img`
  width: auto;
  height: 100%;
  max-height: ${({ theme }) => theme.components.pageHeader.imgMaxHeight};
`;

export const Main = (props: PageHeaderMainProps) => {
  return (
    <MainContainer>
      <Row>
        <StyledCol
          orderXs={2}
          orderSm={1}
          xs={12}
          sm={props.metaImage ? 6 : 12}
        >
          <InformationContainer>
            {props.infoOverline && <Overline>{props.infoOverline}</Overline>}
            {props.infoTitle && <Title>{props.infoTitle}</Title>}
            {props.infoDescription && (
              <Description>{props.infoDescription}</Description>
            )}
            {props.infoCounters && <Counters>{props.infoCounters}</Counters>}
          </InformationContainer>
        </StyledCol>
        {props.metaImage && (
          <StyledCol
            orderXs={1}
            orderSm={2}
            xs={12}
            sm={props.metaImage ? 6 : 12}
          >
            <MetaContainer>
              <Image
                src={props.metaImage}
                title={props.infoTitle}
                alt={props.infoTitle}
              />
            </MetaContainer>
          </StyledCol>
        )}
      </Row>
    </MainContainer>
  );
};
