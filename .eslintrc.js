module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "next/core-web-vitals", "prettier"],
  ignorePatterns: ["/*", "!/src", "/src/components/ui"],
  rules: {
    "no-console": "warn",
    "react/self-closing-comp": "warn",
    "react/function-component-definition": [
      "warn",
      { namedComponents: "arrow-function", unnamedComponents: "arrow-function" },
    ],
    "import/order": "warn",
    "import/no-anonymous-default-export": "off",
  },
};
