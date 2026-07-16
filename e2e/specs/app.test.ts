describe("App launch", () => {
  it("should show loading text while app initializes", async () => {
    const loadingText = await $("~app-loading");
    await loadingText.waitForDisplayed({ timeout: 20000 });

    await expect(loadingText).toBeDisplayed();
    await expect(loadingText).toHaveText("Loading...");
  });

  it("should transition past loading and show the next screen", async () => {
    const loadingText = await $("~app-loading");
    await loadingText.waitForDisplayed({ timeout: 20000 });

    await driver.waitUntil(
      async () => {
        const displayed = await loadingText.isDisplayed();
        return !displayed;
      },
      {
        timeout: 20000,
        timeoutMsg: "Loading text did not disappear within 20s",
        interval: 500,
      },
    );
  });
});
