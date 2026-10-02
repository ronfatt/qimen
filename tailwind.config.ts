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
        // 大胆东方色系：朱砂红、松石翡翠、琉璃金、徽墨黑、宣纸白
        cinnabar: {
          50: "#FFF5F5",
          100: "#FFE3E3",
          200: "#FFC9C9",
          400: "#F03E3E",
          500: "#E03131", // 鲜亮朱砂
          600: "#C92A2A", // 经典丹砂红 (主色)
          700: "#A61E1E",
          800: "#801515",
          900: "#5A0D0D",
        },
        jade: {
          50: "#EBF9F5",
          100: "#C9EFE4",
          500: "#12B886",
          600: "#0CA678",
          700: "#099268",
          800: "#0C5A43", // 松石翠墨
          900: "#083B2C",
        },
        amberGold: {
          300: "#FFE066",
          400: "#F59F00",
          500: "#E67700",
          600: "#D97706",
          700: "#B45309",
          800: "#92400E",
        },
        ink: {
          950: "#0A0B0A", // 纯墨
          900: "#131513", // 浓墨
          800: "#1E221E", // 焦墨
          700: "#323832", // 重墨
          500: "#636E63", // 宿墨
          400: "#8E998E",
          200: "#D5DCD5",
          100: "#E9EEE9",
          50: "#F5F7F5",
        },
        paper: {
          50: "#FAF8F2", // 澄心堂宣纸白
          100: "#F4F0E4", // 仿古绢帛色
          200: "#ECE5D5", // 象牙古纸
          300: "#DFD6C1",
          border: "#E5DEC9", // 宣纸细边框
        },
      },
      fontFamily: {
        serif: [
          "Songti SC",
          "Noto Serif SC",
          "STSong",
          "SimSun",
          "Baskerville",
          "serif",
        ],
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "sans-serif",
        ],
        kaiti: [
          "Kaiti SC",
          "STKaiti",
          "KaiTi",
          "楷体",
          "serif",
        ],
      },
      borderRadius: {
        "2.5xl": "20px",
        "3xl": "26px",
        "4xl": "32px",
      },
      boxShadow: {
        seal: "0 4px 12px rgba(201, 42, 42, 0.25)",
        orientalCard: "0 10px 30px -5px rgba(19, 21, 19, 0.08)",
        luopan: "0 20px 50px -10px rgba(19, 21, 19, 0.15), 0 0 0 1px rgba(229, 222, 201, 0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
