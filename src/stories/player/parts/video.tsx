import { css } from "styled-components";

export const VideoStyle = css`
  .player-container {
    display: block;
    height: 100%;
    width: auto;
    margin: 0 auto;
    max-width: 100%;
    background-color: transparent !important;
    padding-bottom: 1px;
    padding-top: 1px;

    video {
      display: block;
      height: 100%;
      width: auto;
      margin: 0 auto;
      max-width: 100%;
    }
  }
`;
