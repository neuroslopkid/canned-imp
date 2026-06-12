import { createContext, ReactNode, useContext } from "react";
import { ScaledSize, useWindowDimensions } from "react-native";

const DimensionsContext = createContext<ScaledSize | null>(null);

export const DimensionsProvider = ({ children }: { children: ReactNode }) => {
  const dimensions = useWindowDimensions();

  return <DimensionsContext.Provider value={dimensions}>{children}</DimensionsContext.Provider>;
};

export const useDimensions = () => {
  const context = useContext(DimensionsContext);

  return context;
};
