import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)",
          light: "var(--primary-light)",
          accent: "var(--accent)",
          banner: "var(--bg-banner)",
          surface: "var(--bg-muted)",
        },
        text: {
          main: "var(--text-main)",
          muted: "var(--text-muted)",
        },
        rating: "var(--rating)",
        border: {
          light: "var(--border-light)",
        },
      },
    },
  },
  plugins: [],
};

export default config;
