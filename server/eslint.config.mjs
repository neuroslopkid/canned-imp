import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default defineConfig([
  {
    ignores: ["node_modules/**", "dist/**"]
  },
  {
    files: ["**/*.{js,ts}"],
    extends: [js.configs.recommended, tseslint.configs.recommendedTypeChecked],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
      "padding-line-between-statements": ["warn", { blankLine: "always", prev: "*", next: "return" }],
      curly: ["error", "all"],
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
  prettierConfig,
]);
