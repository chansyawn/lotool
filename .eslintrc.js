module.exports = {
  extends: ["plugin:@typescript-eslint/recommended", "next/core-web-vitals", "prettier"],
  ignorePatterns: ["/*", "!/src"],
  rules: {
    "no-console": "warn",
    "react/self-closing-comp": "warn",
    "import/order": "warn",
    "import/no-anonymous-default-export": "off",
  },
};
