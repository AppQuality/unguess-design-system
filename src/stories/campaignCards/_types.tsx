import { CardProps } from "../cards/_types";

export interface CampaignCardsProps  extends CardProps{
  /**
   * displays a new tag in the top right
   */
  isNew?: boolean;
  /**
   * displays the date, if is the current day, the word "Today" will be shown instead
   * use this format DD/MM/YYYY
   */
  date: string;
  /**
   * the main topic of the card
   */
  title: string;
  /**
   * a specification to the topic of the card
   */
  subTitle: string;
  /**
   * the status of the card,
   * can be only
   * "COMPLETED" or "PROGRESS" or "INCOMING"
   * default is "INCOMING"
   */
  status?: 'COMPLETED' | 'PROGRESS' | 'INCOMING';
  /**
   * this renders the pill of the card,
   * can be only
   * "FUNCTIONAL" or "EXPERIENTIAL"
   * if nothing of that is chosen the pill will not be shown
   */
  type?: 'FUNCTIONAL' | 'EXPERIENTIAL';
  /**
   * this renders the pill text
   * if the value is not defined the pill text will not be shown
   */
  pillText?: string;
}