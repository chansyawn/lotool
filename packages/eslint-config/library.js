const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("eslint-config-turbo"),
  ],
  parserOptions: { project },
  settings: { "import/resolver": { typescript: { project } } },
  ignorePatterns: ["/*", "!/src"],
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: [require.resolve("@vercel/style-guide/eslint/vitest")],
      rules: { "import/no-extraneous-dependencies": "off" },
    },
  ],
};
