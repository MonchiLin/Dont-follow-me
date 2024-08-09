import {nextui} from '@nextui-org/theme'
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: "class",
  plugins: [
    require('tailwind-scrollbar'),
    nextui(),
  ],
};

export default config;
