import { ProductCardProps } from "./_types";
import { Card } from "../cards";
import { Tag } from "../tags";
import { Label } from "../label";
import { theme } from "../theme";
import styled from "styled-components";
import { CampaignCardSkeleton } from "../campaign-cards/skeleton";
import { Button } from "../buttons/button";
import { SpecialCard } from "../special-cards";
import { Ellipsis } from "../typography/ellipsis";

const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${({ theme }) => theme.space.base}px
    ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.white};
  position: absolute;
  right: 16px;
  top: 16px;
`;

const ProductCard = (props: ProductCardProps) => {
  const { isNew, productTitle, labelNew } = props;

  return props.isLoading ? (
    <CampaignCardSkeleton />
  ) : (
    <SpecialCard {...props}>
      <SpecialCard.Meta>
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
      </SpecialCard.Meta>
      {props.icon && <SpecialCard.Thumb>{props.icon}</SpecialCard.Thumb>}

      <SpecialCard.Header onClick={props.onCtaClick}>
        {props.preTitle && (
          <SpecialCard.Header.Label>
            <Ellipsis style={{ width: "200px" }}>{props.preTitle}</Ellipsis>
          </SpecialCard.Header.Label>
        )}
        <SpecialCard.Header.Title>
          <Ellipsis style={{ width: "200px" }}>{productTitle}</Ellipsis>
        </SpecialCard.Header.Title>
      </SpecialCard.Header>
      <SpecialCard.Footer direction="column" justifyContent="center">
        <Button
          isPill
          isPrimary
          onClick={props.onCtaClick}
          themeColor={theme.palette.water[600]}
        >
          {props.ctaLabel}
        </Button>
      </SpecialCard.Footer>
    </SpecialCard>
  );
};

export { ProductCard };
