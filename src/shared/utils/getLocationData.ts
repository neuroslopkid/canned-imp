import * as ExpoLocation from "expo-location";

/**
  getCurrentPositionAsync() on Android uses the fused location provider (Google Play Services). Without an explicit accuracy, expo-location defaults to LocationAccuracy.Balanced (~100m precision), which prefers network triangulation (WiFi/cell towers) over GPS. On an emulator without real WiFi/cell hardware, the network provider returns "location unavailable" because there's nothing to triangulate.

  LocationAccuracy.High forces GPS (fine location), which an emulator can satisfy because Android feeds it mock GPS coordinates from the extended controls — the same coordinates Google Maps reads. That's why Maps works (it defaults to GPS) but your app doesn't (it defaults to network).

  This is also why adding ACCESS_FINE_LOCATION to app.json is important — High accuracy requires it, and if the plugin fails to merge it for any reason, getCurrentPositionAsync({ accuracy: High }) will be denied before it even tries.  
 */
export const getLocationData = async (): Promise<ExpoLocation.LocationObject> => {
  // It's realy important to add accuracy here or it won't work on AVD, at least
  const location = await ExpoLocation.getCurrentPositionAsync({ accuracy: ExpoLocation.Accuracy.High });

  return location;
};

export const getGeoData = async (
  location: ExpoLocation.LocationObject,
): Promise<ExpoLocation.LocationGeocodedAddress> => {
  const [address] = await ExpoLocation.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  return address;
};

export type GeoLocationResult = {
  location: ExpoLocation.LocationObject;
  address: ExpoLocation.LocationGeocodedAddress;
};

export const getGeoLocationData = async (): Promise<GeoLocationResult> => {
  const location = await getLocationData();
  const address = await getGeoData(location);

  return {
    location,
    address,
  };
};
