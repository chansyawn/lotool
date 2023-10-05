/** @type {import('tailwindcss/colors')} */
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.neutral.300"),
        ...theme("colors"),
      }),
      transitionDuration: {
        DEFAULT: "200ms",
      },
      fontFamily: {
        sans: ["var(--font-roboto-flex)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        primary: { DEFAULT: colors.amber[400], ...colors.amber },
        neutral: { DEFAULT: colors.neutral[400], ...colors.neutral },
        background: { DEFAULT: colors.white },
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    ringColor: ({ theme }) => ({
      DEFAULT: theme("colors.primary.200"),
      ...theme("colors"),
    }),
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
