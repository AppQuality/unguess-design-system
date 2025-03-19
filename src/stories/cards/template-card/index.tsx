import { SpecialCard } from "../../special-cards";
import { Tag } from "../../tags";
import { theme } from "../../theme";
import { ReactComponent as UnguessTemplate } from "../../../assets/icons/unguess_template.svg";
import { ReactComponent as TailoredTemplate } from "../../../assets/icons/tailored_template.svg";
import { LG, MD, SM } from "../../typography/typescale";
import { getColor } from "../../theme/utils";

export interface TemplateCardsProps extends React.ComponentProps<typeof SpecialCard> {
  isLoading?: boolean;
  isFast?: boolean;
  isTailored?: boolean;
  title: string;
  description: string;
}

const TemplateCard = ({
  title,
  description,
  isFast,
  isTailored,
  isLoading,
  children,
  ...props
}: TemplateCardsProps) => {
  if (isLoading) return '...loading';

  return (
    <SpecialCard {...props}>
      {isFast && (
        <SpecialCard.Meta>
          <div style={{ display: "flex", alignItems: "center", gap: theme.space.xs }}>
            {isTailored ? <TailoredTemplate /> : <UnguessTemplate />}
            <SM isBold>{isTailored
              ? "Tailored"
              : "UNGUESS Template"
            }</SM>
          </div>
          <Tag
            hue={theme.palette.yellow["600"]}
            isPill
            size="medium"
            title={"Fast"}
          >
            {"Fast"}
          </Tag>
        </SpecialCard.Meta>
      )}
      <SpecialCard.Header>
        <LG isBold color={getColor(theme.colors.primaryHue, 600)} style={{marginBottom: theme.space.xs}}>{title}</LG>
        <MD color={theme.palette.grey[700]}>{description}</MD>
      </SpecialCard.Header>
      {children}
    </SpecialCard>
  );
};

TemplateCard.Footer = SpecialCard.Footer;

export { TemplateCard };