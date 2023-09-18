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
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
