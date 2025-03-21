import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1920px", // Định nghĩa màn hình 2xl là 1920px
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      padding: {
        "100": "100px",
      },
    },
  },
  plugins: [],
} satisfies Config;
