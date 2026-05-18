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
        cream: "#FAF9F6",
        "light-gray": "#F5F5F0",
        dark: "#1A1A1A",
        "warm-gray": "#666666",
        gold: "#C9A96E",
        stone: "#E8E6E1",
        ink: "#0A0A0A",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        heading: [
          "var(--font-heading)",
          "Cormorant Garamond",
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        "widest-plus": "0.3em",
      },
      animation: {
        "spin-slow": "spin 12s linear infinite",
        "marquee": "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
