import * as ExpoLocation from "expo-location";

export const getLocationData = async (): Promise<ExpoLocation.LocationObject> => {
  const location = await ExpoLocation.getCurrentPositionAsync();

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
