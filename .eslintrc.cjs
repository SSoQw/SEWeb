module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "@stylistic"
  ],
  "rules": {
    "@stylistic/indent": ["error", 2],
    "@stylistic/linebreak-style": ["error","windows"],
    "@stylistic/quotes": ["error","double"],
    "@stylistic/semi": ["error","always"],
    "react/react-in-jsx-scope": "off",
    "@stylistic/key-spacing": ["warn", { "afterColon": true }],
  }
};
