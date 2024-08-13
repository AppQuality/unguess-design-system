import { Meta, StoryFn } from "@storybook/react";
import { Title } from "../title";
import { ContainerCard } from ".";
import { CardProps } from "./_types";

interface CardStoryProps extends CardProps {
  title: string;
  content: string;
}

const Template: StoryFn<CardStoryProps> = ({ title, content, ...args }) => {
  return (
    <ContainerCard {...args}>
      <Title>{title}</Title>
      {content}
    </ContainerCard>
  );
};

const defaultArgs: CardStoryProps = {
  isFloating: false,
  title: "L'arancino",
  content:
    "L’arancino siciliano comparve molto tardi nei ricettari che oggi conosciamo: nel XIX secolo. Al punto che alcuni dubitano di un reale collegamento con la cucina araba. Nel Dizionario siciliano-italiano di Giuseppe Biundi (1857) compare il termine “arancinu”, definito come “vivanda dolce di riso fatta alla forma della melarancia”. Il passaggio al salato è documentato per la prima volta nel Nuovo vocabolario siciliano-italiano di Antonino Trina (1868), ed è probabilmente a questa variante che si ispirano le “crocchette di riso composte” dell’Artusi, che però non prevedono ancora né la carne, né il pomodoro, probabilmente una introduzione di poco posteriore. Ma se il termine originale è “arancinu”, come tradurlo in italiano? Al maschile o al femminile? Seguiamo il ragionamento della Crusca: “Nel dialetto siciliano, come registrano tutti i dizionari dialettali, il frutto dell’arancio è aranciu e nell’italiano regionale diventa arancio”. Quindi “arancinu” nel dialetto siciliano era ed è declinato al maschile, come attestano entrambi i vocabolari ottocenteschi sopra citati. “Del resto, alla distinzione di genere nell’italiano standard, femminile per i nomi dei frutti e maschile per quelli degli alberi, si giunge solo nella seconda metà del Novecento, e molti parlanti di varie regioni italiane – Toscana inclusa – continuano tuttora a usare arancio per dire arancia”.",
  isRecessed: false,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export default {
  title: "Molecules/Card/ContainerCard",
  component: ContainerCard,
  argTypes: {
    isFloating: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof ContainerCard>;
