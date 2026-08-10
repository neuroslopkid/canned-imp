import { ActivityIndicator } from "react-native";
import { IconButton } from "@components/buttons/icon-button";
import { getScaledSize } from "@helpers/getScaledSize";
import { Ionicons } from "@expo/vector-icons";
import { MicButton } from "./mic-button";
import { Colors } from "@ui/theme/colors";
import { useDimensions } from "@context/dimensions.provider";
import { useLLMModels } from "@context/llm.provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deliverReplyAsNotification } from "@shared/notifications";

export const RightChatButtons = ({
  inputValue,
  setInputValue,
}: {
  inputValue?: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dimensions = useDimensions();
  const { llm } = useLLMModels();

  const handleSendText = async () => {
    if (!llm?.isReady || llm?.isGenerating || !llm?.sendMessage || !inputValue) {
      return;
    }

    const message = inputValue;
    setInputValue("");

    try {
      const responseMessage = await llm.sendMessage(message);
      await deliverReplyAsNotification(responseMessage || "");
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn("Failed to send message:", error);
      setInputValue(message);
    } finally {
      await AsyncStorage.setItem("lastMessage", message);
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
          disabled={!llm?.isReady || !llm.isGenerating}
          onPress={handeInterrupt}
          icon={<Ionicons name="close" size={getScaledSize(24, dimensions)} color={Colors.White} />}
          testID="interrupt-llm-button"
        />
      )}
      {inputValue ? (
        <IconButton
          disabled={!inputValue || !llm?.isReady}
          onPress={handleSendText}
          testID="send-message-to-llm-button"
          icon={
            llm?.isGenerating ? (
              <ActivityIndicator color={Colors.TextPrimary} testID="activity-indicator" />
            ) : (
              <Ionicons
                name="arrow-up-circle"
                size={getScaledSize(24, dimensions)}
                style={{ opacity: inputValue && llm?.isReady ? 1 : 0.5 }}
                color={Colors.White}
              />
            )
          }
        />
      ) : !llm?.isGenerating ? (
        <MicButton disabled={!inputValue} onPress={handleSendText} testID="stt-mic-button" />
      ) : (
        <ActivityIndicator color={Colors.TextPrimary} testID="activity-indicator" />
      )}
    </>
  );
};
