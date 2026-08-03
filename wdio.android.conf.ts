import path from "node:path";
import { config } from "./wdio.conf";

config.specs = ["./e2e/specs/android/**/*.ts"];

config.capabilities = [
  {
    "appium:deviceName": "Small_Tablet_Debug",
    platformName: "Android",
    "appium:automationName": "UiAutomator2",
    "appium:appPackage": "com.anonymous.cannedimp",
    "appium:appActivity": ".MainActivity",
    "appium:platformVersion": "35",
    "appium:avd": "zSmall_Tablet",
    // "appium:noReset": false,
    "appium:fullReset": true,
    "appium:autoGrantPermissions": true,
    // "appium:app": path.join(__dirname, "android/app/build/outputs/apk/release/app-release.apk"),
    // RUN npx expo start for debug apk
    "appium:app": path.join(__dirname, "android/app/build/outputs/apk/debug/app-debug.apk"),
    "appium:avdReadyTimeout": 180000,
    "appium:avdLaunchTimeout": 180000,
  },
  // {
  //   "appium:deviceName": "Real_Device_Debug",
  //   platformName: "Android",
  //   "appium:automationName": "UiAutomator2",
  //   "appium:appPackage": "com.anonymous.cannedimp",
  //   "appium:appActivity": ".MainActivity",
  //   "appium:udid": "adb-TS6PNJIFWCQ4O7TG-TFivOk._adb-tls-connect._tcp", // from `adb devices`
  //   "appium:platformVersion": "15",
  //   "appium:noReset": true, // don't uninstall existing app
  //   "appium:ignoreHiddenApiPolicyError": true,
  //   // "appium:app": path.join(__dirname, "android/app/build/outputs/apk/release/app-release.apk"),
  //   // "appium:autoGrantPermissions": true,
  // },
];

export { config };
