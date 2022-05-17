import { LG, SM } from "@zendeskgarden/react-typography";
import styled from "styled-components";
import { Card } from "../cards";
import { Tag } from "../tags";
import { theme } from "../theme";
import { cardStyle } from "../theme/mixins";
import { ServiceCardsProps } from "./_types";

const StyledCard = styled(Card)`
  ${cardStyle}
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

const ServiceSubtitle = styled(SM)`
    color: ${({ theme }) => theme.palette.grey[500]};
    margin-bottom: ${({ theme }) => theme.space.base}px;
`;

const ServiceTitle = styled(LG)`
    color: ${({ theme }) => theme.palette.blue[600]};
    margin-bottom: ${({ theme }) => theme.space.base}px;
`;

const StyledTag = styled(Tag)`
    margin-right: ${({ theme }) => theme.space.xs};
`;

const ServiceCard = (props: ServiceCardsProps) => {

    return (
        <StyledCard>
            <CardHeader>
                <IconContainer>{props.service_icon}</IconContainer>
            </CardHeader>
            <CardBody>
                <ServiceSubtitle>{props.service_subtitle}</ServiceSubtitle>
                <ServiceTitle>{props.service_title}</ServiceTitle>
            </CardBody>
            {props.tags && (
                <>
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
                </>
            )}
        </StyledCard>
    )
}

export { ServiceCard }; 