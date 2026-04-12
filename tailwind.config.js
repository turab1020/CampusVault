/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6F20",
        secondary: "#F6A02D",
        "bg-main": "#2C2A29",
        surface: "#E1E1E1",
        "neutral-gray": "#7D7F7D",
        success: "#10B981",
        warning: "#F59E0B",
        danger: "#EF4444",
        "accent-teal": "#14B8A6",
      },
      fontFamily: {
        display: ["Archivo Black", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
        heading: ["Archivo Black", "sans-serif"],
      },
      boxShadow: {
        brutal: "4px 4px 0px 0px rgba(0,0,0,1)",
        "brutal-hover": "2px 2px 0px 0px rgba(0,0,0,1)",
      },
      borderWidth: {
        brutal: "4px",
      },
      borderRadius: {
        brutal: "32px",
      },
    },
  },
  plugins: [],
}
