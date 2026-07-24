export async function acceptPermissionDialogIfShown() {
  try {
    const allowButton = await $('android=new UiSelector().text("While using the app")');
    await allowButton.waitForDisplayed({ timeout: 5000 });
    await allowButton.click();
  } catch {
    // No dialog — proceed
  }
}
