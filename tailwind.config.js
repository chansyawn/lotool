/** @type {import('tailwindcss/colors')} */
const tailwindColors = require("tailwindcss/colors");

const colors = {
  primary: { DEFAULT: tailwindColors.amber[400], ...tailwindColors.amber },
  neutral: { DEFAULT: tailwindColors.neutral[400], ...tailwindColors.neutral },
  background: { DEFAULT: tailwindColors.white },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: colors.neutral[300],
      },
      transitionDuration: {
        DEFAULT: "200ms",
      },
      fontFamily: {
        sans: ["var(--font-roboto-flex)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors,
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    ringColor: {
      DEFAULT: colors.primary[200],
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
