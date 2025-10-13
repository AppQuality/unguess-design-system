import { SpecialCardProps } from "../../special-cards/_types";

export type IPlanStatus =
  | 'UnquotedDraft'
  | 'PrequotedDraft'
  | 'PurchasableDraft'
  | 'Submitted'
  | 'OpsCheck'
  | 'AwaitingApproval'
  | 'Accepted'
  | 'RunningPlan'
  | 'AwaitingPayment'
  | 'Paying'
  | 'PurchasedPlan';

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
