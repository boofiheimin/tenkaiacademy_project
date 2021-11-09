module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        project: 'tsconfig.json',
        sourceType: 'module',
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: [".eslintrc.js"],
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/jsx-props-no-spreading': 'off',
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
