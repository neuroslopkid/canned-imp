import { ActivityIndicator } from "react-native";
import { IconButton } from "@components/buttons/icon-button";
import { getScaledSize } from "@helpers/getScaledSize";
import { Ionicons } from "@expo/vector-icons";
import { MicButton } from "./mic-button";
import { Colors } from "@ui/theme/colors";
import { useDimensions, useLLMModels } from "@context";

export const RightChatButtons = ({
  inputValue = "",
  setInputValue,
}: {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dimensions = useDimensions();
  const llm = useLLMModels();

  const handleSendText = () => {
    if (llm?.isReady && !llm?.isGenerating && llm?.sendMessage && inputValue) {
      llm?.sendMessage(inputValue);
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
        />
      )}
      {inputValue ? (
        <IconButton
          disabled={!inputValue}
          onPress={handleSendText}
          icon={
            llm?.isGenerating ? (
              <ActivityIndicator color={Colors.TextPrimary} />
            ) : (
              <Ionicons name="arrow-up-circle" size={getScaledSize(24, dimensions)} color={Colors.White} />
            )
          }
        />
      ) : (
        <MicButton disabled={!inputValue} onPress={handleSendText} />
      )}
    </>
  );
};
