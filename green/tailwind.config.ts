import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      boxShadow: {
        soft: "0 18px 55px rgba(15, 23, 42, 0.05)",
        card: "0px 2px 12px rgba(15, 23, 42, 0.04), 0px 4px 24px rgba(15, 23, 42, 0.03)",
        "card-hover": "0px 12px 32px rgba(15, 23, 42, 0.08), 0px 4px 16px rgba(15, 23, 42, 0.04)"
      }
    }
  },
  plugins: []
};

export default config;
