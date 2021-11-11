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
    ignorePatterns: [".eslintrc.js","tailwind.config.js","next.config.js"],
    plugins: ['react', '@typescript-eslint'],
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'react/jsx-props-no-spreading': 'off',
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "no-console": 0,
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
        "@typescript-eslint/no-empty-function": 0,
        "import/extensions": 0,
        'import/prefer-default-export': 0,
        'react/require-default-props': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/click-events-have-key-events': 0
    },
};
