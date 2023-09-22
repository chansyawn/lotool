const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-roboto-flex)"],
        mono: ["var(--font-roboto-mono)"],
      },
      colors: {
        primary: { DEFAULT: colors.orange[400], ...colors.orange },
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
    ringColor: {
      DEFAULT: colors.orange[200],
    },
  },
  plugins: [require("@headlessui/tailwindcss")({ prefix: "ui" })],
};
