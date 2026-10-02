import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ink: {
          900: "#171B19",
          800: "#232825",
          700: "#363D39",
          600: "#4D5650",
          500: "#6B756F",
          400: "#919B95",
          300: "#BEC6C1",
          200: "#E2E6E3",
          100: "#F2F4F3",
        },
        moss: {
          900: "#0F2018",
          800: "#183226", // primary deep ink green
          700: "#234535",
          600: "#2F5B46",
          500: "#3E745A",
          200: "#C6DACF",
          100: "#E3ECE7",
          50: "#F2F6F4",
        },
        champagne: {
          700: "#8C6E43",
          600: "#AA8857",
          500: "#C3A675", // accent gold
          400: "#D6BF97",
          300: "#E5D6BD",
          100: "#F7F3EB",
          50: "#FCFAF6",
        },
        warm: {
          50: "#FCFAF7",
          100: "#F8F6F1",
          200: "#EFECE4",
          300: "#E5E1D6",
        },
      },
      fontFamily: {
        serif: ["Noto Serif SC", "Songti SC", "SimSun", "serif"],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      boxShadow: {
        soft: "0 2px 12px -2px rgba(27, 43, 34, 0.06), 0 1px 3px -1px rgba(27, 43, 34, 0.04)",
        card: "0 4px 20px -2px rgba(27, 43, 34, 0.08)",
        floating: "0 12px 32px -4px rgba(27, 43, 34, 0.12)",
      },
      maxWidth: {
        phone: "430px",
      },
    },
  },
  plugins: [],
};
export default config;
