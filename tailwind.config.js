/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "#0B0E14",
          panel: "#111827",
          panel2: "#0F172A",
          border: "rgba(255,255,255,0.08)",
          muted: "rgba(255,255,255,0.70)",
          dim: "rgba(255,255,255,0.55)",
          accent: "#60A5FA",
        },
      },
    },
  },
  plugins: [],
};

