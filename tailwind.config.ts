// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          light: "#087dba",
          DEFAULT: "#0e4d89",
        },
        gray: {
          light: "#d4d4d4",
          DEFAULT: "#b5b7b9",
        },
        gold: {
          semi: "#efdb6a",
          dark: "#9c7324",
          DEFAULT: "#a8822e",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        // Keep your existing keyframes
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(100px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInScale: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceIn: {
          "0%, 20%, 40%, 60%, 80%, 100%": {
            animationTimingFunction: "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
          },
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "20%": { transform: "scale(1.1)" },
          "40%": { transform: "scale(0.9)" },
          "60%": { transform: "scale(1.03)" },
          "80%": { transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },

        // **IMPORTANT: Rename 'scroll' to 'infinite-scroll' for clarity**
        // Adjust the 'to' value to -50% for seamless looping of duplicated content
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }, // Moves exactly half the width of the duplicated content
        },
      },
      animation: {
        // Keep your existing animations
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        slideInRight: "slideInRight 0.8s ease-out forwards",
        fadeInScale: "fadeInScale 0.5s ease-out forwards",
        bounceIn: "bounceIn 1s ease",

        // **IMPORTANT: Apply the new animation utility**
        'infinite-scroll': 'infinite-scroll 15s linear infinite', // Adjust '40s' for speed
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default config;