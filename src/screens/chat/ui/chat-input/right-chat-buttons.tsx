import { ActivityIndicator } from "react-native";
import { IconButton } from "@components/buttons/icon-button";
import { getScaledSize } from "@helpers/getScaledSize";
import { Ionicons } from "@expo/vector-icons";
import { MicButton } from "./mic-button";
import { Colors } from "@ui/theme/colors";
import { useDimensions } from "@context/dimensions.provider";
import { useLLMModels } from "@context/llm.provider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RightChatButtons = ({
  inputValue,
  setInputValue,
}: {
  inputValue?: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dimensions = useDimensions();
  const llm = useLLMModels();

  const handleSendText = async () => {
    if (llm?.isReady && !llm?.isGenerating && llm?.sendMessage && inputValue) {
      llm?.sendMessage(inputValue);
      await AsyncStorage.setItem("lastMessage", inputValue);
      setInputValue("");
    }
  };

  const handeInterrupt = () => {
    if (llm?.isGenerating && llm?.interrupt) {
      llm?.interrupt();
    }
  };

  return (
    <>
      {llm?.isGenerating && (
        <IconButton
          disabled={!llm.isGenerating}
          onPress={handeInterrupt}
          icon={<Ionicons name="close" size={getScaledSize(24, dimensions)} color={Colors.White} />}
          testID="interrupt-llm-button"
        />
      )}
      {inputValue ? (
        <IconButton
          disabled={!inputValue}
          onPress={handleSendText}
          testID="send-message-to-llm-button"
          icon={
            llm?.isGenerating ? (
              <ActivityIndicator color={Colors.TextPrimary} testID="activity-indicator" />
            ) : (
              <Ionicons name="arrow-up-circle" size={getScaledSize(24, dimensions)} color={Colors.White} />
            )
          }
        />
      ) : (
        <MicButton disabled={!inputValue} onPress={handleSendText} testID="stt-mic-button" />
      )}
    </>
  );
};
