import * as Notifications from "expo-notifications";

export async function checkNotificationPermission(): Promise<Notifications.PermissionResponse> {
  let permission;
  const existingPermission = await Notifications.getPermissionsAsync();

  if (existingPermission.status === Notifications.PermissionStatus.UNDETERMINED) {
    const requestedPermission = await Notifications.requestPermissionsAsync();

    permission = requestedPermission;
  } else {
    permission = existingPermission;
  }

  return permission;
}
