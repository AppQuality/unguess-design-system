import { Children, useState } from "react";
import { useCallback } from "react";
import { Button } from "../buttons/button";
import { PrevButton, NextButton } from "./parts/buttons";
import {
  SliderContextProvider,
} from "./parts/sliderContext";
import { SliderCounter } from "./parts/counter";
import { StyledSlick } from "./parts/slickSlider";
import { Slide } from "./parts/slide";
import { SliderArgs } from "./_types";

const defaultSettings: SliderArgs = {
  dots: false,
  infinite: true,
  adaptiveHeight: true,
  nextArrow: <NextButton />,
  prevArrow: <PrevButton />,
  customPaging: (i) => <Button isBasic>{i + 1}</Button>,
  counter: true,
};

/**
 * Slider is a simple component used to show a series of generic container.
 * All spaces and margins are delegated to related content component.
 * <hr>
 * Used for this:
    - Show media content
    - As a slideshow component
 */
export const Slider = (props: SliderArgs) => {
  const [current, setCurrent] = useState<number>(props.initialSlide || 0);
  const settings = { ...defaultSettings, ...props };
  const slides = Children.toArray(settings.children).length;

  const updateSlide = useCallback(
    (oldIndex: number, index: number) => {
      setCurrent(index);
      if(props.onSlideChange) props.onSlideChange(index);
    },
    [current]
  );

  return (
    <SliderContextProvider>
      {settings.counter && <SliderCounter current={current} total={slides} />}
      <StyledSlick {...settings} beforeChange={updateSlide} />
    </SliderContextProvider>
  );
};

Slider.Slide = Slide;
Slider.PrevButton = PrevButton;
Slider.NextButton = NextButton;
