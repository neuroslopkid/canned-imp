import { IconButton } from "@components/buttons/icon-button";
import { useDimensions } from "@context/dimensions.provider";
import { Ionicons } from "@expo/vector-icons";
import { getScaledSize } from "@helpers";
import { Colors } from "@ui/theme/colors";
import { PressableProps } from "react-native";

export const MicButton = ({ disabled, onPress, ...props }: { disabled: boolean; onPress: any } & PressableProps) => {
  const dimensions = useDimensions();

  return (
    <IconButton
      disabled={disabled}
      onPress={onPress}
      {...props}
      icon={
        <Ionicons
          name="mic"
          style={{ opacity: !disabled ? 1 : 0.5 }}
          size={getScaledSize(24, dimensions)}
          color={Colors.White}
          testID="mic-icon"
        />
      }
    />
  );
};
