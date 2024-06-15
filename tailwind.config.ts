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
    },
  },
  plugins: [],
};
export default config;
