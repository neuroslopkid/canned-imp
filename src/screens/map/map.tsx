import { Text, View } from "react-native";
import { TopNavbar } from "@components";
import { BaseLayout } from "@ui/layout/base-layout";
import { useDispatch, useSelector } from "react-redux";
import { StoreState } from "@redux/store";
import { MapWebView } from "./map.webview";
import { useEffect } from "react";
import { setGeolocationData } from "@redux/slices/security/security-slice";
import { checkLocationPermission, getGeoLocationData } from "@utils";

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
      <View style={{ backgroundColor: "white", flex: 1, width: "100%" }}>
        <Text>{`latitude: ${location?.coords.latitude}`}</Text>
        <Text>{`longitude: ${location?.coords.longitude}`}</Text>
        <Text>{`altitude: ${location?.coords.altitude}`}</Text>
        <Text>{`mocked: ${location?.mocked}`}</Text>
        <Text></Text>
        <Text>
          {Object.entries(address || {})
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n")}
        </Text>

        <View
          style={{
            justifyContent: "flex-start",
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
      </View>
    </BaseLayout>
  );
};
