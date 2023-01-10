import { Settings } from "react-slick";

export interface SliderArgs extends Settings {
  counter?: boolean;
  customCounter?: (current: number, total: number) => React.ReactNode;
}
