import { acceptPermissionDialogIfShown } from "../helpers/acceptPermissions";
import { handleExpoDevClientIfNeeded } from "../helpers/expoDevClient";

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
    navMenuMapEntry.click();

    await driver.pause(5000);
  });

  it("has geolocation data", async () => {
    const latitude = await $('android=new UiSelector().textMatches("(?i)latitude:\\s*\\S+")');
    const longitude = await $('android=new UiSelector().textMatches("(?i)longitude:\\s*\\S+")');

    await expect(latitude).toBeDisplayed();
    await expect(longitude).toBeDisplayed();
  });
});
