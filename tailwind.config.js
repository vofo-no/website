const defaultTheme = require("tailwindcss/defaultTheme");

const crimson = {
  50: "#fee2e9",
  100: "#eab5c2",
  200: "#d6899b",
  300: "#c15c74",
  400: "#ad304d",
  500: "#990326",
  600: "#7c031f",
  700: "#5e0218",
  800: "#410210",
  900: "#230109",
};

/** @type {import("tailwindcss").Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        crimson,
      },
      fontFamily: {
        sans: ["var(--font-open-sans)", ...defaultTheme.fontFamily.sans],
        "open-sans": ["var(--font-open-sans)"],
        roboto: "var(--font-roboto)",
      },
      typography: ({ theme }) => ({
        gray: {
          css: {
            "--tw-prose-links": theme("colors.blue.700"),
            "--tw-prose-links-hover": theme("colors.crimson.500"),
            "--tw-prose-headings-h1": theme("colors.crimson.500"),
          },
        },
        invert: {
          css: {
            "--tw-prose-links": theme("colors.blue.200"),
            "--tw-prose-links-hover": theme("colors.yellow.500"),
            "--tw-prose-headings-h1": theme("colors.crimson.200"),
          },
        },
        DEFAULT: {
          css: {
            a: {
              "&:hover": {
                color: "var(--tw-prose-links-hover)",
              },
            },
            h1: {
              color: "var(--tw-prose-headings-h1)",
              fontFamily: "var(--font-roboto)",
              fontWeight: "500",
              marginBottom: theme("spacing.3"),
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            },
            h2: {
              fontFamily: "var(--font-roboto)",
              fontWeight: "500",
              marginBottom: theme("spacing.3"),
              marginTop: theme("spacing.10"),
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
            },
            h3: {
              fontFamily: "var(--font-roboto)",
              fontWeight: "500",
              marginBottom: theme("spacing.2"),
              marginTop: theme("spacing.6"),
              letterSpacing: "-0.01em",
              lineHeight: 1.25,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
