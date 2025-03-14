import { SpecialCardProps } from "../../special-cards/_types";

export type IPlanStatus = "draft" | "submitted" | "pending_quote_review";

export interface PlanCardsProps extends SpecialCardProps {
  /**
   * the status of the card,
   * can be only
   * "draft" or "submitted" or "pending_quote_review"
   * default is "draft"
   */
  status?: IPlanStatus;

  i18n?: {
    statusLabel?: string;
    /**Default: Plan */
    planLabel?: string;
  };

  isLoading?: boolean;
}
