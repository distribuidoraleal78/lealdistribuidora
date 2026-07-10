import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e1f5ee",
          100: "#9fe1cb",
          200: "#5dcaa5",
          300: "#2dd4bf",
          400: "#14b8a6",
          500: "#0d9488",
          600: "#0f766e",
          700: "#085041",
          800: "#04342c",
          900: "#0a0d0e",
        },
        ink: {
          DEFAULT: "#0a0d0e",
          soft: "#12181a",
          border: "#1c2426",
          muted: "#7f9995",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
