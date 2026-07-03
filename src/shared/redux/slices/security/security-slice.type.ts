import { LocationGeocodedAddress, LocationObject } from "expo-location";

export type SecurityState = {
  location: LocationObject | undefined;
  address: LocationGeocodedAddress | undefined;
};
