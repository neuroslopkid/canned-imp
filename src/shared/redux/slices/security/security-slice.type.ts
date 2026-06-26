import { LocationGeocodedAddress, LocationObject, LocationPermissionResponse } from "expo-location";

export type SecurityState = {
  location: LocationObject | undefined;
  address: LocationGeocodedAddress | undefined;
};
