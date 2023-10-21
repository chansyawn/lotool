/** @type {import('tailwindcss/colors')} */
const twColors = require("tailwindcss/colors");
const { createPlugin } = require("windy-radix-palette");

const colors = createPlugin();

const StandardAlias = (name) => ({
  base: {
    DEFAULT: colors.alias(name, 1),
    subtle: colors.alias(name, 2),
  },
  bg: {
    DEFAULT: colors.alias(name, 3),
    hover: colors.alias(name, 4),
    active: colors.alias(name, 5),
  },
  line: colors.alias(name, 6),
  border: {
    DEFAULT: colors.alias(name, 7),
    hover: colors.alias(name, 8),
  },
  solid: {
    DEFAULT: colors.alias(name, 9),
    hover: colors.alias(name, 10),
  },
  text: {
    DEFAULT: colors.alias(name, 11),
    contrast: colors.alias(name, 12),
  },
});

/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    respectDefaultRingColorOpacity: true,
  },
  darkMode: ["class", '[data-color-mode="dark"]'],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      inherit: twColors.inherit,
      current: twColors.current,
      transparent: twColors.transparent,
      white: twColors.white,
      black: twColors.black,
    },
    extend: {
      colors: {
        primary: StandardAlias("amber"),
        neutral: StandardAlias("gray"),
        background: {
          page: "var(--color-page-background)",
        },
      },
      borderColor: ({ theme }) => ({
        DEFAULT: theme("colors.neutral.border.DEFAULT"),
      }),
      ringColor: ({ theme }) => ({
        DEFAULT: theme("colors.primary.bg.DEFAULT"),
      }),
      transitionDuration: {
        DEFAULT: "200ms",
      },
      fontFamily: {
        sans: ["var(--font-roboto-flex)"],
        mono: ["var(--font-roboto-mono)"],
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [colors.plugin, require("tailwindcss-animate")],
};
