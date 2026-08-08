import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F3EC",
        ink: "#14161B",
        ruby: {
          DEFAULT: "#8E1B39",
          light: "#E16E85",
        },
        sage: "#9CAF88",
        steel: "#657484",
        // structured register — "spice"
        structured: {
          bg: "#14161B",
          text: "#ECEEF0",
          muted: "#7F8994",
          border: "#33383F",
        },
        // unstructured register — "sugar"
        unstructured: {
          bg: "#F3E6DE",
          text: "#3B2A26",
          muted: "#A9765A",
          border: "#D8B9A6",
        },
        // shared signature accent — the bridge between both
        seam: "#8E1B39",
      },
      fontFamily: {
        display: ["var(--font-fraunces)"],
        sans: ["var(--font-space-grotesk)"],
        mono: ["var(--font-jetbrains-mono)"],
        serif: ["var(--font-fraunces)"],
        body: ["var(--font-lora)"],
      },
    },
  },
  plugins: [],
};
export default config;
