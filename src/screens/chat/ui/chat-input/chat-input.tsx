/* eslint-disable curly */
import { View, StyleSheet, Text, Alert } from "react-native";
import { Input } from "@components/inputs/input";
import { Colors } from "@ui/theme/colors";
import { IconButton } from "@ui/components/buttons/icon-button";
import { Sizes } from "@ui/theme/sizes";
import { setDebugStyles } from "@ui/theme/debug.styles";
import { Ionicons } from "@expo/vector-icons";
import { getScaledSize } from "@helpers/getScaledSize";
import { useDimensions } from "@context";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setMessages } from "@redux/slices/chat/chat-slice";
import { RightChatButtons } from "./right-chat-buttons";
import { useLLMModels } from "@context/llm.provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  scheduleNotificationAsync,
  SchedulableTriggerInputTypes,
  cancelAllScheduledNotificationsAsync,
  getAllScheduledNotificationsAsync,
} from "expo-notifications";
import { checkNotificationPermission } from "@utils";
import * as Notifications from "expo-notifications";

const NOTIFICATION_STORAGE_KEY = "scheduledNotificationId";

const startNotification = async () => {
  const identifier = await scheduleNotificationAsync({
    content: {
      title: "Look at that notification",
      body: "I'm so proud of myself!",
      data: { userName: "user" },
    },
    trigger: {
      type: SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });
  await AsyncStorage.setItem(NOTIFICATION_STORAGE_KEY, identifier);

  return true;
};

const stopNotification = async () => {
  await cancelAllScheduledNotificationsAsync();
  await AsyncStorage.removeItem(NOTIFICATION_STORAGE_KEY);

  return false;
};

export const ChatInput = () => {
  const dimensions = useDimensions();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState<string>("");
  const [notificationActive, setNotificationActive] = useState(false);
  const [notificationLoading, setNotificationLoading] = useState(false);
  const { llm, openModelPicker } = useLLMModels();

  const handleTextChange = (text: string) => {
    setInputValue(text);
  };

  useEffect(() => {
    (async () => {
      const savedId = await AsyncStorage.getItem(NOTIFICATION_STORAGE_KEY);
      const scheduled = await getAllScheduledNotificationsAsync();
      const stillActive = savedId && scheduled.some((n) => n.identifier === savedId);
      setNotificationActive(!!stillActive);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.getItem("lastMessage").then((message) => setInputValue(message || ""));
  }, []);

  useEffect(() => {
    dispatch(setMessages([...(llm?.messageHistory || [])]));
  }, [llm?.isGenerating]);

  return (
    <View
      style={[
        styles.container,
        {
          maxWidth: getScaledSize(373, dimensions),
          borderRadius: getScaledSize(20, dimensions),
          height: getScaledSize(Sizes.LineHeight * 2 + 30, dimensions),
          padding: getScaledSize(10, dimensions),
        },
        setDebugStyles(),
      ]}
    >
      <View style={[styles.input, setDebugStyles()]}>
        <Input
          placeholder={"Ask anything... if you dare..."}
          style={{ borderColor: Colors.Transparent, backgroundColor: Colors.Transparent }}
          value={inputValue}
          onChangeText={handleTextChange}
        />
      </View>
      <View style={[styles.buttonsWrapper, setDebugStyles()]}>
        <View style={[styles.leftButtons, setDebugStyles()]}>
          <IconButton
            icon={
              <>
                <Ionicons name="code-download" size={getScaledSize(24, dimensions)} color={Colors.White} />
                {llm != null && llm.downloadProgress > 0 && (
                  <Text
                    style={{
                      color: Colors.TextPrimary,
                      fontSize: 10,
                      position: "absolute",
                      bottom: -5,
                      alignSelf: "center",
                    }}
                  >
                    {Math.trunc(llm?.downloadProgress * 100)}%
                  </Text>
                )}
                {llm != null && llm.isReady && (
                  <Text
                    style={{
                      color: Colors.TextPrimary,
                      fontSize: 10,
                      position: "absolute",
                      bottom: -5,
                      alignSelf: "center",
                    }}
                  >
                    Ready
                  </Text>
                )}
                {(llm === null || !llm.isReady) && !llm?.downloadProgress && (
                  <Text
                    style={{
                      color: Colors.Danger,
                      fontSize: 10,
                      position: "absolute",
                      bottom: -5,
                      alignSelf: "center",
                      textAlign: "center",
                    }}
                  >
                    Empty
                  </Text>
                )}
              </>
            }
            onPress={openModelPicker}
            iconStyle={{ top: -5 }}
          />
          <IconButton
            icon={
              <Ionicons
                name={notificationActive ? "notifications-off" : "notifications"}
                size={getScaledSize(24, dimensions)}
                color={notificationLoading ? Colors.Accent : notificationActive ? Colors.Danger : Colors.White}
              />
            }
            disabled={notificationLoading}
            onPress={async () => {
              if (notificationLoading) {
                return;
              }
              setNotificationLoading(true);
              try {
                if (notificationActive) {
                  setNotificationActive(await stopNotification());
                } else {
                  const permission = await checkNotificationPermission();
                  if (permission.status === Notifications.PermissionStatus.DENIED) {
                    Alert.alert("Permission Denied", "Please enable notifications in Settings.");

                    return;
                  } else {
                    setNotificationActive(await startNotification());
                  }
                }
              } catch (error) {
                // eslint-disable-next-line no-console
                console.log("Notification toggle failed:", error);
                if (!notificationActive) setNotificationActive(false);
              } finally {
                setNotificationLoading(false);
              }
            }}
          />
        </View>
        <View style={[styles.rightButtons, setDebugStyles()]}>
          <RightChatButtons inputValue={inputValue} setInputValue={setInputValue} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BackgroundPrimary,
    borderColor: Colors.BorderMedium,
    borderWidth: 1,
    overflow: "hidden",
  },
  input: {
    flex: 1,
    width: "100%",
    textAlign: "left",
  },
  buttonsWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  leftButtons: { flex: 0.5, flexDirection: "row", justifyContent: "flex-start" },
  rightButtons: { flex: 0.5, flexDirection: "row", justifyContent: "flex-end" },
});
