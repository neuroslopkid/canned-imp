import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, AppState, AppStateStatus, Text, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { hideAsync, preventAutoHideAsync } from "expo-splash-screen";
import { useDispatch } from "react-redux";
import { Fonts } from "@ui/theme/fonts";
import { Colors } from "@ui/theme/colors";
import { AllowedCountriesList } from "@constants";
import { checkLocationPermission, getGeoLocationData } from "@utils";
import { setGeolocationData } from "@redux/slices/security/security-slice";
import { NotificationLoop } from "@shared/notifications";

preventAutoHideAsync();

export default function Main() {
  const dispatch = useDispatch();
  const previousAppState = useRef(AppState.currentState);
  const [allowed, setAllowed] = useState<boolean | null>(null);

  const [fontsLoaded] = useFonts({
    [Fonts.OpenSans]: require("../../../assets/fonts/OpenSans-Regular.ttf"),
    [Fonts.OpenSansBold]: require("../../../assets/fonts/OpenSans-Bold.ttf"),
  });

  async function validateLocation() {
    const permission = await checkLocationPermission();

    if (!permission.granted) {
      dispatch(
        setGeolocationData({
          location: undefined,
          address: undefined,
        }),
      );

      setAllowed(false);

      return;
    }

    const { location, address } = await getGeoLocationData();

    dispatch(
      setGeolocationData({
        location,
        address,
      }),
    );

    setAllowed(!location.mocked && AllowedCountriesList.includes(address?.isoCountryCode ?? ""));
  }

  useEffect(() => {
    validateLocation();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState: AppStateStatus) => {
      if (previousAppState.current.match(/inactive|background/) && nextState === "active") {
        validateLocation();
      }

      previousAppState.current = nextState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    if (fontsLoaded && allowed !== null) {
      hideAsync();
    }
  }, [fontsLoaded, allowed]);

  if (!fontsLoaded || allowed === null) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          columnGap: 20,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text testID="app-loading" accessibilityLabel="app-loading">
          Loading...
        </Text>
        <ActivityIndicator color={Colors.Black} />
      </View>
    );
  }

  if (!allowed) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Text testID="region-not-supported" accessibilityLabel="region-not-supported">
          Your region is not currently supported.
        </Text>
      </View>
    );
  }

  return (
    <>
      <NotificationLoop />
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
