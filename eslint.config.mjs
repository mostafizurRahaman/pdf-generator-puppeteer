import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    files: ["src/**/*.ts"],
    ignores: ["**/*.config.js", "!**/eslint.config.js"],
    rules: {
      semi: "error",
      "no-unused-vars": "error",
      "no-undef": "error",
      "no-unused-expressions": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  { languageOptions: { globals: globals.node } },

  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
];
