import { SpecialCardProps } from "../special-cards/_types";

interface ITag {
    label: string;
    icon: React.ReactNode;
}

export interface ServiceCardsProps extends SpecialCardProps {
    serviceIcon?: React.ReactNode;
    serviceTitle?: string;
    serviceSubtitle?: string;
    tags?: Array<ITag>;
    isHoverable?: boolean;
    hoverTitle?: string;
    hoverSubtitle?: string;
    hoverButtons?: Array<React.ReactNode>;
}