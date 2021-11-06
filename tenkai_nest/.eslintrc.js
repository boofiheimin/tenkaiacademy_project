module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-console": "error",
    "prettier/prettier": [
        "error",
        {
            "endOfLine": "auto"
        }
    ],
    "no-restricted-syntax": 0,
    "no-await-in-loop": 0,
    "no-underscore-dangle": 0,
    "class-methods-use-this": 0,
    "no-constant-condition": ["error", { "checkLoops": false }],
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-empty-function": 0
  },
};
