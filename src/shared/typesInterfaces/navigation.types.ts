import { Screens } from "@constants/screens";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type StackParamList = {
  [Screens.Chat]: { welcome?: string };
  [Screens.Playground]: undefined;
};

export type NavigationTypes = NativeStackNavigationProp<StackParamList>;
