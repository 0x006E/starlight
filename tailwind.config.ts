const { nextui } = require("@nextui-org/react");
import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"IBM Plex Mono"', ...defaultTheme.fontFamily.sans],      
      }

    },
  },
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
