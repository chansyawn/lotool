const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand, "jest --bail --findRelatedTests", "prettier --write"],
  "!*.{js,jsx,ts,tsx}": "prettier --ignore-unknown --write",
};
