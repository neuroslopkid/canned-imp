import * as ExpoLocation from "expo-location";

export async function checkLocationPermission(): Promise<ExpoLocation.LocationPermissionResponse> {
  let permission;
  const existingPermission = await ExpoLocation.getForegroundPermissionsAsync();

  if (existingPermission.status === ExpoLocation.PermissionStatus.UNDETERMINED) {
    const requestedPermission = await ExpoLocation.requestForegroundPermissionsAsync();

    permission = requestedPermission;
  } else {
    permission = existingPermission;
  }

  return permission;
}
