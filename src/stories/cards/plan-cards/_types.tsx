import { SpecialCardProps } from "../../special-cards/_types";

export type IPlanStatus = "draft" | "pending_review";

export interface PlanCardsProps extends SpecialCardProps {
  /**
   * the main topic of the card
   */
  projectTitle: string; // title
  /**
   * a specification to the topic of the card
   */
  campaignTitle: string; // subTitle
  /**
   * the status of the card,
   * can be only
   * "draft" or "pending_review"
   * default is "INCOMING"
   */
  status?: IPlanStatus;

  i18n?: {
    statusLabel?: string;
    /**Default: Plan */
    planLabel?: string;
  };

  isLoading?: boolean;
}
