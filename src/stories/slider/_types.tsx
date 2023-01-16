import { Settings } from "react-slick";

export interface SliderArgs extends Settings {
  counter?: boolean;
  onSlideChange?: (currentSlide: number) => void;
}

export interface SliderContextType {
  sliderH?: number;
  setSliderH: (h: number) => void;
}
