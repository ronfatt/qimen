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
        // 国际高定时装感与冷峻墨石色
        editorial: {
          950: "#090F0C", // 深曜石纯墨
          900: "#111814", // 深冷曜石黑
          850: "#16201B",
          800: "#1D2B24", // 核心墨绿
          700: "#2A3D33",
          600: "#3D5447",
          500: "#587262",
          400: "#7E9988",
          300: "#A9BEB1",
          200: "#D3DFD8",
          100: "#EAF0EC",
          50: "#F5F8F6",
        },
        // 高级艺术香槟与原胚金
        gold: {
          900: "#5E4622",
          800: "#80602F",
          700: "#9C763A",
          600: "#B88E4B",
          500: "#CCA35E", // 主金
          400: "#D8B777",
          300: "#E5CD99",
          200: "#F1E4C2",
          100: "#F9F4E5",
          50: "#FCFAF4",
        },
        // 策展画廊画布基调
        canvas: {
          900: "#242320",
          800: "#363430",
          700: "#54524D",
          600: "#787670",
          500: "#9E9C94",
          400: "#C4C2B8",
          300: "#DDDBCF",
          200: "#EAE7DC", // 极细边线
          100: "#F4F1E6", // 柔和底板
          50: "#FAF7EE",  // 天然亚麻暖白主画布
          pure: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: [
          "Baskerville",
          "Playfair Display",
          "Songti SC",
          "Noto Serif SC",
          "STSong",
          "Georgia",
          "serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Helvetica Neue",
          "Inter",
          "PingFang SC",
          "Hiragino Sans GB",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "ui-monospace",
          "Menlo",
          "Monaco",
          "Courier New",
          "monospace",
        ],
      },
      letterSpacing: {
        widest: ".25em",
        extrawide: ".35em",
      },
      boxShadow: {
        gallery: "0 8px 30px rgba(18, 28, 23, 0.05)",
        haute: "0 20px 48px -12px rgba(18, 28, 23, 0.09)",
        spotlight: "0 0 50px -10px rgba(184, 142, 75, 0.15)",
        insetHairline: "inset 0 0 0 1px rgba(18, 28, 23, 0.06)",
      },
    },
  },
  plugins: [],
};
export default config;
