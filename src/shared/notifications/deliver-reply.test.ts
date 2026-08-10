let currentAppState: string | null = "background";

jest.mock("expo-notifications", () => ({
  PermissionStatus: { GRANTED: "granted", DENIED: "denied", UNDETERMINED: "undetermined" },
  scheduleNotificationAsync: jest.fn(),
}));

jest.mock("@utils", () => ({
  checkNotificationPermission: jest.fn(),
}));

import { AppState } from "react-native";
import { PermissionStatus, scheduleNotificationAsync } from "expo-notifications";
import { checkNotificationPermission } from "@utils";
import { deliverReplyAsNotification } from "./deliver-reply";

const mockSchedule = scheduleNotificationAsync as jest.Mock;
const mockCheckPermission = checkNotificationPermission as jest.Mock;

describe("deliverReplyAsNotification", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    currentAppState = "background";
    mockCheckPermission.mockResolvedValue({ status: PermissionStatus.GRANTED });
    Object.defineProperty(AppState, "currentState", {
      configurable: true,
      get: () => currentAppState,
    });
  });

  it("schedules a notification with the reply in background", async () => {
    await deliverReplyAsNotification("Hello from the shade");

    expect(mockSchedule).toHaveBeenCalledWith(
      expect.objectContaining({
        content: expect.objectContaining({
          title: expect.stringMatching(/^\d{1,2}:\d{2}$/),
          body: "Hello from the shade",
          categoryIdentifier: "aichat",
        }),
        trigger: null,
      }),
    );
  });

  it("schedules a notification while inactive", async () => {
    currentAppState = "inactive";

    await deliverReplyAsNotification("Hello from the shade");

    expect(mockSchedule).toHaveBeenCalledTimes(1);
  });

  it("does not schedule when the app is active", async () => {
    currentAppState = "active";

    await deliverReplyAsNotification("Hello from the shade");

    expect(mockSchedule).not.toHaveBeenCalled();
  });

  it("does not schedule when the app state is unknown", async () => {
    currentAppState = null;

    await deliverReplyAsNotification("Hello from the shade");

    expect(mockSchedule).not.toHaveBeenCalled();
  });

  it("does not schedule for an empty reply", async () => {
    await deliverReplyAsNotification("");

    expect(mockSchedule).not.toHaveBeenCalled();
  });

  it("does not schedule when permission is denied", async () => {
    mockCheckPermission.mockResolvedValue({ status: PermissionStatus.DENIED });

    await deliverReplyAsNotification("Hello from the shade");

    expect(mockSchedule).not.toHaveBeenCalled();
  });
});
