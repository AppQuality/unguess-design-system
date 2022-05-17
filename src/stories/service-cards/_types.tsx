import { CardProps } from "../cards/_types";

interface ITag {
    label: string;
    icon: React.ReactNode;
}

export interface ServiceCardsProps extends CardProps {
    service_icon: React.ReactElement;
    service_title: string;
    service_subtitle: string;
    tags?: Array<ITag>;
}