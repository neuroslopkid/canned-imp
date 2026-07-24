import { ScrollView, Text, View } from "react-native";
import { TopNavbar } from "@components";
import { BaseLayout } from "@ui/layout/base-layout";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@redux/store";
import { MapWebView } from "./map.webview";
import { useEffect } from "react";
import { setGeolocationData } from "@redux/slices/security/security-slice";
import { checkLocationPermission, getGeoLocationData } from "@utils";
import WebView from "react-native-webview";

export const MapScreen = () => {
  const location = useSelector((state: StoreState) => state.security.location);
  const address = useSelector((state: StoreState) => state.security.address);
  const dispatch = useDispatch();

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
            <MapWebView latitude={location?.coords.latitude || 0} longitude={location?.coords.longitude || 0} />
          </View>
        </View>

        <View
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
        </View>
      </ScrollView>
    </BaseLayout>
  );
};
