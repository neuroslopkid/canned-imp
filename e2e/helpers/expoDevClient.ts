/**
 * A hack to use expo dev client debug apk but skip the annoying blocking screens of the expo server
 * Though you have to manually start metro server with `npm expo start` before any tests
 */
export async function handleExpoDevClientIfNeeded() {
  try {
    // 1. Tap the Metro URL to connect
    const url = await $('android=new UiSelector().textMatches("(?i)http://.*")');
    await url.waitForDisplayed({ timeout: 5000 });
    await url.click();
    await driver.pause(10000);

    // 2. Tap "Continue" on the first modal
    const continueBtn = await $('android=new UiSelector().text("Continue")');
    await continueBtn.waitForDisplayed({ timeout: 5000 });
    await continueBtn.click();
    await driver.pause(3000);

    // 3. Find and tap "X" or "Close" on the second modal
    // Try accessibility close button first, then fallback to "X" text
    const closeBtn = await $("~Close");
    if (await closeBtn.isDisplayed().catch(() => false)) {
      await closeBtn.click();
    } else {
      // X is often rendered as an ImageButton or TextView with "×"
      await $('android=new UiSelector().descriptionContains("close")')
        .click()
        .catch(() => {});
    }
    await driver.pause(1000);
  } catch {
    // No dev-client screen — release build or already connected
  }
}
