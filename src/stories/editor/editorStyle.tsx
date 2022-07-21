import { css } from "styled-components";

export const editorStyle = css`
  > * + * {
    margin-top: 0.75em;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  h1 {
    font-size: 2.617924em;
  }

  h2 {
    font-size: 1.618em;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.3rem;
  }

  h5 {
    font-size: 1.2rem;
  }

  h6 {
    font-size: 1.1rem;
  }

  /*=====
      #Lists
      =====*/
  ul,
  ol,
  dl {
    padding: 0.618em 0.618rem; /* Comment-A */
  }

  li {
    text-indent: -0.9em;
    line-height: 1.618;
    padding: 0;
    margin: 0 0 0 0.618rem;
  }

  li {
    list-style-position: inside;
  }

  dt {
    text-indent: -0.618rem;
  }

  dd {
    margin: 0;
    padding: 0 0.618rem 0 0.618rem;
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 2rem 0;
  }

  p,
  blockquote {
    line-height: 1.618;
  }

  p {
    font-size: 1rem;
    margin-bottom: 0.618em;
  }

  blockquote {
    background: rgba(165, 165, 165, 0.15);
    border-left: 2px solid rgba(#0d0d0d, 0.1);
    margin: 1.618em 0.618rem;
    padding: 0.618em 0.618rem;
  }

  blockquote::before {
    color: rgb(193, 193, 193);
    content: open-quote;
    font-size: 4em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
  }

  em,
  i,
  cite {
    font-style: italic;
  }

  strong,
  b {
    font-weight: 700;
  }

  cite {
    display: block;
    text-align: right;
  }

  u {
    text-decoration: none;
    border-bottom: 1px dotted red;
  }

  small,
  sub,
  sup {
    font-size: var(0.618rem);
    line-height: 1;
  }

  sub {
    vertical-align: sub;
  }

  sup {
    vertical-align: super;
  }

  s,
  strike,
  del,
  ins {
    color: rgb(193, 193, 193);
  }

  s,
  strike,
  del {
    text-decoration: strikethrough;
  }

  ins,
  del {
    background-color: rgba(220, 220, 220, 0.25);
  }

  ins {
    text-decoration: none;
  }

  /*
      mark and selection should be different, so user knows which one they've selected.
      
      mark and selections:
      saturation: 44%
      lightness: 75%
      Hue is different
      */
  mark {
    background-color: rgba(165, 220, 165, 0.9);
  }

  ::selection {
    background-color: rgba(165, 220, 220, 0.9);
  }

  /* Because mark and selection have same saturation, brightenss, mark won't easily stand out if it's selected */
  mark::selection {
    background-color: rgba(165, 220, 110, 0.9);
  }

  /* dfn and dt both do the same thing: denote a term to be defined */
  dfn,
  dt {
    font-style: oblique;
    font-weight: 700;
    text-transform: capitalize;
  }

  code {
    background-color: ${({ theme }) => theme.palette.grey[200]};
    color: ${({ theme }) => theme.palette.red[600]};
    padding: 0.2rem 0.3rem;
    border-radius: 4px;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: "JetBrainsMono", monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  kbd,
  samp,
  data {
    background-color: rgba(165, 165, 165, 0.2);
  }

  kbd {
    font-size: var(0.75rem);
    padding: 0.25ex 0.5ex;
    border: 1px solid var(rgb(193, 193, 193));
    border-radius: 3px;
  }

  /*Treat samp like a mini blockquote. because basically you're quoting what the computer would do*/
  samp,
  data {
    padding: 0 10px;
  }

  var,
  data {
    font-style: italic;
  }

  samp {
    border-left: 5px solid var(rgb(193, 193, 193));
  }

  data {
    padding: 0 10px;
  }

`;
