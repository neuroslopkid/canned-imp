import { Platform, Text } from "react-native";
import { TopNavbar } from "@components";
import { BaseLayout } from "@ui/layout/base-layout";
import ExpoLocation, { useForegroundPermissions } from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setLocation } from "@redux/slices/security";
import { StoreState } from "@redux/store";

export const MapScreen = async () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [_, requestLocationPermission] = useForegroundPermissions();
  const locationData = useSelector((state: StoreState) => state.security.location);

  const checkHasPermissions = async () => {
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

  useEffect(() => {
    checkHasPermissions();
  }, []);

  if (hasPermission) {
    const { getCurrentPositionAsync } = ExpoLocation;

    const location = await getCurrentPositionAsync();
    const dispatch = useDispatch();

    dispatch(setLocation(location));
  }

  return (
    <BaseLayout headerComponent={<TopNavbar />} footerComponent={<></>}>
      <Text>{`${locationData?.coords}`}</Text>
    </BaseLayout>
  );
};
