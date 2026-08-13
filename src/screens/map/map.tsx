import { ScrollView, Text, View } from "react-native";
import { TopNavbar } from "@components";
import { BaseLayout } from "@ui/layout/base-layout";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@redux/store";
import { MapWebView } from "./map.webview";
import { useEffect, useRef } from "react";
import { setGeolocationData } from "@redux/slices/security/security-slice";
import { checkLocationPermission, getGeoLocationData } from "@utils";
import type { WebView } from "react-native-webview";
import { Link } from "expo-router";
import { Colors } from "@ui/theme/colors";

export type ActivityMessage = {
  type: "USER_ACTIVITY";
  source: "native" | "webview";
  event?: string;
};

export const MapScreen = () => {
  const location = useSelector((state: StoreState) => state.security.location);
  const address = useSelector((state: StoreState) => state.security.address);
  const dispatch = useDispatch();
  const webViewRef = useRef<WebView>(null);
  const lastLoggedAt = useRef<Record<string, number>>({});

  useEffect(() => {
    async function bootstrap() {
      if (!location || !address) {
        const permission = await checkLocationPermission();

        if (permission.granted) {
          const result = await getGeoLocationData();

          dispatch(setGeolocationData(result));
        }
      }
    }

    bootstrap();
  }, []);

  const throttledEvents = new Set(["touchMove", "scroll"]);
  const THROTTLE_MS = 100;

  const shouldLog = (name: string) => {
    if (!throttledEvents.has(name)) {
      return true;
    }

    const now = Date.now();

    if (now - (lastLoggedAt.current[name] || 0) >= THROTTLE_MS) {
      lastLoggedAt.current[name] = now;

      return true;
    }

    return false;
  };

  const reportActivity = (message: ActivityMessage) => {
    console.log("[native] received", JSON.stringify(message));
  };

  const reportNativeEvent = (name: string) => {
    if (!shouldLog(name)) {
      return;
    }

    const message: ActivityMessage = {
      type: "USER_ACTIVITY",
      source: "native",
      event: name,
    };

    console.log("[native] detected", JSON.stringify(message));
    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  return (
    <BaseLayout headerComponent={<TopNavbar />} footerComponent={<></>}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          minWidth: "100%",
          backgroundColor: "white",
          padding: 20,
          justifyContent: "flex-start",
          alignItems: "center",
          rowGap: 20,
        }}
        onTouchStart={() => reportNativeEvent("touchStart")}
        onTouchMove={() => reportNativeEvent("touchMove")}
        onTouchEnd={() => reportNativeEvent("touchEnd")}
        onScroll={() => reportNativeEvent("scroll")}
      >
        <View
          style={{
            flex: 1,
            width: "100%",
          }}
        >
          <Text>{`latitude: ${location?.coords.latitude}`}</Text>
          <Text>{`longitude: ${location?.coords.longitude}`}</Text>
          <Text>{`altitude: ${location?.coords.altitude}`}</Text>
          <Text>{`mocked: ${location?.mocked}`}</Text>
          <Text></Text>
          <View>
            {Object.entries(address || {}).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 300,
              height: 300,
              borderRadius: 150,
              overflow: "hidden",
            }}
          >
            <MapWebView
              webViewRef={webViewRef}
              latitude={location?.coords.latitude || 0}
              longitude={location?.coords.longitude || 0}
              reportActivity={reportActivity}
            />
          </View>
        </View>

        {/* <View
          style={{
            height: 600,
            borderColor: "black",
            borderWidth: 5,
            justifyContent: "flex-start",
            alignSelf: "stretch",
          }}
        >
          <WebView
            testID="docs-webview"
            accessibilityLabel="docs-webview"
            userAgent="DocsWebView"
            source={{ uri: "https://reactnative.dev/" }}
            style={{ flex: 1 }}
          />
        </View> */}

        <View>
          <Link style={{ color: Colors.Black }} href="https://example.com/">
            Test Link
          </Link>
        </View>
      </ScrollView>
    </BaseLayout>
  );
};
