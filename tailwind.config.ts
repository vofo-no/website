import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme: (arg0: string) => any) => ({
        gray: {
          css: {
            "--tw-prose-links": theme("colors.blue.700"),
            "--tw-prose-links-hover": theme("colors.primary"),
          },
        },
        invert: {
          css: {
            "--tw-prose-links": theme("colors.blue.200"),
            "--tw-prose-links-hover": theme("colors.primary"),
          },
        },
        DEFAULT: {
          css: {
            a: {
              "&:hover": {
                color: "var(--tw-prose-links-hover)",
              },
            },
            h2: {
              fontWeight: "700",
              marginBottom: theme("spacing.3"),
              marginTop: theme("spacing.10"),
              lineHeight: 1.25,
            },
            h3: {
              fontWeight: "700",
              marginBottom: theme("spacing.2"),
              marginTop: theme("spacing.6"),
              lineHeight: 1.25,
            },
            blockquote: {
              borderLeftWidth: "2px",
              borderLeftColor: theme("colors.border"),
              fontWeight: "500",
              fontStyle: "normal",
              marginBottom: theme("spacing.2"),
              marginTop: theme("spacing.6"),
              paddingLeft: theme("spacing.4"),
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
