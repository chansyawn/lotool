const path = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    path.join(
      path.dirname(require.resolve("@lotool/ui")),
      "**/*.{js,ts,jsx,tsx,mdx}",
    ),
  ],
  presets: [require("@lotool/theme/tailwind.config.js")],
};
