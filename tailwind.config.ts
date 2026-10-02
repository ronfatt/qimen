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
        // 关键潮流荧光青柠绿 (Acid Lime)
        lime: {
          300: "#E6FC6A",
          400: "#DBFA42",
          500: "#D4F53C", // 核心品牌主色
          600: "#BFE024",
          700: "#A5C515",
        },
        // 曜石深黑与冷炭灰
        brand: {
          black: "#111211",
          dark: "#181A18",
          darkCard: "#1D1F1D",
          charcoal: "#2A2D2A",
          muted: "#767973",
          lightMuted: "#A3A79E",
          border: "#E2E1DA",
          cream: "#F3F2EC", // 主背景天然米白
          surface: "#EAE9E1",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "PingFang SC",
          "Hiragino Sans GB",
          "Inter",
          "Helvetica Neue",
          "sans-serif",
        ],
        serif: [
          "Songti SC",
          "Noto Serif SC",
          "SimSun",
          "Baskerville",
          "serif",
        ],
        mono: [
          "SF Mono",
          "ui-monospace",
          "Menlo",
          "Monaco",
          "monospace",
        ],
      },
      borderRadius: {
        "2.5xl": "20px",
        "3xl": "26px",
        "4xl": "32px",
      },
      boxShadow: {
        tile: "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)",
        card: "0 4px 20px -2px rgba(18, 19, 18, 0.04)",
        pill: "0 2px 10px rgba(212, 245, 60, 0.35)",
        darkCard: "0 16px 36px -8px rgba(0, 0, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
export default config;
