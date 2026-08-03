import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import wdio from "eslint-plugin-wdio";

const wdioRecommended = /** @type {any} */ (wdio.configs["flat/recommended"]);

export default defineConfig([
  {
    ignores: [".agents/**", ".claude/**", "**/*.test.ts", "metro.config.js"],
  },
  {
    files: ["**/*.{js,ts,jsx,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "warn",
      "padding-line-between-statements": ["warn", { blankLine: "always", prev: "*", next: "return" }],
      curly: ["error", "all"],
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  {
  files: ["wdio*.conf.ts", "e2e/**/*.ts"],
  ...wdioRecommended,
},
]);
