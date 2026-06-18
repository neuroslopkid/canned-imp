import { IconButton } from "@components/buttons/icon-button";
import { useDimensions } from "@context";
import { Ionicons } from "@expo/vector-icons";
import { getScaledSize } from "@helpers";
import { Colors } from "@ui/theme/colors";

export const MicButton = ({ disabled, onPress }: any) => {
  const dimensions = useDimensions();

  return (
    <IconButton
      disabled={disabled}
      onPress={onPress}
      icon={
        <Ionicons
          name="mic"
          style={{ opacity: !disabled ? 1 : 0.5 }}
          size={getScaledSize(24, dimensions)}
          color={Colors.White}
        />
      }
    />
  );
};
