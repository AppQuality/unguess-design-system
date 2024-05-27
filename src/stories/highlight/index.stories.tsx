import { Meta, StoryFn } from "@storybook/react";
import { useCallback, useState } from "react";
import { Highlight } from ".";
import useDebounce from "../../hooks/useDebounce";
import { Button } from "../buttons/button";
import { Col } from "../grid/col";
import { Grid } from "../grid/grid";
import { Row } from "../grid/row";
import { Player } from "../player";
import { Tabs } from "../tabs";
import { theme } from "../theme";
import { getColor } from "../theme/utils";
import { Paragraph } from "../typography/paragraph";
import { HighlightArgs, Observation, WordProps } from "./_types";
import { Transcript } from "./demo-parts/transcript-base";
import { TDiarization } from "./demo-parts/transcript-diarization";
import { TParagraph } from "./demo-parts/transcript-paragraph";
import { Tag } from "../tags";
import { TSentiment } from "./demo-parts/transcript-sentiment";

export interface StoryArgs extends HighlightArgs {
  words: Array<WordProps & { speaker: number }>;
  currentTime: number;
  includeSearch?: boolean;
}

const Template: StoryFn<StoryArgs> = (args) => {
  const [selection, setSelection] = useState<{
    from: number;
    to: number;
    text: string;
  }>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [observations, setObservations] = useState<Observation[]>([]);

  const debauncedValue = useDebounce(searchValue, 300);

  const handleAddObservation = () => {
    if (selection) {
      console.log("🚀 ~ handleAddObservation ~ selection:", selection);
      setObservations([
        ...observations,
        {
          id: observations.length,
          start: selection.from,
          end: selection.to,
          label: `new observation (#${observations.length})`,
          hue: '#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
        },
      ]);
    }
  };

  return (
    <>
      <b>Unselectable text:</b>
      <br />
      Listed below are the words that will be highlighted when selected. Not
      every paragraph can be selected, like this one.
      <hr style={{ margin: `10px 0` }} />
      {args.includeSearch && (
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchValue(e.target.value)}
        />
      )}
      <p>
        <b>Selectable text:</b>
      </p>
      <Highlight
        {...args}
        search={debauncedValue}
        handleSelection={(part) => setSelection(part)}
      >
        {args.words.map((item, index) => (
          <>
            <Highlight.Word
              key={index}
              start={item.start}
              end={item.end}
              observations={observations}
              currentTime={args.currentTime}
              text={item.text}
              tooltipContent={item.tooltipContent}
            />
          </>
        ))}
      </Highlight>
      {selection && (
        <>
          <hr style={{ margin: `10px 0` }} />
          <b>Testo selezionato</b>
          <Paragraph>
            <i>{selection.text}</i> ({selection.from} - {selection.to})
          </Paragraph>
          <br />
          <Button isPrimary onClick={handleAddObservation}>
            Add observation
          </Button>
        </>
      )}
    </>
  );
};

