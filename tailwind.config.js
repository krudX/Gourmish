/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--clr-bg)",
        "background-rgba": "var(--clr-bg-rgba)",
        "dark-grey": "var(--clr-dark-grey)",
        border: "var(--clr-border)",
        primary: "var(--clr-primary)",
      },
      backgroundSize: {
        "110%": "110%",
      },
    },
  },
  plugins: [],
};
