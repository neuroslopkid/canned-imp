import { UiSelector } from "./uiselector";

/**
 * A hack to use expo dev client debug apk but skip the annoying blocking screens of the expo server
 * Though you have to manually start metro server with `npm expo start` before any tests
 */
export async function handleExpoDevClientIfNeeded() {
  try {
    // 1. Tap the Metro URL to connect
    const url = await $(UiSelector.TextMatches("(?i)http://.*"));
    await url.waitForDisplayed({ timeout: 60000 });
    await url.click();

    // 2. Tap "Continue" on the first modal
    const continueBtn = await $(UiSelector.Text("Continue"));
    await continueBtn.waitForDisplayed({ timeout: 60000 });
    await continueBtn.click();

    // 3. Find and tap "X" or "Close" on the second modal
    // Try accessibility close button first, then fallback to "X" text
    const closeBtn = await $("~Close");
    if (await closeBtn.isDisplayed().catch(() => false)) {
      await closeBtn.click();
    } else {
      // X is often rendered as an ImageButton or TextView with "×"
      await $(UiSelector.DescriptionContains("close"))
        .click()
        .catch(() => {});
    }
  } catch {
    // No dev-client screen — release build or already connected
  }
}