const VideoTemplate: StoryFn<StoryArgs> = (args) => {
  const [selection, setSelection] = useState<{
    from: number;
    to: number;
    text: string;
  }>();

  const [currentTime, setCurrentTime] = useState(0);

  const handleRef = useCallback((video: HTMLVideoElement) => {
    if (video) {
      video.addEventListener("timeupdate", () => {
        setCurrentTime(video?.currentTime || 0);
      });
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          setCurrentTime(video?.currentTime || 0);
        });
      }
    };
  }, []);

  const [observations, setObservations] = useState<Observation[]>([]);

  const handleAddObservation = () => {
    if (selection) {
      console.log("🚀 ~ handleAddObservation ~ selection:", selection);
      setObservations([
        ...observations,
        {
          id: observations.length,
          start: selection.from,
          end: selection.to,
          label: `new observation (#${observations.length})`
        },
      ]);
    }
  };

  return (
    <>
      <Grid>
        <Row>
          <Col>
            <Highlight {...args} handleSelection={(part) => setSelection(part)}>
              {args.words.map((item, index) => (
                <>
                  <Highlight.Word
                    key={index}
                    start={item.start}
                    end={item.end}
                    observations={observations}
                    currentTime={currentTime}
                    text={item.text}
                    tooltipContent={item.tooltipContent}
                  />
                </>
              ))}
            </Highlight>
          </Col>
          <Col>
            {/* <video
              ref={videoRef}
              controls
              src="https://mediaconvert-test-output-bk.s3.eu-west-1.amazonaws.com/02b786286aa36703832b783711affb4fbf11ad77_1712765073.mp4"
            /> */}
            <Player
              ref={handleRef}
              url={
                "https://mediaconvert-test-output-bk.s3.eu-west-1.amazonaws.com/02b786286aa36703832b783711affb4fbf11ad77_1712765073.mp4"
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            {selection && (
              <>
                <hr style={{ margin: `10px 0` }} />
                <b>Testo selezionato</b>
                <Paragraph>
                  <i>{selection.text}</i> ({selection.from} - {selection.to})
                </Paragraph>
                <br />
                <Button isPrimary onClick={handleAddObservation}>
                  Add observation
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Grid>
    </>
  );
};

const defaultArgs: StoryArgs = {
  words: [
    { end: 1.04, text: "I", start: 0.88, speaker: 0 },
    { end: 1.44, text: "giovani", start: 1.04, speaker: 0 },
    { end: 1.6, text: "sono", start: 1.44, speaker: 0 },
    { end: 1.84, text: "allo", start: 1.6, speaker: 0 },
    { end: 2.34, text: "spando,", start: 1.84, speaker: 0 },
    { end: 2.72, text: "si", start: 2.4, speaker: 0 },
    { end: 3.22, text: "drogano,", start: 2.72, speaker: 0 },
    { end: 3.68, text: "si", start: 3.36, speaker: 0 },
    { end: 4.18, text: "menano,", start: 3.68, speaker: 0 },
    { end: 4.8, text: "trombano", start: 4.32, speaker: 0 },
    { end: 4.96, text: "a", start: 4.8, speaker: 0 },
    { end: 5.28, text: "destra", start: 4.96, speaker: 0 },
    { end: 5.44, text: "e", start: 5.28, speaker: 0 },
    { end: 5.94, text: "sinistra!", start: 5.44, speaker: 0 },
    { end: 6.4, text: "Certo", start: 6.16, speaker: 0 },
    { end: 6.72, text: "voi", start: 6.4, speaker: 0 },
    { end: 7.12, text: "direte", start: 6.72, speaker: 0 },
    { end: 7.36, text: "fin", start: 7.12, speaker: 0 },
    { end: 7.52, text: "qui", start: 7.36, speaker: 0 },
    { end: 7.92, text: "tutto", start: 7.52, speaker: 0 },
    { end: 8.42, text: "ok,", start: 7.92, speaker: 0 },
    { end: 8.8, text: "ma", start: 8.56, speaker: 0 },
    { end: 8.96, text: "il", start: 8.8, speaker: 0 },
    { end: 9.28, text: "problema", start: 8.96, speaker: 0 },
    { end: 9.36, text: "è", start: 9.28, speaker: 0 },
    { end: 9.655, text: "che", start: 9.36, speaker: 0 },
    { end: 9.935, text: "tutte", start: 9.815, speaker: 0 },
    { end: 10.055, text: "queste", start: 9.935, speaker: 0 },
    { end: 10.455, text: "cose", start: 10.055, speaker: 0 },
    { end: 10.615, text: "le", start: 10.455, speaker: 0 },
    { end: 10.935, text: "fanno", start: 10.615, speaker: 0 },
    { end: 11.435, text: "male!", start: 10.935, speaker: 0 },
    { end: 12.455, text: "Cosa", start: 12.215, speaker: 0 },
    { end: 12.615, text: "ne", start: 12.455, speaker: 0 },
    { end: 12.935, text: "pensa", start: 12.615, speaker: 0 },
    { end: 13.335, text: "dell'alcol", start: 12.935, speaker: 0 },
    { end: 13.575, text: "tra", start: 13.335, speaker: 0 },
    { end: 13.735, text: "I", start: 13.575, speaker: 0 },
    { end: 14.055, text: "giovani?", start: 13.735, speaker: 0 },
    { end: 14.375, text: "Ma", start: 14.055, speaker: 1 },
    { end: 14.695, text: "è", start: 14.375, speaker: 1 },
    { end: 14.935, text: "tutto", start: 14.695, speaker: 1 },
    { end: 15.415, text: "troppo", start: 14.935, speaker: 1 },
    { end: 15.915, text: "facile,", start: 15.415, speaker: 1 },
    { end: 16.193, text: "oggi", start: 16.135, speaker: 1 },
    { end: 16.251, text: "si", start: 16.193, speaker: 1 },
    { end: 16.31, text: "fanno", start: 16.251, speaker: 1 },
    { end: 16.368, text: "questi", start: 16.31, speaker: 1 },
    { end: 16.426, text: "shottini", start: 16.368, speaker: 1 },
    { end: 16.484, text: "che", start: 16.426, speaker: 1 },
    { end: 16.542, text: "sono", start: 16.484, speaker: 1 },
    { end: 16.6, text: "delle", start: 16.542, speaker: 1 },
    { end: 16.659, text: "bombe", start: 16.6, speaker: 1 },
    { end: 16.717, text: "micidiali", start: 16.659, speaker: 1 },
    { end: 16.775, text: "e", start: 16.717, speaker: 1 },
    { end: 16.935, text: "subito", start: 16.775, speaker: 1 },
    { end: 17.435, text: "stanno", start: 16.935, speaker: 1 },
    { end: 22.91, text: "ricordo", start: 22.67, speaker: 1 },
    { end: 23.15, text: "io", start: 22.91, speaker: 1 },
    { end: 23.63, text: "invece", start: 23.15, speaker: 1 },
    { end: 24.13, text: "che", start: 23.63, speaker: 1 },
    { end: 24.51, text: "ai", start: 24.35, speaker: 1 },
    { end: 24.735, text: "miei", start: 24.51, speaker: 1 },
    { end: 25.055, text: "tempi", start: 24.815, speaker: 1 },
    { end: 25.268, text: "che", start: 25.055, speaker: 1 },
    { end: 25.482, text: "mi", start: 25.268, speaker: 1 },
    { end: 25.695, text: "dovevo", start: 25.482, speaker: 1 },
    { end: 25.935, text: "bere", start: 25.695, speaker: 1 },
    { end: 26.095, text: "fior", start: 25.935, speaker: 1 },
    { end: 26.335, text: "di", start: 26.095, speaker: 1 },
    { end: 26.815, text: "bottiglie", start: 26.335, speaker: 1 },
    { end: 27.135, text: "per", start: 26.815, speaker: 1 },
    { end: 27.535, text: "diventare", start: 27.135, speaker: 1 },
    { end: 28.035, text: "alcolizzato.", start: 27.535, speaker: 1 },
    { end: 28.575, text: "È", start: 28.415, speaker: 0 },
    { end: 28.735, text: "vero", start: 28.575, speaker: 0 },
    { end: 28.895, text: "che", start: 28.735, speaker: 0 },
    { end: 29.055, text: "le", start: 28.895, speaker: 0 },
    { end: 29.295, text: "ragazze", start: 29.055, speaker: 0 },
    { end: 29.375, text: "di", start: 29.295, speaker: 0 },
    { end: 29.695, text: "oggi", start: 29.375, speaker: 0 },
    { end: 29.855, text: "sono", start: 29.695, speaker: 0 },
    { end: 30.015, text: "tutte", start: 29.855, speaker: 0 },
    { end: 30.335, text: "troppo", start: 30.015, speaker: 0 },
    { end: 30.815, text: "facili", start: 30.335, speaker: 0 },
    { end: 30.975, text: "ma", start: 30.815, speaker: 2 },
    { end: 31.215, text: "anche", start: 30.975, speaker: 2 },
    { end: 31.455, text: "tempi", start: 31.215, speaker: 2 },
    { end: 31.775, text: "miei", start: 31.455, speaker: 2 },
    { end: 31.855, text: "la", start: 31.775, speaker: 2 },
    { end: 32.255, text: "andavano", start: 31.855, speaker: 2 },
    { end: 32.735, text: "tutte", start: 32.255, speaker: 2 },
    { end: 32.815, text: "ma", start: 32.735, speaker: 2 },
    { end: 33.315, text: "non", start: 32.815, speaker: 2 },
    { end: 34.25, text: "subito.", start: 34.17, speaker: 2 },
    { end: 34.41, text: "Ci", start: 34.25, speaker: 2 },
    { end: 34.73, text: "dovevi", start: 34.41, speaker: 2 },
    { end: 35.23, text: "lavorare", start: 34.73, speaker: 2 },
    { end: 35.61, text: "ed", start: 35.37, speaker: 2 },
    { end: 35.85, text: "era", start: 35.61, speaker: 2 },
    { end: 36.01, text: "una", start: 35.85, speaker: 2 },
    { end: 36.33, text: "conquista", start: 36.01, speaker: 2 },
    { end: 36.57, text: "per", start: 36.33, speaker: 2 },
    { end: 36.89, text: "noi", start: 36.57, speaker: 2 },
    { end: 37.21, text: "maschi", start: 36.89, speaker: 2 },
    { end: 37.53, text: "così", start: 37.21, speaker: 3 },
    { end: 37.77, text: "erano", start: 37.53, speaker: 3 },
    { end: 37.93, text: "più", start: 37.77, speaker: 3 },
    { end: 38.21, text: "invogliati", start: 37.93, speaker: 3 },
    { end: 38.49, text: "e", start: 38.21, speaker: 3 },
    { end: 38.65, text: "più", start: 38.49, speaker: 3 },
    { end: 39.15, text: "stimolati.", start: 38.65, speaker: 3 },
    { end: 39.53, text: "Signora", start: 39.29, speaker: 4 },
    { end: 39.85, text: "com'è", start: 39.53, speaker: 4 },
    { end: 40.01, text: "lo", start: 39.85, speaker: 4 },
    { end: 40.41, text: "sballo", start: 40.01, speaker: 4 },
    { end: 40.65, text: "nei", start: 40.41, speaker: 4 },
    { end: 40.89, text: "giovani", start: 40.65, speaker: 4 },
    { end: 41.39, text: "d'oggi?", start: 40.89, speaker: 4 },
    { end: 41.77, text: "Guarda", start: 41.45, speaker: 4 },
    { end: 41.85, text: "è", start: 41.77, speaker: 4 },
    { end: 42.17, text: "uno", start: 41.85, speaker: 4 },
    { end: 42.67, text: "schifo.", start: 42.17, speaker: 4 },
    { end: 43.245, text: "Io", start: 42.925, speaker: 4 },
    { end: 43.565, text: "vedo", start: 43.245, speaker: 4 },
    { end: 43.805, text: "a", start: 43.565, speaker: 4 },
    { end: 44.045, text: "mio", start: 43.805, speaker: 4 },
    { end: 44.545, text: "nipote", start: 44.045, speaker: 4 },
    { end: 45.165, text: "che", start: 44.845, speaker: 4 },
    { end: 45.405, text: "si", start: 45.165, speaker: 4 },
    { end: 45.805, text: "fa,", start: 45.405, speaker: 4 },
    { end: 46.045, text: "si", start: 45.805, speaker: 4 },
    { end: 46.285, text: "prende", start: 46.045, speaker: 4 },
    { end: 46.525, text: "quella", start: 46.285, speaker: 4 },
    { end: 47.025, text: "pilloletta", start: 46.525, speaker: 4 },
    { end: 47.565, text: "e", start: 47.245, speaker: 4 },
    { end: 47.805, text: "comincia", start: 47.565, speaker: 4 },
    { end: 47.965, text: "a", start: 47.805, speaker: 4 },
    { end: 48.445, text: "ballare", start: 47.965, speaker: 4 },
    { end: 48.765, text: "come", start: 48.445, speaker: 4 },
    { end: 48.925, text: "un", start: 48.765, speaker: 4 },
    { end: 49.425, text: "pubo.", start: 48.925, speaker: 4 },
    { end: 49.885, text: "Invece", start: 49.565, speaker: 4 },
    { end: 50.125, text: "io", start: 49.885, speaker: 4 },
    { end: 50.365, text: "mi", start: 50.125, speaker: 4 },
    { end: 50.765, text: "ricordo", start: 50.365, speaker: 4 },
    { end: 50.845, text: "a", start: 50.765, speaker: 4 },
    { end: 51.085, text: "mio", start: 50.845, speaker: 4 },
    { end: 51.585, text: "figlio", start: 51.085, speaker: 4 },
    { end: 52.04, text: "che", start: 51.8, speaker: 4 },
    { end: 52.4, text: "faceva?", start: 52.04, speaker: 4 },
    { end: 52.76, text: "Si", start: 52.4, speaker: 4 },
    { end: 53.08, text: "prendeva", start: 52.76, speaker: 4 },
    { end: 53.24, text: "il", start: 53.08, speaker: 4 },
    { end: 53.74, text: "laccetto,", start: 53.24, speaker: 4 },
    { end: 55.4, text: "si", start: 55.32, speaker: 4 },
    { end: 55.88, text: "riscaldava", start: 55.4, speaker: 4 },
    { end: 56.38, text: "il", start: 55.88, speaker: 4 },
    { end: 56.6, text: "coltellino,", start: 56.52, speaker: 4 },
    { end: 56.84, text: "poi", start: 56.6, speaker: 4 },
    { end: 57.24, text: "la", start: 56.84, speaker: 4 },
    { end: 57.74, text: "zilinga,", start: 57.24, speaker: 4 },
    { end: 58.92, text: "era", start: 58.76, speaker: 4 },
    { end: 59.24, text: "una", start: 58.92, speaker: 4 },
    { end: 59.72, text: "cosa", start: 59.24, speaker: 4 },
    { end: 60.22, text: "fatta", start: 59.72, speaker: 4 },
    { end: 60.44, text: "a", start: 60.28, speaker: 4 },
    { end: 60.94, text: "mestiere,", start: 60.44, speaker: 4 },
    { end: 61.985, text: "proprio.", start: 61.905, speaker: 0 },
    { end: 62.145, text: "I", start: 61.985, speaker: 0 },
    { end: 62.465, text: "giovani", start: 62.145, speaker: 0 },
    { end: 62.625, text: "di", start: 62.465, speaker: 0 },
    { end: 62.785, text: "una", start: 62.625, speaker: 0 },
    { end: 63.025, text: "volta", start: 62.785, speaker: 0 },
    { end: 63.425, text: "sembrano", start: 63.025, speaker: 0 },
    { end: 63.745, text: "darmi", start: 63.425, speaker: 0 },
    { end: 64.245, text: "ragione.", start: 63.745, speaker: 0 },
    { end: 64.465, text: "Ma", start: 64.305, speaker: 0 },
    { end: 64.705, text: "andiamo", start: 64.465, speaker: 0 },
    { end: 64.945, text: "a", start: 64.705, speaker: 0 },
    { end: 65.265, text: "sentire", start: 64.945, speaker: 0 },
    { end: 65.425, text: "cosa", start: 65.265, speaker: 0 },
    { end: 65.665, text: "ne", start: 65.425, speaker: 0 },
    { end: 65.985, text: "pensano", start: 65.665, speaker: 0 },
    { end: 66.065, text: "I", start: 65.985, speaker: 0 },
    { end: 66.385, text: "giovani", start: 66.065, speaker: 0 },
    { end: 66.885, text: "d'oggi.", start: 66.385, speaker: 0 },
    { end: 67.265, text: "Io", start: 66.945, speaker: 4 },
    { end: 67.585, text: "come", start: 67.265, speaker: 4 },
    { end: 67.905, text: "molti", start: 67.585, speaker: 4 },
    { end: 68.225, text: "altri", start: 67.905, speaker: 4 },
    { end: 68.725, text: "amo", start: 68.225, speaker: 4 },
    { end: 82.185, text: "A", start: 82.025, speaker: 0 },
    { end: 82.425, text: "noi", start: 82.185, speaker: 0 },
    { end: 82.585, text: "ci", start: 82.425, speaker: 0 },
    { end: 82.905, text: "piace", start: 82.585, speaker: 0 },
    { end: 83.145, text: "fare", start: 82.905, speaker: 0 },
    { end: 83.305, text: "I", start: 83.145, speaker: 0 },
    { end: 83.465, text: "tagli", start: 83.305, speaker: 0 },
    { end: 83.705, text: "sulle", start: 83.465, speaker: 0 },
    { end: 84.185, text: "braccia,", start: 83.705, speaker: 0 },
    { end: 84.425, text: "fa", start: 84.185, speaker: 0 },
    { end: 84.665, text: "troppo", start: 84.425, speaker: 0 },
    { end: 85.165, text: "figo,", start: 84.665, speaker: 0 },
    { end: 85.705, text: "peccato", start: 85.385, speaker: 0 },
    { end: 85.865, text: "che", start: 85.705, speaker: 0 },
    { end: 85.945, text: "il", start: 85.865, speaker: 0 },
    { end: 86.265, text: "frullo", start: 85.945, speaker: 0 },
    { end: 86.425, text: "è", start: 86.265, speaker: 0 },
    { end: 86.86, text: "esagerato", start: 86.425, speaker: 0 },
    { end: 89.02, text: "esagerato.", start: 88.86, speaker: 0 },
    { end: 89.34, text: "Che", start: 89.02, speaker: 0 },
    { end: 89.74, text: "fate", start: 89.34, speaker: 0 },
    { end: 90.24, text: "voi?", start: 89.74, speaker: 0 },
    { end: 90.54, text: "Noi", start: 90.46, speaker: 0 },
    { end: 91.04, text: "sniffiamo", start: 90.54, speaker: 0 },
    { end: 91.34, text: "le", start: 91.1, speaker: 0 },
    { end: 91.84, text: "capre", start: 91.34, speaker: 0 },
    { end: 92.06, text: "e", start: 91.9, speaker: 0 },
    { end: 92.3, text: "poi", start: 92.06, speaker: 0 },
    { end: 92.54, text: "veniamo", start: 92.3, speaker: 0 },
    { end: 92.78, text: "a", start: 92.54, speaker: 0 },
    { end: 93.26, text: "ballare.", start: 92.78, speaker: 0 },
    { end: 93.58, text: "Le", start: 93.26, speaker: 4 },
    { end: 94.08, text: "capre!", start: 93.58, speaker: 4 },
    { end: 95.735, text: "Noi", start: 95.335, speaker: 4 },
    { end: 96.055, text: "ci", start: 95.735, speaker: 4 },
    { end: 96.375, text: "facciamo", start: 96.055, speaker: 4 },
    { end: 96.615, text: "le", start: 96.375, speaker: 4 },
    { end: 96.855, text: "foto", start: 96.615, speaker: 4 },
    { end: 97.015, text: "ai", start: 96.855, speaker: 4 },
    { end: 97.515, text: "peli", start: 97.015, speaker: 4 },
    { end: 97.735, text: "e", start: 97.575, speaker: 4 },
    { end: 97.895, text: "poi", start: 97.735, speaker: 4 },
    { end: 98.135, text: "ce", start: 97.895, speaker: 4 },
    { end: 98.295, text: "le", start: 98.135, speaker: 4 },
    { end: 98.795, text: "scambiamo.", start: 98.295, speaker: 4 },
    { end: 102.535, text: "Quali", start: 102.375, speaker: 0 },
    { end: 102.695, text: "sono", start: 102.535, speaker: 0 },
    { end: 102.775, text: "I", start: 102.695, speaker: 0 },
    { end: 102.935, text: "tuoi", start: 102.775, speaker: 0 },
    { end: 103.435, text: "valori?", start: 102.935, speaker: 0 },
    { end: 122.65, text: "C'è", start: 122.33, speaker: 0 },
    { end: 122.97, text: "soltanto", start: 122.65, speaker: 0 },
    { end: 123.29, text: "la", start: 122.97, speaker: 0 },
    { end: 123.79, text: "svalutazione", start: 123.29, speaker: 0 },
    { end: 124.33, text: "del", start: 124.09, speaker: 0 },
    { end: 124.83, text: "vizio!", start: 124.33, speaker: 0 },
    { end: 125.69, text: "Purtroppo", start: 125.37, speaker: 0 },
    { end: 126.09, text: "oggi", start: 125.69, speaker: 0 },
    { end: 126.25, text: "è", start: 126.09, speaker: 0 },
    { end: 126.57, text: "tutto", start: 126.25, speaker: 0 },
    { end: 126.97, text: "troppo", start: 126.57, speaker: 0 },
    { end: 127.47, text: "comodo:", start: 126.97, speaker: 0 },
    { end: 127.93, text: "è", start: 127.77, speaker: 0 },
    { end: 128.09, text: "la", start: 127.93, speaker: 0 },
    { end: 128.41, text: "droga", start: 128.09, speaker: 0 },
    { end: 128.57, text: "che", start: 128.41, speaker: 0 },
    { end: 128.73, text: "te", start: 128.57, speaker: 0 },
    { end: 128.89, text: "la", start: 128.73, speaker: 0 },
    { end: 129.29, text: "tirano", start: 128.89, speaker: 0 },
    { end: 129.77, text: "dietro,", start: 129.29, speaker: 0 },
    { end: 129.93, text: "è", start: 129.77, speaker: 0 },
    { end: 130.17, text: "il", start: 129.93, speaker: 0 },
    { end: 130.335, text: "sesso", start: 130.17, speaker: 0 },
    { end: 130.495, text: "che", start: 130.335, speaker: 0 },
    { end: 130.575, text: "te", start: 130.495, speaker: 0 },
    { end: 130.655, text: "lo", start: 130.575, speaker: 0 },
    { end: 130.735, text: "portano", start: 130.655, speaker: 0 },
    { end: 131.235, text: "a", start: 130.735, speaker: 0 },
    { end: 131.875, text: "casa,", start: 131.375, speaker: 0 },
    { end: 132.175, text: "I", start: 131.935, speaker: 0 },
    { end: 132.495, text: "tabù", start: 132.175, speaker: 0 },
    { end: 132.735, text: "non", start: 132.495, speaker: 0 },
    { end: 133.135, text: "esistono", start: 132.735, speaker: 0 },
    { end: 133.375, text: "più", start: 133.135, speaker: 0 },
    { end: 133.455, text: "e", start: 133.375, speaker: 1 },
    { end: 133.695, text: "quindi", start: 133.455, speaker: 1 },
    { end: 133.775, text: "te", start: 133.695, speaker: 1 },
    { end: 134.015, text: "lo", start: 133.775, speaker: 1 },
    { end: 134.255, text: "prendi", start: 134.015, speaker: 1 },
    { end: 134.755, text: "nel", start: 134.255, speaker: 1 },
    { end: 135.455, text: "si", start: 135.215, speaker: 1 },
    { end: 135.615, text: "può", start: 135.455, speaker: 1 },
    { end: 135.855, text: "dire", start: 135.615, speaker: 1 },
    { end: 136.355, text: "culo?", start: 135.855, speaker: 1 },
    { end: 137.315, text: "Ragazzi", start: 136.815, speaker: 0 },
    { end: 138.035, text: "impegnatevi", start: 137.535, speaker: 0 },
    { end: 138.255, text: "a", start: 138.095, speaker: 0 },
    { end: 138.755, text: "trasgredire,", start: 138.255, speaker: 0 },
    { end: 139.295, text: "mi", start: 138.975, speaker: 0 },
    { end: 139.795, text: "raccomando!", start: 139.295, speaker: 0 },
    { end: 140.16, text: "Non", start: 140, speaker: 0 },
    { end: 140.32, text: "vi", start: 140.16, speaker: 0 },
    { end: 140.72, text: "fermate", start: 140.32, speaker: 0 },
    { end: 140.88, text: "alla", start: 140.72, speaker: 0 },
    { end: 141.2, text: "prima", start: 140.88, speaker: 0 },
    { end: 141.6, text: "cazzata", start: 141.2, speaker: 0 },
    { end: 141.84, text: "che", start: 141.6, speaker: 0 },
    { end: 142.16, text: "trovate", start: 141.84, speaker: 0 },
    { end: 142.4, text: "su", start: 142.16, speaker: 0 },
    { end: 142.8, text: "internet!", start: 142.4, speaker: 0 },
    { end: 142.96, text: "Ahi", start: 142.8, speaker: 4 },
    { end: 143.44, text: "Papi,", start: 142.96, speaker: 4 },
    { end: 143.52, text: "ti", start: 143.44, speaker: 4 },
    { end: 143.84, text: "presento", start: 143.52, speaker: 4 },
    { end: 143.92, text: "un", start: 143.84, speaker: 4 },
    { end: 144.08, text: "mio", start: 143.92, speaker: 4 },
    { end: 144.24, text: "nuovo", start: 144.08, speaker: 4 },
    { end: 144.74, text: "amico", start: 144.24, speaker: 4 },
    { end: 145.12, text: "Mario!", start: 145.04, speaker: 4 },
    { end: 145.36, text: "Ciao", start: 145.12, speaker: 0 },
    { end: 145.76, text: "Mario!", start: 145.36, speaker: 0 },
    { end: 146.16, text: "Troppo", start: 145.76, speaker: 4 },
    { end: 146.66, text: "alternativo!", start: 146.16, speaker: 4 },
    { end: 147.28, text: "Ma", start: 147.2, speaker: 4 },
    { end: 147.44, text: "non", start: 147.28, speaker: 4 },
    { end: 147.68, text: "che", start: 147.44, speaker: 4 },
    { end: 148.18, text: "fa?", start: 147.68, speaker: 4 },
    { end: 149.495, text: "Cos'è", start: 148.995, speaker: 0 },
    { end: 150.015, text: "Cobra?", start: 149.515, speaker: 0 },
    { end: 150.195, text: "Ma", start: 150.035, speaker: 0 },
    { end: 150.355, text: "che", start: 150.195, speaker: 0 },
    { end: 150.515, text: "fa", start: 150.355, speaker: 0 },
    { end: 151.015, text: "Tiffa?", start: 150.515, speaker: 0 },
    { end: 152.215, text: "Buono!", start: 151.715, speaker: 0 },
    { end: 155.955, text: "Hai", start: 155.715, speaker: 4 },
    { end: 156.455, text: "visto?", start: 155.955, speaker: 4 },
    { end: 156.96, text: "Non", start: 156.595, speaker: 4 },
    { end: 157.36, text: "si", start: 157.04, speaker: 4 },
    { end: 157.86, text: "droga!", start: 157.36, speaker: 4 },
    { end: 158.8, text: "Troppo", start: 158.32, speaker: 4 },
    { end: 159.3, text: "avanti!", start: 158.8, speaker: 4 },
    { end: 161.68, text: "Ma", start: 161.6, speaker: 0 },
    { end: 161.92, text: "dove", start: 161.68, speaker: 0 },
    { end: 162.32, text: "andremo", start: 161.92, speaker: 0 },
    { end: 162.56, text: "a", start: 162.32, speaker: 0 },
    { end: 163.06, text: "Finict?", start: 162.56, speaker: 0 },
  ],
  currentTime: 46.525,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const VideoSync = VideoTemplate.bind({});
VideoSync.args = {
  ...defaultArgs,
};

export const WithSearch = Template.bind({});
WithSearch.args = {
  ...defaultArgs,
  includeSearch: true,
};

export const WithTooltip = Template.bind({});
WithTooltip.args = {
  ...defaultArgs,
  words: defaultArgs.words.map((w) => ({
    ...w,
    tooltipContent: (obs: Observation) => (
      <Tag hue={"red"} color="white" onClick={() => alert("Hey")}>
        This is a tag of obs "{obs.label}"
      </Tag>
    ),
  })),
};

const DemoTemplate: StoryFn<StoryArgs> = (args) => {
  const [currentTime, setCurrentTime] = useState(0);

  const handleVideoRef = useCallback((video: HTMLVideoElement) => {
    if (video) {
      video.addEventListener("timeupdate", () => {
        setCurrentTime(video?.currentTime || 0);
      });
    }
  }, []);

  const VIDEO_OFFSET = 55.67;

  return (
    <>
      <Grid>
        <Row>
          <Col size={6} style={{ maxHeight: "90vh" }}>
            <Player
              ref={handleVideoRef}
              start={VIDEO_OFFSET}
              url="https://s3.eu-west-1.amazonaws.com/appq.static/demo/segment-5min.mp4"
            />
          </Col>
          <Col size={6}>
            <Tabs className="tabs-wrapper">
              <Tabs.Panel
                className={"tab-panel-1"}
                key={"tab-panel-1"}
                title={"Transcript"}
              >
                <Transcript
                  {...args}
                  currentTime={currentTime}
                  offset={VIDEO_OFFSET}
                />
              </Tabs.Panel>
              <Tabs.Panel
                className={"tab-panel-2"}
                key={"tab-panel-2"}
                title={"Paragraph recognition"}
              >
                <TParagraph
                  {...args}
                  currentTime={currentTime}
                  offset={VIDEO_OFFSET}
                />
              </Tabs.Panel>
              <Tabs.Panel
                className={"tab-panel-3"}
                key={"tab-panel-3"}
                title={"Diarization"}
              >
                <TDiarization
                  {...args}
                  currentTime={currentTime}
                  offset={VIDEO_OFFSET}
                />
              </Tabs.Panel>
              <Tabs.Panel
                className={"tab-panel-4"}
                key={"tab-panel-4"}
                title={"Meta"}
              >
                <TSentiment
                  {...args}
                  currentTime={currentTime}
                  offset={VIDEO_OFFSET}
                />
              </Tabs.Panel>
            </Tabs>
          </Col>
        </Row>
      </Grid>
    </>
  );
};
export const Demo = DemoTemplate.bind({});
Demo.args = {
  ...defaultArgs,
  includeSearch: true,
};

export default {
  title: "Molecules/Highlight",
  component: Highlight,
  argTypes: {
    hue: {
      control: {
        type: "color",
        presetColors: [
          theme.colors.foreground,
          getColor(theme.colors.primaryHue, 600),
          getColor(theme.colors.successHue, 700),
          getColor(theme.colors.warningHue, 700),
          getColor(theme.colors.dangerHue, 700),
          getColor(theme.colors.infoHue, 700),
        ],
      },
    },
    size: {
      control: {
        type: "select",
        options: ["xs", "sm", "md", "lg", "xl", "xxl", "xxxl"],
      },
    },
    children: {
      name: "Text",
      description: "Some example text",
      control: "text",
    },
  },
  parameters: {
    // Sets a delay for the component's stories
    chromatic: { delay: 300 },
  },
} as Meta<typeof Highlight>;
