import { LG, SM } from "../typography/typescale";
import { Card } from "../cards";
import { Tag } from "../tags";
import { theme } from "../theme";
import { cardStyle } from "../theme/mixins";
import { ServiceCardsProps } from "./_types";
import styled from "styled-components";

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

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: flex-start;
`;

const IconContainer = styled.div`
    width: 100%;
    max-width: ${({ theme }) => theme.space.base * 16}px;
    height: 100%;
    max-height: ${({ theme }) => theme.space.base * 16}px;

    svg {
        width: 100%;
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
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: ${({ theme }) => theme.space.base}px;

    button {
        margin-top: ${({ theme }) => theme.space.sm};
    }
`;

const HoverBody = styled(CardBody)`
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
`;

const HoverMetaContainer = styled.div``;

const StyledCard = styled(Card) <ServiceCardsProps>`
    ${cardStyle}

    ${({ isHoverable }) => isHoverable && `
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
                            {props.hoverButtons.map((button, index) => (
                                button
                            ))}
                        </ButtonsWrap>
                    )}
                </HoverBody>
            )}
            <CardContent>
                {props.serviceIcon && (
                    <CardHeader>
                        <IconContainer>{props.serviceIcon}</IconContainer>
                    </CardHeader>
                )}
                <CardBody>
                    {props.serviceSubtitle && (
                        <ServiceSubtitle>{props.serviceSubtitle}</ServiceSubtitle>
                    )}
                    {props.serviceTitle && (
                        <ServiceTitle>{props.serviceTitle}</ServiceTitle>
                    )}
                </CardBody>
                {props.tags && (
                    <FooterContent>
                        <Divider />
                        <CardFooter>
                            {props.tags.map((tag, index) => (
                                <StyledTag
                                    key={index}
                                    size="large"
                                    isPill
                                    isRegular
                                    hue={theme.palette.grey[100]}
                                >
                                    <StyledTag.Avatar>{tag.icon}</StyledTag.Avatar>
                                    {tag.label}
                                </StyledTag>
                            ))}
                        </CardFooter>
                    </FooterContent>
                )}
            </CardContent>
        </StyledCard>
    )
}

export { ServiceCard }; 