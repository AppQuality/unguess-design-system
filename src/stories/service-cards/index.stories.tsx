import { ServiceCardsProps } from "./_types";
import { ComponentMeta, Story } from "@storybook/react";
import { ServiceCard } from "./index"
import { Col } from "../grid/col";
import { Row } from "../grid/row";
import { ReactComponent as ExploratoryIcon } from "../../assets/icons/service-exploratory-icon.svg";

const defaultArgs: ServiceCardsProps = {
    service_icon: <ExploratoryIcon />,
    service_title: "Exploratory",
    service_subtitle: "Explore the data",
    tags: [
        {
            label: "Explore",
            icon: <ExploratoryIcon />
        },
        {
            label: "Explore",
            icon: <ExploratoryIcon />
        },
    ]
}

const SingleTemplate: Story<ServiceCardsProps> = (args) => {
    return <ServiceCard {...args} />
}

export const SingleCard = SingleTemplate.bind({})
SingleCard.args = {
    ...defaultArgs
}

export default {
    title: "Molecules/Card/ServiceCard",
    component: ServiceCard,
    argTypes: {
        isRecessed: {
            table: {
                disable: true,
            },
        },
        isFloating: {
            table: {
                disable: true,
            },
        },
    },
} as ComponentMeta<typeof ServiceCard>