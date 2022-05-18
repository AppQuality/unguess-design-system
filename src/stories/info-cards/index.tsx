import { Card } from "../cards";
import { theme } from "../theme";
import { cardStyle } from "../theme/mixins";
import { InfoCardProps } from "./_types";
import styled from "styled-components";
import { LG, SM } from "../typography/typescale";

const StyledCard = styled(Card)`
    ${cardStyle}
`;

const CardContent = styled.div`
    transition: all 0.3s ease-in-out;
    position: relative;
    z-index: 1;
`;

const FooterContent = styled.div`
    margin-top: ${({ theme }) => theme.space.sm};
`;

const ButtonsWrap = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;

    button {
        margin-top: ${({ theme }) => theme.space.sm};
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

    svg, img {
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
        <StyledCard {...props}>
            <CardContent>
                {props.infoImg && (
                    <CardHeader>
                        <ImgContainer>{props.infoImg}</ImgContainer>
                    </CardHeader>
                )}
                <CardBody>
                    {props.infoSubtitle && (
                        <InfoSubtitle>{props.infoSubtitle}</InfoSubtitle>
                    )}
                    {props.infoTitle && (
                        <InfoTitle>{props.infoTitle}</InfoTitle>
                    )}
                </CardBody>
                {props.infoButtons && (
                    <FooterContent>
                        <Divider />
                        <CardFooter>
                            {props.infoButtons && (
                                <ButtonsWrap>
                                    {props.infoButtons.map((button, index) => (
                                        button
                                    ))}
                                </ButtonsWrap>
                            )}
                        </CardFooter>
                    </FooterContent>
                )}
            </CardContent>
        </StyledCard>
    )
};

export { InfoCard };