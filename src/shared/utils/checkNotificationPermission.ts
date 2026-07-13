import * as Notifications from "expo-notifications";

export async function checkNotificationPermission(): Promise<boolean> {
  const existingPermission = await Notifications.getPermissionsAsync();

  if (existingPermission.status === Notifications.PermissionStatus.UNDETERMINED) {
    const requestedPermission = await Notifications.requestPermissionsAsync();

    return requestedPermission.granted;
  }

  return existingPermission.granted;
}
