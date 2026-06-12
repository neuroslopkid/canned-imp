import { View } from "react-native";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { Ex1 } from "./experiments/ex1";
import { Ex2 } from "./experiments/ex2";
import { Sizes } from "@ui/theme/sizes";
import { Ex3 } from "./experiments/ex3";
import { Ex4 } from "./experiments/ex4";

export const PolygonOfDoom = () => {
  return (
    <View
      style={[
        { flex: 1, width: "100%", justifyContent: "flex-start", alignItems: "center", rowGap: 10 },
        setDebugStyles({ activate: true }),
      ]}
    >
      <View style={{ height: Sizes.LineHeight, width: "50%" }}>
        <Ex1 />
      </View>

      <View style={{ height: Sizes.LineHeight, width: "50%" }}>
        <Ex2 />
      </View>

      <View style={{ height: Sizes.LineHeight, width: "100%" }}>
        <Ex3 />
      </View>

      <View style={{ height: Sizes.LineHeight, width: "100%" }}>
        <Ex4 />
      </View>
    </View>
  );
};
