import { Platform, Text, View } from "react-native";
import { TopNavbar } from "@components";
import { BaseLayout } from "@ui/layout/base-layout";
import * as ExpoLocation from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLocation } from "@redux/slices/security";
import { StoreState } from "@redux/store";
import { MapWebView } from "./map.webview";

export const MapScreen = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [geoData, setGeoData] = useState<ExpoLocation.LocationGeocodedAddress[]>([]);
  const [_, requestLocationPermission] = ExpoLocation.useForegroundPermissions();
  const locationData = useSelector((state: StoreState) => state.security.location);
  const dispatch = useDispatch();

  useEffect(() => {
    const requestPermission = async () => {
      if (!hasPermission) {
        const permissionResponse = await requestLocationPermission();

        if (Platform.OS === "android") {
          setHasPermission(
            permissionResponse.android?.accuracy === "coarse" || permissionResponse.android?.accuracy === "fine",
          );
        } else if (Platform.OS === "ios") {
          setHasPermission(permissionResponse.ios?.scope === "always" || permissionResponse.ios?.scope === "whenInUse");
        }
      }
    };

    requestPermission();
  }, []);

  useEffect(() => {
    if (!hasPermission) return;

    const loadLocation = async () => {
      const location = await ExpoLocation.getCurrentPositionAsync();

      const addresses = await ExpoLocation.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      setGeoData(addresses);

      dispatch(setLocation(location));
    };

    loadLocation();
  }, [hasPermission, dispatch]);

  return (
    <BaseLayout headerComponent={<TopNavbar />} footerComponent={<></>}>
      <View style={{ backgroundColor: "white", flex: 1, width: "100%" }}>
        <Text>{`latitude: ${locationData?.coords.latitude}`}</Text>
        <Text>{`longitude: ${locationData?.coords.longitude}`}</Text>
        <Text>{`altitude: ${locationData?.coords.altitude}`}</Text>
        <Text>{`mocked: ${locationData?.mocked}`}</Text>
        <Text></Text>
        {geoData?.map((item, index) => (
          <Text key={index}>
            {Object.entries(item)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")}
          </Text>
        ))}
        <MapWebView latitude={locationData?.coords.latitude || 0} longitude={locationData?.coords.longitude || 0} />
      </View>
    </BaseLayout>
  );
};
