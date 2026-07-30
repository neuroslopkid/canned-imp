import path from "node:path";
import { config } from "./wdio.conf";

config.port = 4725;

config.specs = ["./e2e/specs/ios/**/*.ts"];

config.capabilities = [
  {
    platformName: "ios",
    "appium:platformVersion": "15.0", // IOS 15
    "appium:automationName": "XCUITest",
    "appium:deviceName": "iPhone 12",
    "appium:app": path.join(__dirname, "./app/iso/UIKitCatalog.app"),
  },
];

export { config };
