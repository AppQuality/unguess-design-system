import { Meta, StoryFn } from "@storybook/react";
import { useEffect, useRef, useState } from "react";
import { Highlight } from ".";
import { Button } from "../../buttons/button";
import { Col } from "../../grid/col";
import { Grid } from "../../grid/grid";
import { Row } from "../../grid/row";
import { Player } from "../../player";
import { theme } from "../../theme";
import { getColor } from "../../theme/utils";
import { Paragraph } from "../paragraph";
import { HighlightArgs, Observation } from "./_types";

interface StoryArgs extends HighlightArgs {
  words: { start: number; end: number; word: string; speaker: number }[];
  currentTime: number;
}

const Template: StoryFn<StoryArgs> = (args) => {
  const [selection, setSelection] = useState<{
    from: number;
    to: number;
    text: string;
  }>();

  const [observations, setObservations] = useState<Observation[]>([]);
  console.log("🚀 ~ observations:", observations);

  const handleAddObservation = () => {
    if (selection) {
      console.log("🚀 ~ handleAddObservation ~ selection:", selection);
      setObservations([
        ...observations,
        {
          id: observations.length,
          start: selection.from,
          end: selection.to,
        },
      ]);
    }
  };

  return (
    <>
      <b>Testo non selezionabile</b>
      <br />
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit numquam
      magni debitis saepe placeat quis optio hic similique ratione
      exercitationem quasi illo, perferendis quidem atque. Accusamus optio quae
      tempora a.
      <hr style={{ margin: `10px 0` }} />
      <b>Testo selezionabile</b>
      <br />
      <Highlight {...args} handleSelection={(part) => setSelection(part)}>
        {args.words.map((item, index) => (
          <>
            <Highlight.Word
              key={index}
              start={item.start}
              end={item.end}
              observations={observations}
              currentTime={args.currentTime}
            >
              {item.word}
            </Highlight.Word>
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

  const videoRef = useRef<HTMLVideoElement>(null);
  console.log("🚀 ~ FROM HIGHLIGHT:", videoRef);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("timeupdate", () => {
        setCurrentTime(videoRef.current?.currentTime || 0);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", () => {
          setCurrentTime(videoRef.current?.currentTime || 0);
        });
      }
    };
  }, [videoRef]);

  const [observations, setObservations] = useState<Observation[]>([]);
  console.log("🚀 ~ observations:", observations);

  const handleAddObservation = () => {
    if (selection) {
      console.log("🚀 ~ handleAddObservation ~ selection:", selection);
      setObservations([
        ...observations,
        {
          id: observations.length,
          start: selection.from,
          end: selection.to,
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
                  >
                    {item.word}
                  </Highlight.Word>
                </>
              ))}
            </Highlight>
          </Col>
          <Col>
            <video
              ref={videoRef}
              controls
              src="https://mediaconvert-test-output-bk.s3.eu-west-1.amazonaws.com/02b786286aa36703832b783711affb4fbf11ad77_1712765073.mp4"
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
    { end: 1.04, word: "I", start: 0.88, speaker: 0 },
    { end: 1.44, word: "giovani", start: 1.04, speaker: 0 },
    { end: 1.6, word: "sono", start: 1.44, speaker: 0 },
    { end: 1.84, word: "allo", start: 1.6, speaker: 0 },
    { end: 2.34, word: "spando,", start: 1.84, speaker: 0 },
    { end: 2.72, word: "si", start: 2.4, speaker: 0 },
    { end: 3.22, word: "drogano,", start: 2.72, speaker: 0 },
    { end: 3.68, word: "si", start: 3.36, speaker: 0 },
    { end: 4.18, word: "menano,", start: 3.68, speaker: 0 },
    { end: 4.8, word: "trombano", start: 4.32, speaker: 0 },
    { end: 4.96, word: "a", start: 4.8, speaker: 0 },
    { end: 5.28, word: "destra", start: 4.96, speaker: 0 },
    { end: 5.44, word: "e", start: 5.28, speaker: 0 },
    { end: 5.94, word: "sinistra!", start: 5.44, speaker: 0 },
    { end: 6.4, word: "Certo", start: 6.16, speaker: 0 },
    { end: 6.72, word: "voi", start: 6.4, speaker: 0 },
    { end: 7.12, word: "direte", start: 6.72, speaker: 0 },
    { end: 7.36, word: "fin", start: 7.12, speaker: 0 },
    { end: 7.52, word: "qui", start: 7.36, speaker: 0 },
    { end: 7.92, word: "tutto", start: 7.52, speaker: 0 },
    { end: 8.42, word: "ok,", start: 7.92, speaker: 0 },
    { end: 8.8, word: "ma", start: 8.56, speaker: 0 },
    { end: 8.96, word: "il", start: 8.8, speaker: 0 },
    { end: 9.28, word: "problema", start: 8.96, speaker: 0 },
    { end: 9.36, word: "è", start: 9.28, speaker: 0 },
    { end: 9.655, word: "che", start: 9.36, speaker: 0 },
    { end: 9.935, word: "tutte", start: 9.815, speaker: 0 },
    { end: 10.055, word: "queste", start: 9.935, speaker: 0 },
    { end: 10.455, word: "cose", start: 10.055, speaker: 0 },
    { end: 10.615, word: "le", start: 10.455, speaker: 0 },
    { end: 10.935, word: "fanno", start: 10.615, speaker: 0 },
    { end: 11.435, word: "male!", start: 10.935, speaker: 0 },
    { end: 12.455, word: "Cosa", start: 12.215, speaker: 0 },
    { end: 12.615, word: "ne", start: 12.455, speaker: 0 },
    { end: 12.935, word: "pensa", start: 12.615, speaker: 0 },
    { end: 13.335, word: "dell'alcol", start: 12.935, speaker: 0 },
    { end: 13.575, word: "tra", start: 13.335, speaker: 0 },
    { end: 13.735, word: "I", start: 13.575, speaker: 0 },
    { end: 14.055, word: "giovani?", start: 13.735, speaker: 0 },
    { end: 14.375, word: "Ma", start: 14.055, speaker: 1 },
    { end: 14.695, word: "è", start: 14.375, speaker: 1 },
    { end: 14.935, word: "tutto", start: 14.695, speaker: 1 },
    { end: 15.415, word: "troppo", start: 14.935, speaker: 1 },
    { end: 15.915, word: "facile,", start: 15.415, speaker: 1 },
    { end: 16.193, word: "oggi", start: 16.135, speaker: 1 },
    { end: 16.251, word: "si", start: 16.193, speaker: 1 },
    { end: 16.31, word: "fanno", start: 16.251, speaker: 1 },
    { end: 16.368, word: "questi", start: 16.31, speaker: 1 },
    { end: 16.426, word: "shottini", start: 16.368, speaker: 1 },
    { end: 16.484, word: "che", start: 16.426, speaker: 1 },
    { end: 16.542, word: "sono", start: 16.484, speaker: 1 },
    { end: 16.6, word: "delle", start: 16.542, speaker: 1 },
    { end: 16.659, word: "bombe", start: 16.6, speaker: 1 },
    { end: 16.717, word: "micidiali", start: 16.659, speaker: 1 },
    { end: 16.775, word: "e", start: 16.717, speaker: 1 },
    { end: 16.935, word: "subito", start: 16.775, speaker: 1 },
    { end: 17.435, word: "stanno", start: 16.935, speaker: 1 },
    { end: 22.91, word: "ricordo", start: 22.67, speaker: 1 },
    { end: 23.15, word: "io", start: 22.91, speaker: 1 },
    { end: 23.63, word: "invece", start: 23.15, speaker: 1 },
    { end: 24.13, word: "che", start: 23.63, speaker: 1 },
    { end: 24.51, word: "ai", start: 24.35, speaker: 1 },
    { end: 24.735, word: "miei", start: 24.51, speaker: 1 },
    { end: 25.055, word: "tempi", start: 24.815, speaker: 1 },
    { end: 25.268, word: "che", start: 25.055, speaker: 1 },
    { end: 25.482, word: "mi", start: 25.268, speaker: 1 },
    { end: 25.695, word: "dovevo", start: 25.482, speaker: 1 },
    { end: 25.935, word: "bere", start: 25.695, speaker: 1 },
    { end: 26.095, word: "fior", start: 25.935, speaker: 1 },
    { end: 26.335, word: "di", start: 26.095, speaker: 1 },
    { end: 26.815, word: "bottiglie", start: 26.335, speaker: 1 },
    { end: 27.135, word: "per", start: 26.815, speaker: 1 },
    { end: 27.535, word: "diventare", start: 27.135, speaker: 1 },
    { end: 28.035, word: "alcolizzato.", start: 27.535, speaker: 1 },
    { end: 28.575, word: "È", start: 28.415, speaker: 0 },
    { end: 28.735, word: "vero", start: 28.575, speaker: 0 },
    { end: 28.895, word: "che", start: 28.735, speaker: 0 },
    { end: 29.055, word: "le", start: 28.895, speaker: 0 },
    { end: 29.295, word: "ragazze", start: 29.055, speaker: 0 },
    { end: 29.375, word: "di", start: 29.295, speaker: 0 },
    { end: 29.695, word: "oggi", start: 29.375, speaker: 0 },
    { end: 29.855, word: "sono", start: 29.695, speaker: 0 },
    { end: 30.015, word: "tutte", start: 29.855, speaker: 0 },
    { end: 30.335, word: "troppo", start: 30.015, speaker: 0 },
    { end: 30.815, word: "facili", start: 30.335, speaker: 0 },
    { end: 30.975, word: "ma", start: 30.815, speaker: 2 },
    { end: 31.215, word: "anche", start: 30.975, speaker: 2 },
    { end: 31.455, word: "tempi", start: 31.215, speaker: 2 },
    { end: 31.775, word: "miei", start: 31.455, speaker: 2 },
    { end: 31.855, word: "la", start: 31.775, speaker: 2 },
    { end: 32.255, word: "andavano", start: 31.855, speaker: 2 },
    { end: 32.735, word: "tutte", start: 32.255, speaker: 2 },
    { end: 32.815, word: "ma", start: 32.735, speaker: 2 },
    { end: 33.315, word: "non", start: 32.815, speaker: 2 },
    { end: 34.25, word: "subito.", start: 34.17, speaker: 2 },
    { end: 34.41, word: "Ci", start: 34.25, speaker: 2 },
    { end: 34.73, word: "dovevi", start: 34.41, speaker: 2 },
    { end: 35.23, word: "lavorare", start: 34.73, speaker: 2 },
    { end: 35.61, word: "ed", start: 35.37, speaker: 2 },
    { end: 35.85, word: "era", start: 35.61, speaker: 2 },
    { end: 36.01, word: "una", start: 35.85, speaker: 2 },
    { end: 36.33, word: "conquista", start: 36.01, speaker: 2 },
    { end: 36.57, word: "per", start: 36.33, speaker: 2 },
    { end: 36.89, word: "noi", start: 36.57, speaker: 2 },
    { end: 37.21, word: "maschi", start: 36.89, speaker: 2 },
    { end: 37.53, word: "così", start: 37.21, speaker: 3 },
    { end: 37.77, word: "erano", start: 37.53, speaker: 3 },
    { end: 37.93, word: "più", start: 37.77, speaker: 3 },
    { end: 38.21, word: "invogliati", start: 37.93, speaker: 3 },
    { end: 38.49, word: "e", start: 38.21, speaker: 3 },
    { end: 38.65, word: "più", start: 38.49, speaker: 3 },
    { end: 39.15, word: "stimolati.", start: 38.65, speaker: 3 },
    { end: 39.53, word: "Signora", start: 39.29, speaker: 4 },
    { end: 39.85, word: "com'è", start: 39.53, speaker: 4 },
    { end: 40.01, word: "lo", start: 39.85, speaker: 4 },
    { end: 40.41, word: "sballo", start: 40.01, speaker: 4 },
    { end: 40.65, word: "nei", start: 40.41, speaker: 4 },
    { end: 40.89, word: "giovani", start: 40.65, speaker: 4 },
    { end: 41.39, word: "d'oggi?", start: 40.89, speaker: 4 },
    { end: 41.77, word: "Guarda", start: 41.45, speaker: 4 },
    { end: 41.85, word: "è", start: 41.77, speaker: 4 },
    { end: 42.17, word: "uno", start: 41.85, speaker: 4 },
    { end: 42.67, word: "schifo.", start: 42.17, speaker: 4 },
    { end: 43.245, word: "Io", start: 42.925, speaker: 4 },
    { end: 43.565, word: "vedo", start: 43.245, speaker: 4 },
    { end: 43.805, word: "a", start: 43.565, speaker: 4 },
    { end: 44.045, word: "mio", start: 43.805, speaker: 4 },
    { end: 44.545, word: "nipote", start: 44.045, speaker: 4 },
    { end: 45.165, word: "che", start: 44.845, speaker: 4 },
    { end: 45.405, word: "si", start: 45.165, speaker: 4 },
    { end: 45.805, word: "fa,", start: 45.405, speaker: 4 },
    { end: 46.045, word: "si", start: 45.805, speaker: 4 },
    { end: 46.285, word: "prende", start: 46.045, speaker: 4 },
    { end: 46.525, word: "quella", start: 46.285, speaker: 4 },
    { end: 47.025, word: "pilloletta", start: 46.525, speaker: 4 },
    { end: 47.565, word: "e", start: 47.245, speaker: 4 },
    { end: 47.805, word: "comincia", start: 47.565, speaker: 4 },
    { end: 47.965, word: "a", start: 47.805, speaker: 4 },
    { end: 48.445, word: "ballare", start: 47.965, speaker: 4 },
    { end: 48.765, word: "come", start: 48.445, speaker: 4 },
    { end: 48.925, word: "un", start: 48.765, speaker: 4 },
    { end: 49.425, word: "pubo.", start: 48.925, speaker: 4 },
    { end: 49.885, word: "Invece", start: 49.565, speaker: 4 },
    { end: 50.125, word: "io", start: 49.885, speaker: 4 },
    { end: 50.365, word: "mi", start: 50.125, speaker: 4 },
    { end: 50.765, word: "ricordo", start: 50.365, speaker: 4 },
    { end: 50.845, word: "a", start: 50.765, speaker: 4 },
    { end: 51.085, word: "mio", start: 50.845, speaker: 4 },
    { end: 51.585, word: "figlio", start: 51.085, speaker: 4 },
    { end: 52.04, word: "che", start: 51.8, speaker: 4 },
    { end: 52.4, word: "faceva?", start: 52.04, speaker: 4 },
    { end: 52.76, word: "Si", start: 52.4, speaker: 4 },
    { end: 53.08, word: "prendeva", start: 52.76, speaker: 4 },
    { end: 53.24, word: "il", start: 53.08, speaker: 4 },
    { end: 53.74, word: "laccetto,", start: 53.24, speaker: 4 },
    { end: 55.4, word: "si", start: 55.32, speaker: 4 },
    { end: 55.88, word: "riscaldava", start: 55.4, speaker: 4 },
    { end: 56.38, word: "il", start: 55.88, speaker: 4 },
    { end: 56.6, word: "coltellino,", start: 56.52, speaker: 4 },
    { end: 56.84, word: "poi", start: 56.6, speaker: 4 },
    { end: 57.24, word: "la", start: 56.84, speaker: 4 },
    { end: 57.74, word: "zilinga,", start: 57.24, speaker: 4 },
    { end: 58.92, word: "era", start: 58.76, speaker: 4 },
    { end: 59.24, word: "una", start: 58.92, speaker: 4 },
    { end: 59.72, word: "cosa", start: 59.24, speaker: 4 },
    { end: 60.22, word: "fatta", start: 59.72, speaker: 4 },
    { end: 60.44, word: "a", start: 60.28, speaker: 4 },
    { end: 60.94, word: "mestiere,", start: 60.44, speaker: 4 },
    { end: 61.985, word: "proprio.", start: 61.905, speaker: 0 },
    { end: 62.145, word: "I", start: 61.985, speaker: 0 },
    { end: 62.465, word: "giovani", start: 62.145, speaker: 0 },
    { end: 62.625, word: "di", start: 62.465, speaker: 0 },
    { end: 62.785, word: "una", start: 62.625, speaker: 0 },
    { end: 63.025, word: "volta", start: 62.785, speaker: 0 },
    { end: 63.425, word: "sembrano", start: 63.025, speaker: 0 },
    { end: 63.745, word: "darmi", start: 63.425, speaker: 0 },
    { end: 64.245, word: "ragione.", start: 63.745, speaker: 0 },
    { end: 64.465, word: "Ma", start: 64.305, speaker: 0 },
    { end: 64.705, word: "andiamo", start: 64.465, speaker: 0 },
    { end: 64.945, word: "a", start: 64.705, speaker: 0 },
    { end: 65.265, word: "sentire", start: 64.945, speaker: 0 },
    { end: 65.425, word: "cosa", start: 65.265, speaker: 0 },
    { end: 65.665, word: "ne", start: 65.425, speaker: 0 },
    { end: 65.985, word: "pensano", start: 65.665, speaker: 0 },
    { end: 66.065, word: "I", start: 65.985, speaker: 0 },
    { end: 66.385, word: "giovani", start: 66.065, speaker: 0 },
    { end: 66.885, word: "d'oggi.", start: 66.385, speaker: 0 },
    { end: 67.265, word: "Io", start: 66.945, speaker: 4 },
    { end: 67.585, word: "come", start: 67.265, speaker: 4 },
    { end: 67.905, word: "molti", start: 67.585, speaker: 4 },
    { end: 68.225, word: "altri", start: 67.905, speaker: 4 },
    { end: 68.725, word: "amo", start: 68.225, speaker: 4 },
    { end: 82.185, word: "A", start: 82.025, speaker: 0 },
    { end: 82.425, word: "noi", start: 82.185, speaker: 0 },
    { end: 82.585, word: "ci", start: 82.425, speaker: 0 },
    { end: 82.905, word: "piace", start: 82.585, speaker: 0 },
    { end: 83.145, word: "fare", start: 82.905, speaker: 0 },
    { end: 83.305, word: "I", start: 83.145, speaker: 0 },
    { end: 83.465, word: "tagli", start: 83.305, speaker: 0 },
    { end: 83.705, word: "sulle", start: 83.465, speaker: 0 },
    { end: 84.185, word: "braccia,", start: 83.705, speaker: 0 },
    { end: 84.425, word: "fa", start: 84.185, speaker: 0 },
    { end: 84.665, word: "troppo", start: 84.425, speaker: 0 },
    { end: 85.165, word: "figo,", start: 84.665, speaker: 0 },
    { end: 85.705, word: "peccato", start: 85.385, speaker: 0 },
    { end: 85.865, word: "che", start: 85.705, speaker: 0 },
    { end: 85.945, word: "il", start: 85.865, speaker: 0 },
    { end: 86.265, word: "frullo", start: 85.945, speaker: 0 },
    { end: 86.425, word: "è", start: 86.265, speaker: 0 },
    { end: 86.86, word: "esagerato", start: 86.425, speaker: 0 },
    { end: 89.02, word: "esagerato.", start: 88.86, speaker: 0 },
    { end: 89.34, word: "Che", start: 89.02, speaker: 0 },
    { end: 89.74, word: "fate", start: 89.34, speaker: 0 },
    { end: 90.24, word: "voi?", start: 89.74, speaker: 0 },
    { end: 90.54, word: "Noi", start: 90.46, speaker: 0 },
    { end: 91.04, word: "sniffiamo", start: 90.54, speaker: 0 },
    { end: 91.34, word: "le", start: 91.1, speaker: 0 },
    { end: 91.84, word: "capre", start: 91.34, speaker: 0 },
    { end: 92.06, word: "e", start: 91.9, speaker: 0 },
    { end: 92.3, word: "poi", start: 92.06, speaker: 0 },
    { end: 92.54, word: "veniamo", start: 92.3, speaker: 0 },
    { end: 92.78, word: "a", start: 92.54, speaker: 0 },
    { end: 93.26, word: "ballare.", start: 92.78, speaker: 0 },
    { end: 93.58, word: "Le", start: 93.26, speaker: 4 },
    { end: 94.08, word: "capre!", start: 93.58, speaker: 4 },
    { end: 95.735, word: "Noi", start: 95.335, speaker: 4 },
    { end: 96.055, word: "ci", start: 95.735, speaker: 4 },
    { end: 96.375, word: "facciamo", start: 96.055, speaker: 4 },
    { end: 96.615, word: "le", start: 96.375, speaker: 4 },
    { end: 96.855, word: "foto", start: 96.615, speaker: 4 },
    { end: 97.015, word: "ai", start: 96.855, speaker: 4 },
    { end: 97.515, word: "peli", start: 97.015, speaker: 4 },
    { end: 97.735, word: "e", start: 97.575, speaker: 4 },
    { end: 97.895, word: "poi", start: 97.735, speaker: 4 },
    { end: 98.135, word: "ce", start: 97.895, speaker: 4 },
    { end: 98.295, word: "le", start: 98.135, speaker: 4 },
    { end: 98.795, word: "scambiamo.", start: 98.295, speaker: 4 },
    { end: 102.535, word: "Quali", start: 102.375, speaker: 0 },
    { end: 102.695, word: "sono", start: 102.535, speaker: 0 },
    { end: 102.775, word: "I", start: 102.695, speaker: 0 },
    { end: 102.935, word: "tuoi", start: 102.775, speaker: 0 },
    { end: 103.435, word: "valori?", start: 102.935, speaker: 0 },
    { end: 122.65, word: "C'è", start: 122.33, speaker: 0 },
    { end: 122.97, word: "soltanto", start: 122.65, speaker: 0 },
    { end: 123.29, word: "la", start: 122.97, speaker: 0 },
    { end: 123.79, word: "svalutazione", start: 123.29, speaker: 0 },
    { end: 124.33, word: "del", start: 124.09, speaker: 0 },
    { end: 124.83, word: "vizio!", start: 124.33, speaker: 0 },
    { end: 125.69, word: "Purtroppo", start: 125.37, speaker: 0 },
    { end: 126.09, word: "oggi", start: 125.69, speaker: 0 },
    { end: 126.25, word: "è", start: 126.09, speaker: 0 },
    { end: 126.57, word: "tutto", start: 126.25, speaker: 0 },
    { end: 126.97, word: "troppo", start: 126.57, speaker: 0 },
    { end: 127.47, word: "comodo:", start: 126.97, speaker: 0 },
    { end: 127.93, word: "è", start: 127.77, speaker: 0 },
    { end: 128.09, word: "la", start: 127.93, speaker: 0 },
    { end: 128.41, word: "droga", start: 128.09, speaker: 0 },
    { end: 128.57, word: "che", start: 128.41, speaker: 0 },
    { end: 128.73, word: "te", start: 128.57, speaker: 0 },
    { end: 128.89, word: "la", start: 128.73, speaker: 0 },
    { end: 129.29, word: "tirano", start: 128.89, speaker: 0 },
    { end: 129.77, word: "dietro,", start: 129.29, speaker: 0 },
    { end: 129.93, word: "è", start: 129.77, speaker: 0 },
    { end: 130.17, word: "il", start: 129.93, speaker: 0 },
    { end: 130.335, word: "sesso", start: 130.17, speaker: 0 },
    { end: 130.495, word: "che", start: 130.335, speaker: 0 },
    { end: 130.575, word: "te", start: 130.495, speaker: 0 },
    { end: 130.655, word: "lo", start: 130.575, speaker: 0 },
    { end: 130.735, word: "portano", start: 130.655, speaker: 0 },
    { end: 131.235, word: "a", start: 130.735, speaker: 0 },
    { end: 131.875, word: "casa,", start: 131.375, speaker: 0 },
    { end: 132.175, word: "I", start: 131.935, speaker: 0 },
    { end: 132.495, word: "tabù", start: 132.175, speaker: 0 },
    { end: 132.735, word: "non", start: 132.495, speaker: 0 },
    { end: 133.135, word: "esistono", start: 132.735, speaker: 0 },
    { end: 133.375, word: "più", start: 133.135, speaker: 0 },
    { end: 133.455, word: "e", start: 133.375, speaker: 1 },
    { end: 133.695, word: "quindi", start: 133.455, speaker: 1 },
    { end: 133.775, word: "te", start: 133.695, speaker: 1 },
    { end: 134.015, word: "lo", start: 133.775, speaker: 1 },
    { end: 134.255, word: "prendi", start: 134.015, speaker: 1 },
    { end: 134.755, word: "nel", start: 134.255, speaker: 1 },
    { end: 135.455, word: "si", start: 135.215, speaker: 1 },
    { end: 135.615, word: "può", start: 135.455, speaker: 1 },
    { end: 135.855, word: "dire", start: 135.615, speaker: 1 },
    { end: 136.355, word: "culo?", start: 135.855, speaker: 1 },
    { end: 137.315, word: "Ragazzi", start: 136.815, speaker: 0 },
    { end: 138.035, word: "impegnatevi", start: 137.535, speaker: 0 },
    { end: 138.255, word: "a", start: 138.095, speaker: 0 },
    { end: 138.755, word: "trasgredire,", start: 138.255, speaker: 0 },
    { end: 139.295, word: "mi", start: 138.975, speaker: 0 },
    { end: 139.795, word: "raccomando!", start: 139.295, speaker: 0 },
    { end: 140.16, word: "Non", start: 140, speaker: 0 },
    { end: 140.32, word: "vi", start: 140.16, speaker: 0 },
    { end: 140.72, word: "fermate", start: 140.32, speaker: 0 },
    { end: 140.88, word: "alla", start: 140.72, speaker: 0 },
    { end: 141.2, word: "prima", start: 140.88, speaker: 0 },
    { end: 141.6, word: "cazzata", start: 141.2, speaker: 0 },
    { end: 141.84, word: "che", start: 141.6, speaker: 0 },
    { end: 142.16, word: "trovate", start: 141.84, speaker: 0 },
    { end: 142.4, word: "su", start: 142.16, speaker: 0 },
    { end: 142.8, word: "internet!", start: 142.4, speaker: 0 },
    { end: 142.96, word: "Ahi", start: 142.8, speaker: 4 },
    { end: 143.44, word: "Papi,", start: 142.96, speaker: 4 },
    { end: 143.52, word: "ti", start: 143.44, speaker: 4 },
    { end: 143.84, word: "presento", start: 143.52, speaker: 4 },
    { end: 143.92, word: "un", start: 143.84, speaker: 4 },
    { end: 144.08, word: "mio", start: 143.92, speaker: 4 },
    { end: 144.24, word: "nuovo", start: 144.08, speaker: 4 },
    { end: 144.74, word: "amico", start: 144.24, speaker: 4 },
    { end: 145.12, word: "Mario!", start: 145.04, speaker: 4 },
    { end: 145.36, word: "Ciao", start: 145.12, speaker: 0 },
    { end: 145.76, word: "Mario!", start: 145.36, speaker: 0 },
    { end: 146.16, word: "Troppo", start: 145.76, speaker: 4 },
    { end: 146.66, word: "alternativo!", start: 146.16, speaker: 4 },
    { end: 147.28, word: "Ma", start: 147.2, speaker: 4 },
    { end: 147.44, word: "non", start: 147.28, speaker: 4 },
    { end: 147.68, word: "che", start: 147.44, speaker: 4 },
    { end: 148.18, word: "fa?", start: 147.68, speaker: 4 },
    { end: 149.495, word: "Cos'è", start: 148.995, speaker: 0 },
    { end: 150.015, word: "Cobra?", start: 149.515, speaker: 0 },
    { end: 150.195, word: "Ma", start: 150.035, speaker: 0 },
    { end: 150.355, word: "che", start: 150.195, speaker: 0 },
    { end: 150.515, word: "fa", start: 150.355, speaker: 0 },
    { end: 151.015, word: "Tiffa?", start: 150.515, speaker: 0 },
    { end: 152.215, word: "Buono!", start: 151.715, speaker: 0 },
    { end: 155.955, word: "Hai", start: 155.715, speaker: 4 },
    { end: 156.455, word: "visto?", start: 155.955, speaker: 4 },
    { end: 156.96, word: "Non", start: 156.595, speaker: 4 },
    { end: 157.36, word: "si", start: 157.04, speaker: 4 },
    { end: 157.86, word: "droga!", start: 157.36, speaker: 4 },
    { end: 158.8, word: "Troppo", start: 158.32, speaker: 4 },
    { end: 159.3, word: "avanti!", start: 158.8, speaker: 4 },
    { end: 161.68, word: "Ma", start: 161.6, speaker: 0 },
    { end: 161.92, word: "dove", start: 161.68, speaker: 0 },
    { end: 162.32, word: "andremo", start: 161.92, speaker: 0 },
    { end: 162.56, word: "a", start: 162.32, speaker: 0 },
    { end: 163.06, word: "Finict?", start: 162.56, speaker: 0 },
  ],
  currentTime: 46.525,
};

export const Default = Template.bind({});
Default.args = defaultArgs;

export const VideoSync = VideoTemplate.bind({});
VideoSync.args = {
  ...defaultArgs,
};

export const Size = Template.bind({});
Size.args = {
  ...defaultArgs,
  size: "xxl",
};

export default {
  title: "Atoms/Typography/Highlight",
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
