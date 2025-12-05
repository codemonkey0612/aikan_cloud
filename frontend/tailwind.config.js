/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f0f7ff",
          100: "#dceeff",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
        },
      },
      boxShadow: {
        card: "0 15px 35px -20px rgba(15, 23, 42, 0.4)",
      },
    },
  },
  plugins: [],
};
