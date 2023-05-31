import { ComponentMeta, Story } from "@storybook/react";
import { SpecialCard } from ".";
import { SpecialCardProps } from "./_types";
import { ReactComponent as ExploratoryIcon } from "../../assets/icons/service-exploratory-icon.svg";
import styled from "styled-components";
import { Tag } from "../tags";
import { theme } from "../theme";
import { Button } from "../buttons/button";
// import { CardLabel, CardTitle } from "./styled/header";

// --- Example Components (TO BE REMOVED) ---
const StyledTagNew = styled(Tag)`
  height: ${({ theme }) => theme.space.base * 6}px;
  padding: ${({ theme }) => theme.space.base}px
    ${({ theme }) => theme.space.base * 2}px;
  color: ${({ theme }) => theme.palette.white};
`;

// --- END Example Components (TO BE REMOVED) ---

interface CardStoryProps extends SpecialCardProps {
  title: string;
  content: string;
}

const Template: Story<CardStoryProps> = ({ title, content, ...args }) => {
  return (
    <SpecialCard {...args}>
      <SpecialCard.Meta justifyContent={"end"}>
        <StyledTagNew
          hue={theme.palette.fuschia["600"]}
          isPill
          size="medium"
          title={"New!"}
        >
          {"New!"}
        </StyledTagNew>
      </SpecialCard.Meta>

      <SpecialCard.Thumb>
        <ExploratoryIcon />
      </SpecialCard.Thumb>

      <SpecialCard.Header>
        <SpecialCard.Header.Label>Emporio Armani</SpecialCard.Header.Label>
        <SpecialCard.Header.Title>{title}</SpecialCard.Header.Title>
        <SpecialCard.Header.Text>Lorem ipsum dolorem</SpecialCard.Header.Text>
      </SpecialCard.Header>

      <SpecialCard.Footer direction="column" justifyContent="center">
        <Button
          isAccent
          isPrimary
          isPill
          isStretched
          style={{ marginBottom: "4px" }}
        >
          Contatta il tuo CSM
        </Button>
      </SpecialCard.Footer>
      <SpecialCard.Footer direction="column" justifyContent="center" noDivider>
        <Button
          isAccent
          isPrimary
          isPill
          isStretched
        >
          Secondo bottone streched
        </Button>
      </SpecialCard.Footer>
    </SpecialCard>
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
  title: "Molecules/Card/Special",
  component: SpecialCard,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof SpecialCard>;
