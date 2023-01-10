import { Children, useState } from "react";
import { useCallback } from "react";
import { Button } from "../buttons/button";
import { PrevButton, NextButton } from "./parts/buttons";
import { StyledSlick } from "./parts/slickSlider";
import { SliderArgs } from "./_types";

const defaultSettings: SliderArgs = {
  dots: false,
  infinite: true,
  adaptiveHeight: true,
  nextArrow: <NextButton />,
  prevArrow: <PrevButton />,
  customPaging: (i) => <Button isBasic>{i + 1}</Button>,
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
    (oldIndex:number, index: number) => {
      setCurrent(index);
      console.log("Index:", index, "Current:", current, "Slides:", slides);
    },
    [current]
  );


  return <StyledSlick {...settings} beforeChange={updateSlide}/>;
};
