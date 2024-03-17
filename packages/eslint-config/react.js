const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("eslint-config-turbo"),
  ],
  parserOptions: { project },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  settings: { "import/resolver": { typescript: { project } } },
  ignorePatterns: ["/*", "!/src"],
};
