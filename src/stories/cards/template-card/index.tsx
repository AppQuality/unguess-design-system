import React from "react";
import { ReactComponent as LightningBoltIcon } from "../../../assets/icons/bolt-icon-fill.svg";
import { ReactComponent as TailoredTemplate } from "../../../assets/icons/tailored_template.svg";
import { ReactComponent as UnguessTemplate } from "../../../assets/icons/unguess_template.svg";
import { ReactComponent as PriceIcon } from "../../../assets/icons/lock-fill.svg";
import { ReactComponent as UsersIcon } from "../../../assets/icons/user-group-fill.svg";
import { SpecialCard } from "../../special-cards";
import { Tag } from "../../tags";
import { theme } from "../../theme";
import { getColor } from "../../theme/utils";
import { LG, SM } from "../../typography/typescale";
import styled from "styled-components";

export interface TemplateCardsProps
  extends React.ComponentProps<typeof SpecialCard> {
  isFast?: boolean;
  isTailored?: boolean;
  lineClamp?: number;
  thumbUrl?: string;
  title: string;
  superTitle?: string;
  description: string;
  i18n: {
    tailoredHeader: string;
    unguessHeader: string;
  };
}

const TemplateCardFooter = ({ children }: { children: React.ReactNode }) => (
  <SpecialCard.Footer style={{ justifyContent: "left" }}>
    {children}
  </SpecialCard.Footer>
);

const Textgradient = styled.span`
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-image: linear-gradient(91deg, #003a57 11.98%, #00b280 100%);
`;

const PriceTag = ({ text }: { text: string }) => (
  <Tag isPill size="medium" title="Price">
    <Tag.Avatar>
      <PriceIcon />
    </Tag.Avatar>
    <Textgradient>{text}</Textgradient>
  </Tag>
);

const UserTag = ({ text }: { text: string }) => (
  <Tag isPill size="medium" title="Users">
    <Tag.Avatar>
      <UsersIcon />
    </Tag.Avatar>
    {text}
  </Tag>
);

const Meta = ({
  isTailored,
  i18n,
}: {
  isTailored?: boolean;
  i18n: TemplateCardsProps["i18n"];
}) => (
  <StyledMetaContainer>
    {isTailored ? <TailoredTemplate /> : <UnguessTemplate />}
    <SM color={theme.palette.grey[800]} isBold>
      {isTailored ? i18n.tailoredHeader : i18n.unguessHeader}
    </SM>
  </StyledMetaContainer>
);

const StyledImage = styled.img`
  width: auto;
  height: 64px;
  object-fit: cover;
`;

const StyledMetaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.space.xs};
`;

const TemplateCard = ({
  title,
  superTitle,
  description,
  isFast,
  isTailored,
  lineClamp,
  children,
  i18n,
  ...props
}: TemplateCardsProps) => {
  return (
    <SpecialCard {...props}>
      <SpecialCard.Meta>
        <Meta isTailored={isTailored} i18n={i18n} />
        {isFast && (
          <Tag
            hue={theme.palette.lemon["500"]}
            color={theme.palette.royal[900]}
            isPill
            size="medium"
            title={"Fast"}
          >
            <Tag.Avatar>
              <LightningBoltIcon color={theme.palette.royal[600]} />
            </Tag.Avatar>
            FAST
          </Tag>
        )}
      </SpecialCard.Meta>
      {props.thumbUrl && (
        <SpecialCard.Thumb style={{ maxWidth: "100%", maxHeight: "72px" }}>
          <StyledImage alt={title} src={props.thumbUrl} />
        </SpecialCard.Thumb>
      )}
      <SpecialCard.Header style={{ flexGrow: "unset" }}>
        {superTitle && (
          <SM
            style={{ marginBottom: theme.space.xs }}
            color={theme.palette.grey[600]}
          >
            {superTitle}
          </SM>
        )}
        <LG
          isBold
          color={getColor(theme.colors.primaryHue, 600)}
          style={{ marginBottom: theme.space.xs }}
        >
          {title}
        </LG>
      </SpecialCard.Header>
      <SpecialCard.Body lines={lineClamp} title={description}>
        {description}
      </SpecialCard.Body>
      {children}
    </SpecialCard>
  );
};

TemplateCard.Footer = TemplateCardFooter;
TemplateCard.PriceTag = PriceTag;
TemplateCard.UserTag = UserTag;
TemplateCard.Meta = Meta;

export { TemplateCard };
