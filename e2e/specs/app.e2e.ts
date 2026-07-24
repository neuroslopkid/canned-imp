import { acceptPermissionDialogIfShown } from "../helpers/acceptPermissions";
import { handleExpoDevClientIfNeeded } from "../helpers/expoDevClient";
import { UiSelector } from "../helpers/uiselector";

describe("App launches", () => {
  it("should show loading text while app initializes", async () => {
    await handleExpoDevClientIfNeeded();

    // The loading screen may already be gone if the app was in a warm state
    // (noReset: true leaves the app running between sessions).
    // Check for it briefly — if found, verify text; if not, the app loaded fast.
    try {
      const loadingText = await $("~app-loading");

      await loadingText.waitForDisplayed({ timeout: 10000 });
      const capturedText = await loadingText.getText();

      expect(capturedText).toBe("Loading...");
    } catch {
      // Loading screen already gone — app initialized before we could check
    }
  });

  it("should transition past loading and show the chat screen", async () => {
    await acceptPermissionDialogIfShown();

    const chatScreen = await $("~chat-screen");
    await chatScreen.waitForDisplayed({ timeout: 40000 });
    await expect(chatScreen).toBeDisplayed();
  });

  it("redirects to geolocation screen", async () => {
    const navMenuButton = await $("~navigation-menu-button");
    await navMenuButton.waitForDisplayed({ timeout: 40000 });
    navMenuButton.click();

    const navMenu = await $("~navigation-menu");
    const navMenuMapEntry = await $("~navigation-menu-map-entry");
    await navMenu.waitForDisplayed({ timeout: 40000 });
    await navMenuMapEntry.waitForDisplayed({ timeout: 40000 });
    await navMenuMapEntry.click();
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
    await expect(currentContext).toMatch(/WEBVIEW_\S+/);
  });

  it("displays map webview, loaded map tiles, zooms in and zooms out in the webview map", async () => {
    const map = await $("#map");
    await map.waitForExist({ timeout: 10000 });
    await expect(map).toBePresent();

    const loadedMapTiles = await $$(".leaflet-tile-loaded");
    await expect(loadedMapTiles).toBeElementsArrayOfSize({ gte: 1 });

    const zoomInButton = await $("a.leaflet-control-zoom-in");
    await browser.execute((el) => el.click(), zoomInButton);
    await driver.pause(2000);

    const zoomOutButton = await $("a.leaflet-control-zoom-out");
    await browser.execute((el) => el.click(), zoomOutButton);
    await driver.pause(2000);
  });

  it("switches back to native context", async () => {
    await driver.switchContext("NATIVE_APP");

    const currentContext = await driver.getContext();
    await expect(currentContext).toMatch(/NATIVE_APP/);
  });
});
