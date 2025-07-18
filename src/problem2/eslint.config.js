import js from "@eslint/js"
import perfectionist from "eslint-plugin-perfectionist"
import eslintPluginPrettier from "eslint-plugin-prettier"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      perfectionist.configs["recommended-alphabetical"],
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: eslintPluginPrettier,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "prefer-const": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "off",
      "prefer-const": "warn",
      "prettier/prettier": "warn",
      "perfectionist/sort-imports": "warn",
      "perfectionist/sort-exports": "warn",
      "perfectionist/sort-objects": "warn",
      "perfectionist/sort-jsx-props": "warn",
      "perfectionist/sort-union-types": "warn",
      "perfectionist/sort-object-types": "warn",
      "perfectionist/sort-named-imports": "warn",
      "perfectionist/sort-intersection-types": "warn",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }]
    },
  },
)
