import { ScaledSize } from "react-native";
import { Breakpoints } from "@constants/breakpoints";
import { getDimensions, getOrientation } from "@helpers/getDimensions";

export const getScaledSize = (size: number, screen: ScaledSize | null = null): number => {
  let screenSize;

  if (!screen) {
    screenSize = getDimensions("screen");
  } else {
    screenSize = screen;
  }

  const orientation = getOrientation(screenSize);

  if (orientation === "portrait") {
    if (screenSize.width <= Breakpoints.Phone) {
      return size;
    } else if (screenSize.width > Breakpoints.Phone && screenSize.width <= Breakpoints.Tablet) {
      return size * 1.5;
    }
  } else if (orientation === "album") {
    if (screenSize.width <= Breakpoints.Phone) {
      return size;
    } else if (screenSize.width > Breakpoints.Phone && screenSize.width <= Breakpoints.Tablet) {
      return size * 2;
    }
  } 

  return size;
};
