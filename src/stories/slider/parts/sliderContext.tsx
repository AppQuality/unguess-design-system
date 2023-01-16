import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useWindowSize from "../../../hooks/useWindowSize";

import { SliderContextType } from "../_types";
import { SliderContainer } from "./container";

export const SliderContext = createContext<SliderContextType | null>(null);

export const SliderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sliderH, setSliderH] = useState<number | undefined>();
  const sliderRef = useRef<HTMLDivElement>(null);

  const windowSize = useWindowSize();

  const SliderContextValue = useMemo(() => {
    return {
      sliderH,
      setSliderH,
    };
  }, [sliderH, setSliderH]);

  useEffect(() => {
    if (sliderRef.current?.clientHeight)
      setSliderH(sliderRef.current.clientHeight);
  }, [sliderRef, windowSize]);

  return (
    <SliderContext.Provider value={SliderContextValue}>
      <SliderContainer ref={sliderRef}>{children}</SliderContainer>
    </SliderContext.Provider>
  );
};

export const useSliderContext = () => {
  const context = useContext(SliderContext);

  if (!context) throw new Error("Provider not found for SliderContextProvider");

  return context; // Now we can use the context in the component, SAFELY.
};
