module.exports = {
  extends: ["@it-incubator/eslint-config", "plugin:storybook/recommended"],
  rules: {
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }]
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "project": "./tsconfig.json"
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  }
};