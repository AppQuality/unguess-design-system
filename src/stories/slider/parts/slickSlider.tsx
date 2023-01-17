import { SliderArgs } from "../_types";
import SlickSlider from "react-slick";
import styled from "styled-components";

export const StyledSlick = styled(SlickSlider)<SliderArgs>`
  position: relative;
  display: block;
  box-sizing: border-box;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  height: 100%;

  .slick-list,
  .slick-track {
    position: relative;
    display: block;
    transform: translate3d(0, 0, 0);
  }

  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;

    &.dragging {
      cursor: pointer;
      cursor: hand;
    }

    &:focus {
      outline: 0;
    }

    .slick-track {
      top: 0;
      left: 0;

      &:after,
      &:before {
        display: table;
        content: "";
      }

      &:after {
        clear: both;
      }

      .slick-slide {
        float: left;
        min-height: 1px;

        img, video {
          display: block;
          height: 100%;
          width: auto;
          margin: 0 auto;
          max-width: 100%;
        }

        &.dragging img {
          pointer-events: none;
        }
      }
    }
  }

  .slick-disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .slick-dots {
    position: absolute;
    display: block;
    padding: 0;
    bottom: -25px;
    width: 100%;
    margin: 0;
    list-style: none;
    text-align: center;

    & li {
      position: relative;
      display: inline-block;
      padding: ${({ theme }) => theme.space.xxs};
      cursor: pointer;
    }
  }
`;
