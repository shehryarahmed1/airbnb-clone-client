/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js, ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "657px",
      // => @media (min-width: 640px) { ... }

      md: "1110px",
      // => @media (min-width: 768px) { ... }
      "2md": "690px",

      "3md": "1100px",
      "4md": "1360px",
      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    // ...
  ],
};
