const { resolve } = require("node:path");

const project = resolve(process.cwd(), "tsconfig.json");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("eslint-config-turbo"),
  ],
  parserOptions: { project },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: false }],
  },
  settings: { "import/resolver": { typescript: { project } } },
  ignorePatterns: ["/*", "!/src"],
  overrides: [
    {
      files: [
        "next.config.js",
        "prettier.config.js",
        "src/app/**/page.tsx",
        "src/app/**/layout.tsx",
        "src/app/**/not-found.tsx",
        "src/app/**/*error.tsx",
        "src/app/apple-icon.tsx",
        "src/app/**/opengraph-image.tsx",
        "src/app/sitemap.ts",
        "src/app/robots.ts",
      ],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
