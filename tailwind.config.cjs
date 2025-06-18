/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: "65ch",
            color: "#374151",
            lineHeight: "1.75",
            h1: {
              color: "#111827",
              fontWeight: "700",
              marginTop: "2em",
              marginBottom: "0.5em",
            },
            h2: {
              color: "#111827",
              fontWeight: "700",
              marginTop: "2em",
              marginBottom: "0.5em",
            },
            h3: {
              color: "#111827",
              fontWeight: "700",
              marginTop: "2em",
              marginBottom: "0.5em",
            },
            p: {
              marginBottom: "1em",
            },
            "ul, ol": {
              margin: "1em 0",
              paddingLeft: "1.5em",
            },
            li: {
              margin: "0.5em 0",
            },
            blockquote: {
              borderLeft: "4px solid #3b82f6",
              paddingLeft: "1em",
              fontStyle: "italic",
              margin: "1.5em 0",
            },
            pre: {
              backgroundColor: "#1f2937",
              color: "white",
              padding: "1em",
              borderRadius: "0.5em",
              overflowX: "auto",
            },
            code: {
              backgroundColor: "#f3f4f6",
              padding: "0.2em 0.4em",
              borderRadius: "0.25em",
              fontSize: "0.875em",
            },
            "pre code": {
              background: "none",
              padding: "0",
            },
            a: {
              color: "#2563eb",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
