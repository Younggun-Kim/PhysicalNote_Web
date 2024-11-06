import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      color: {
        primary: {
          primary: "#8DBE3D", // 기본 색상
        },
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "body-b-sm": [
          "12px",
          {
            lineHeight: "19.2x",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],
        "body-b-md": [
          "16px",
          {
            lineHeight: "25.6px",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
