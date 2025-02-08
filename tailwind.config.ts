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
        secondary: "#C6E19B", // 기본 색상
        tertiary: "#edfbd5",
        gray: {
          1: "#7d7d7d",
          2: "#D9D9D9",
        },
        level: {
          0: "#8DBE3D",
          1: "#B7d487",
          2: "#FBDD73",
          3: "#FFC808",
          4: "#F27C21",
          5: "#FF0000",
        },
        tb: {
          // Training Balance
          less: "#FFCFA1",
          base: "#C7DC97",
          over: "#FF9E99",
        },
      },
      boxShadow: {
        md: "0px 2px 8px 0px rgba(0, 0, 0, 0.10)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        // Heading2 styles
        "h2-b": [
          "20px",
          {
            lineHeight: "32px",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],

        // Body styles
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
        "body-sm": [
          "12px",
          {
            lineHeight: "19.2px",
            letterSpacing: "-0.05em",
            fontWeight: "400",
          },
        ],
        // Body Small styles
        "body-sm-b": [
          "12px",
          {
            lineHeight: "19.2px",
            letterSpacing: "-0.05em",
            fontWeight: "700",
          },
        ],

        // Body Medium styles
        "body-md": [
          "14px",
          {
            lineHeight: "22.4px",
            letterSpacing: "-0.05em",
            fontWeight: "400",
          },
        ],
        "body-md-b": [
          "14px",
          {
            lineHeight: "22.4px",
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
