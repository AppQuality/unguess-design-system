import { ProductCardProps } from "./_types";
import { Card } from "../cards";
import { Tag } from "../tags";
import { Label } from "../label";
import { theme } from "../theme";
import styled from "styled-components";
import { CampaignCardSkeleton } from "../campaign-cards/skeleton";
import { Button } from "../buttons/button";

const Wrapper = styled(Card)`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  padding: ${({ theme }) => theme.components.notification.card.padding};
  border: 1px solid ${({ theme }) => theme.palette.grey["200"]};
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.boxShadow(theme)};
  }
`;

const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${({ theme }) => theme.space.base}px
    ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.white};
  position: absolute;
  right: 16px;
  top: 16px;
`;

const StyledLabel = styled(Label)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.palette.grey["500"]};
  cursor: pointer;
`;

const StyledTitleLabel = styled(Label)`
  color: ${({ theme }) => theme.palette.blue["600"]};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  word-wrap: break-word;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: ${({ theme }) => theme.space.sm} 0;
  background-color: ${({ theme }) => theme.palette.grey["300"]};
`;

const IconContainer = styled.div`
  padding: ${({ theme }) => theme.components.notification.card.padding};
  margin: auto;
  svg {
    max-width: 42px;
    width: 100%;
    height: auto;
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  cursor: pointer;
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const ProductCard = (props: ProductCardProps) => {
  const { isNew, productTitle, labelNew } = props;

  let productTitleCut = productTitle;
  if (productTitle.length > 42) {
    productTitleCut = `${productTitle.substring(0, 39)}...`;
  }

  return props.isLoading ? (
    <CampaignCardSkeleton />
  ) : (
    <Wrapper {...props} >
      <CardBody onClick={props.onCtaClick}>
        {isNew && (
          <StyledTagNew
            hue={theme.palette.fuschia["600"]}
            isPill
            size="medium"
            title={labelNew ? labelNew : "New!"}
          >
            {labelNew ? labelNew : "New!"}
          </StyledTagNew>
        )}
        {props.icon && <IconContainer>{props.icon}</IconContainer>}
        
        {props.preTitle && (
          <StyledLabel isRegular>{props.preTitle}</StyledLabel>
        )}

        <StyledTitleLabel isRegular>{productTitleCut}</StyledTitleLabel>
        
      </CardBody>
      <Divider />
      <CardFooter>
        <Button
          isPill
          isPrimary
          onClick={props.onCtaClick}
        >
          {props.ctaLabel}
        </Button>
      </CardFooter>
    </Wrapper>
  );
};

export { ProductCard };
