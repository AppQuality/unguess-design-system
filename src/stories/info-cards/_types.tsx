import { CardProps } from "../cards/_types";

export interface InfoCardProps extends CardProps {
    infoImg: React.ReactNode;
    infoSubtitle: string;
    infoTitle: string;
    infoButtons?: Array<React.ReactNode>;
}