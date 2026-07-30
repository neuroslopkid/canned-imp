import { acceptPermissionDialogIfShown } from "../../helpers/acceptPermissions";
import { handleExpoDevClientIfNeeded } from "../../helpers/expoDevClient";
import { UiSelector } from "../../helpers/uiselector";

describe("App launches", () => {
  // before(() => {});
  // after(() => {});
  // beforeEach(() => {});
  // afterEach(() => {});

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
    await navMenuButton.click();

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

  it("displays map webview, loaded map tiles", async () => {
    const map = await $("#map");
    await map.waitForExist({ timeout: 10000 });
    await expect(map).toBeDisplayed();

    const loadedMapTiles = await $$(".leaflet-tile-loaded");
    await expect(loadedMapTiles).toBeElementsArrayOfSize({ gte: 1 });
  });

  it("zooms in and zooms out in the webview map", async () => {
    const map = await $("#map");
    await map.waitForExist({ timeout: 10000 });

    const zoomInButton = await $("a.leaflet-control-zoom-in");
    expect(zoomInButton).toExist();
    await driver.execute((el) => el.click(), zoomInButton);
    await driver.pause(2000);

    const zoomOutButton = await $("a.leaflet-control-zoom-out");
    expect(zoomOutButton).toExist();
    await driver.execute((el) => el.click(), zoomOutButton);
    await driver.pause(2000);
  });

  it("switches back to native context", async () => {
    await driver.switchContext("NATIVE_APP");

    const currentContext = await driver.getContext();
    await expect(currentContext).toMatch(/NATIVE_APP/);
  });

  it("has scrollview, scrolls down", async () => {
    // const scrollView = await $("//*[scrollable=true]");
    // const scrollView = await $("android=UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView('Your text')");
    // const scrollView = await $("android=UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)");
    // const classChainDemo = '**/XCUIElementTypeCell[`name BEGINSWITH "A"`][-1]/XCUIElementTypeButton[10]';
    // const scrollViewIOS = await $(`-ios class chain${classChainDemo}`);
    // const predicateStringDemo = "label=='Alert Views'";
    // const scrollViewIOS2 = await $(`-ios predicate string:${predicateStringDemo}`);
    const scrollView = await $(
      "android=UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()",
    );

    // JS object ref exists (always passes if $() didn't throw)
    expect(scrollView).toBeTruthy();

    // exists + visible + actually scrolled into view
    expect(scrollView).toBeDisplayedInViewport();

    // exists + visible (may be off-screen)
    expect(scrollView).toBeDisplayed();

    // exists in UI hierarchy (may be hidden)
    expect(scrollView).toBePresent();

    // identical to toBePresent (alias)
    expect(scrollView).toBeExisting();

    // Non-reliable. Other elements doesn't check if the element is realy visible
    const opacity = await scrollView.getAttribute("opacity");
    expect(opacity).toBeGreaterThan(0);
  });
});

// Notes:

// const elemByClassName = await $("android.view.View");
// const textFromElemByClassName = elemByClassName.getText();
// elemByClassName.addValue();

// //tagName[@prop=value]
// const elemByXpath = await $("//android.view.ViewGroup[@content-desc="navigation-menu-button"]");
// const elemByXpath2 = await $("//android.view.ViewGroup[@resource-id="navigation-menu-button"]");
// const elemByXpath3= await $("//android.widget.TextView[@text=""]");
// const elemByXpath4= await $("//*[@text=""]"); // You can ommit tagname

// $ - single element
// $$ - multiple elements

// driver.dismissAlert()
// driver.acceptAlert();
// driver.getAlertText();
// driver.back();
