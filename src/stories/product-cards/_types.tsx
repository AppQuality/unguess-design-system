import { CardProps } from "../cards/_types";

export interface ProductCardProps extends CardProps {
  /**
   * displays a new tag in the top right
   */
  isNew?: boolean;
  /**
   * this renders the new flag label
   */
   labelNew?: string;
  /**
   * displays product icon
   */
  icon?: React.ReactElement;
  /**
   * Category, pre-header or any other useful information
   */
  preTitle?: string; 
  /**
   * Card Title
   */
  productTitle: string;
  /**
   * Display the skeleton
   */
  isLoading?: boolean;

  /**
   * Text inside the cta button
   */
  ctaLabel: string;

  /**
   * On Cta click
   */
  onCtaClick: () => void;
}
