/* eslint-disable no-console */
/* eslint-disable no-undef */
const { withMainApplication } = require("expo/config-plugins");

module.exports = function withWebViewDebugging(config) {
  return withMainApplication(config, (config) => {
    const content = config.modResults.contents;

    if (content.includes("setWebContentsDebuggingEnabled")) {
      return config;
    }

    const lastImportMatch = content.match(/^import\s+[^\n]+$/gm);
    if (!lastImportMatch || lastImportMatch.length === 0) {
      console.warn("[with-webview-debugging] Could not find imports in MainApplication.kt – skipping plugin");

      return config;
    }

    const lastImportLine = lastImportMatch[lastImportMatch.length - 1];
    const insertionPoint = content.indexOf(lastImportLine) + lastImportLine.length;
    const updatedContent =
      content.slice(0, insertionPoint) + "\nimport android.webkit.WebView" + content.slice(insertionPoint);

    const superOnCreateIndex = updatedContent.indexOf("super.onCreate()");
    if (superOnCreateIndex === -1) {
      console.warn("[with-webview-debugging] Could not find super.onCreate() in MainApplication.kt – skipping plugin");

      return config;
    }

    const injectAt = superOnCreateIndex + "super.onCreate()".length;
    config.modResults.contents =
      updatedContent.slice(0, injectAt) +
      "\n    if (!BuildConfig.DEBUG) {\n      WebView.setWebContentsDebuggingEnabled(true)\n    }" +
      updatedContent.slice(injectAt);

    return config;
  });
};
