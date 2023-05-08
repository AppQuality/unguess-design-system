import styled from "styled-components";
import { Col } from "../../../grid/col";
import { Row } from "../../../grid/row";
import { getColor } from "../../../theme/utils";
import { LG, MD } from "../../../typography/typescale";
import { PageHeaderMainProps } from "../_types";

const MainContainer = styled.div`
  width: 100%;
`;

const InformationContainer = styled.div`
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

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const MainOverline = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const MainTitle = styled.h1`
  color: ${({ theme }) => getColor(theme.colors.primaryHue, 600)};
  font-size: ${({ theme }) => theme.fontSizes.xxxl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: ${({ theme }) => theme.lineHeights.xxxl};
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.sm};
`;

export const MainDescription = styled(LG)`
  color: ${({ theme }) => theme.palette.grey[600]};
  line-height: ${({ theme }) => theme.lineHeights.lg};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const MainMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const StyledCol = styled(Col)`
  margin-bottom: 0;
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
        <StyledCol xs={12} sm={props.mainImageUrl ? 6 : 12}>
          <InformationContainer>{props.children}</InformationContainer>
        </StyledCol>
        {props.mainImageUrl && (
          <StyledCol xs={12} sm={props.mainImageUrl ? 6 : 12}>
            <MetaContainer>
              <Image
                src={props.mainImageUrl}
                title={props.mainTitle}
                alt={props.mainTitle}
              />
            </MetaContainer>
          </StyledCol>
        )}
      </Row>
    </MainContainer>
  );
};
