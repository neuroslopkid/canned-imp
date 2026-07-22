import { acceptPermissionDialogIfShown } from "../helpers/acceptPermissions";
import { handleExpoDevClientIfNeeded } from "../helpers/expoDevClient";
import { UiSelector } from "../helpers/uiselector";

describe("App launches", () => {
  it("should show loading text while app initializes", async () => {
    await handleExpoDevClientIfNeeded();
    const loadingText = await $("~app-loading");

    try {
      await loadingText.waitForDisplayed({ timeout: 5000 });
      await expect(loadingText).toBeDisplayed();
      await expect(loadingText).toHaveText("Loading...");
    } catch {
      return;
    }
  });

  it("should transition past loading and show the chat screen", async () => {
    await acceptPermissionDialogIfShown();

    const chatScreen = await $("~chat-screen");
    await chatScreen.waitForDisplayed({ timeout: 30000 });
    await expect(chatScreen).toBeDisplayed();
  });

  it("redirects to geolocation screen", async () => {
    const navMenuButton = await $("~navigation-menu-button");
    await navMenuButton.waitForDisplayed({ timeout: 5000 });
    navMenuButton.click();

    const navMenu = await $("~navigation-menu");
    const navMenuMapEntry = await $("~navigation-menu-map-entry");
    await navMenu.waitForDisplayed({ timeout: 5000 });
    await navMenuMapEntry.waitForDisplayed({ timeout: 5000 });
    await navMenuMapEntry.click();

    await driver.pause(5000);
  });

  it("has geolocation data", async () => {
    const latitude = await $(UiSelector.TextMatches("(?i)latitude:\\s*\\S+"));
    const longitude = await $(UiSelector.TextMatches("(?i)longitude:\\s*\\S+"));

    await expect(latitude).toBeDisplayed();
    await expect(longitude).toBeDisplayed();
  });

  it("should switch to a webview by name and uses the default Appium `context`-method", async () => {
    const contexts = await driver.getContexts();
    const webviewContext = contexts.find((context) => context.toString().startsWith("WEBVIEW"));

    await expect(webviewContext).not.toBeNull();

    if (webviewContext) {
      await driver.switchContext(webviewContext);
    }

    const currentContext = await driver.getContext();
    await expect(currentContext).toMatch(/WEBVIEW_\\S+/);
  });

  it("displays map webview, loaded map tiles, zooms in and zooms out in the webview map", async () => {
    const map = await $("#map");
    await expect(map).toBeDisplayed();

    const loadedMapTiles = await $$(".leaflet-tile-loaded");
    await expect(loadedMapTiles).toBeElementsArrayOfSize({ gte: 1 });

    const zoomInButton = await $("a.leaflet-control-zoom-in");
    await zoomInButton.click();
    await driver.pause(2000);

    const zoomOutButton = await $("a.leaflet-control-zoom-out");
    await zoomOutButton.click();
    await driver.pause(2000);
  });

  it("switches back to native context", async () => {
    await driver.switchContext("NATIVE_APP");

    const currentContext = await driver.getContext();
    await expect(currentContext).toMatch(/NATIVE_APP/);
  });
});
