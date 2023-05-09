import { ComponentMeta, Story } from "@storybook/react";
import { Lightbox } from ".";
import { LightboxArgs } from "./_types";
import styled from "styled-components";
// import { ReactComponent as DownloadIcon } from "../../assets/icons/download-stroke.svg";
import { MD } from "../typography/typescale";
import {
  Media as MediaSliderStory,
  SliderStoryArg,
} from "../slider/index.stories";
import { useState } from "react";
import { Row } from "../grid/row";
import { Button } from "../buttons/button";

const exampleText =
  "L'arancino siciliano comparve molto tardi nei ricettari che oggi conosciamo: nel XIX secolo. Al punto che alcuni dubitano di un reale collegamento con la cucina araba. Nel Dizionario siciliano-italiano di Giuseppe Biundi (1857) compare il termine “arancinu”, definito come “vivanda dolce di riso fatta alla forma della melarancia”. Il passaggio al salato è documentato per la prima volta nel Nuovo vocabolario siciliano-italiano di Antonino Trina (1868), ed è probabilmente a questa variante che si ispirano le “crocchette di riso composte” dell'Artusi, che però non prevedono ancora né la carne, né il pomodoro, probabilmente una introduzione di poco posteriore. Ma se il termine originale è “arancinu”, come tradurlo in italiano? Al maschile o al femminile? Seguiamo il ragionamento della Crusca: “Nel dialetto siciliano, come registrano tutti i dizionari dialettali, il frutto dell'arancio è aranciu e nell'italiano regionale diventa arancio”. Quindi “arancinu” nel dialetto siciliano era ed è declinato al maschile, come attestano entrambi i vocabolari ottocenteschi sopra citati. “Del resto, alla distinzione di genere nell'italiano standard, femminile per i nomi dei frutti e maschile per quelli degli alberi, si giunge solo nella seconda metà del Novecento, e molti parlanti di varie regioni italiane - Toscana inclusa - continuano tuttora a usare arancio per dire arancia”.";

const Grey600Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Grey800Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[800]};
`;

interface LightboxStoryArgs extends LightboxArgs {
  headerTitle: string;
  headerBugId?: string;
  slider?: SliderStoryArg;
}

const design = {
  type: "figma",
  url: "https://www.figma.com/file/sByLYaJ4MdJhmqmvom9T88/UNGUESS-%7C-Express-MVP-(Output)",
};

const defaultArgs: LightboxStoryArgs = {
  headerTitle: "Lightbox Title",
};

const Template: Story<LightboxStoryArgs> = (args) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const onSlideChange = (index: number) => {
    setCurrentIndex(index);
  };

  const getCurrentMediaUrl = () => {
    if (args.slider?.items && currentIndex in args.slider.items) {
      const media = args.slider?.items[currentIndex];
      return media?.imageUrl || media?.videoUrl;
    }

    return false;
  };

  const handleModalClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Row>
        {args.slider?.items.map((media, index) => {
          return (
            <Button
              isLink
              key={index}
              onClick={() => {
                setIsOpen(true);
                setCurrentIndex(index);
              }}
            >
              {JSON.stringify(media)}
            </Button>
          );
        })}
      </Row>
      {isOpen && (
        <Lightbox {...args} onClose={handleModalClose}>
          <Lightbox.Header>
            <MD isBold>
              {args.headerBugId && (
                <Grey600Span>{args.headerBugId} </Grey600Span>
              )}
              <Grey800Span> | {args.headerTitle}</Grey800Span>
            </MD>
          </Lightbox.Header>
          <Lightbox.Body>
            <Lightbox.Body.Main>
              {args.slider && (
                <MediaSliderStory
                  {...args.slider}
                  onSlideChange={onSlideChange}
                  initialSlide={currentIndex}
                />
              )}
            </Lightbox.Body.Main>
            <Lightbox.Body.Details>
              <MD>{exampleText}</MD>
            </Lightbox.Body.Details>
          </Lightbox.Body>
          <Lightbox.Footer>
            <Button
              isBasic
              onClick={() => {
                const fileUrl = getCurrentMediaUrl();
                if (fileUrl) window.open(fileUrl, "_blank");
              }}
            >
              <Button.StartIcon>
                {/* <DownloadIcon /> */}
                <>CIOlla</>
              </Button.StartIcon>
              Scarica questo media
            </Button>
          </Lightbox.Footer>
          <Lightbox.Close aria-label="Close modal" />
        </Lightbox>
      )}
    </>
  );
};

export const Default = Template.bind({});

Default.args = {
  ...defaultArgs,
  headerTitle: "Allegati immagini e video (4)",
  headerBugId: "BUG ID 263411",
  slider: {
    ...(MediaSliderStory.args as SliderStoryArg),
    initialSlide: 1,
  },
};

Default.parameters = {
  design,
};

export default {
  title: "Organisms/Lightbox",
  component: Lightbox,
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as ComponentMeta<typeof Lightbox>;
