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
      colors: {
        primary: "#8DBE3D", // 기본 색상
        tertiary: "#edfbd5",
        "gray-1": "#7d7d7d",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        "h2-b": [
          "20px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],
        "body-b-sm": [
          "12px",
          {
            lineHeight: "19.2px",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],
        body: [
          "16px",
          {
            lineHeight: "25.6px",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],
        "body-b": [
          "16px",
          {
            lineHeight: "25.6px",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],
        "body-md": [
          "14px",
          {
            lineHeight: "22.4px",
            letterSpacing: "-0.05em",
            fontWeight: "400",
          },
        ],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
