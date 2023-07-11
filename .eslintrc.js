module.exports = {
  env: {
    browser: true,
    es2020: true,
    jest: true,
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:cypress/recommended",
    "plugin:security/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:sonarjs/recommended",
    "next",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: ["react", "sonarjs", "prettier", "cypress", "security", "jsx-a11y"],
  rules: {},
  settings: {
    react: {
      version: "detect",
    },
  },
};
