import { Dimensions, ScaledSize } from "react-native";

export const getDimensions = (type: "screen" | "window" = "screen"): ScaledSize => {
  return Dimensions.get(type);
};

export const getOrientation = (scaledSize: ScaledSize): "portrait" | "album" => {
  if (scaledSize.width > scaledSize.height) {
    return "album";
  } else {
    return "portrait";
  }
};
