module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
    sourceType: "module",
    ecmaVersion: 2020,
    parser: "babel-eslint",
  },
  plugins: ["@typescript-eslint", "vue"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "prettier/@typescript-eslint", // Disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended", // Make sure this is always the last configuration in the extends array.
  ],
  ignorePatterns: [
    "node_modules",
    "*.d.ts",
    "generated",
    "static/*",
    "dist",
    "build",
    "nuxt",
  ],
  rules: {
    "prettier/prettier": "error",
    "space-before-function-paren": 0,
    quotes: [
      "error",
      "double",
      { avoidEscape: true, allowTemplateLiterals: false },
    ],
  },
};
