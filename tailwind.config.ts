import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      size: {
        "3.5": "0.875rem",
      },
      fontSize: {
        "12px": "0.75rem",
        "32px": "2rem",
        "56px": "3.5rem",
        "15px": "0.9375rem",
      },
      fontFamily: {
        condensed: ["var(--font-condensed)", "sans-serif"],
        slab: ["var(--font-slab)", "sans-serif"],
        pixel: ["var(--font-pixel)", "sans-serif"],
        regular: ["var(--font-regular)", "sans-serif"],
      },
      colors: {
        bgPrimary: "var(--bg-primary)",
        textPrimary: "var(--text-primary)",
        textSecondary: "var(--text-secondary)",
        textTertiary: "var(--text-tertiary)",
      },
      keyframes: {
        "slide-in-right": {
          "0%": { transform: "translateX(20px)" },
          "33.3%": { transform: "translateX(20px)" },
          "33.4%": { transform: "translateX(10px)" },
          "66.6%": { transform: "translateX(10px)" },
          "66.7%": { transform: "translateX(2px)" },
          "99.9%": { transform: "translateX(2px)" },
          "100%": { transform: "translateX(0)" },
        },
        "slide-in-bottom": {
          "0%": { transform: "translateY(20px)" },
          "33.3%": { transform: "translateY(20px)" },
          "33.4%": { transform: "translateY(10px)" },
          "66.6%": { transform: "translateY(10px)" },
          "66.7%": { transform: "translateY(2px)" },
          "99.9%": { transform: "translateY(2px)" },
          "100%": { transform: "translateY(0)" },
        },
        "up-down-2px": {
          "0%": { transform: "translateY(-2px)" },
          "50%": { transform: "translateY(-2px)" },
          "50.1%": { transform: "translateY(0px)" },
          "100%": { transform: "translateXY(0px)" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 1s forwards",
        "slide-in-bottom": "slide-in-bottom 1s forwards",
        "up-down-2px": "up-down-2px 1s infinite",
      },
    },
  },
  plugins: [],
};
export default config;
