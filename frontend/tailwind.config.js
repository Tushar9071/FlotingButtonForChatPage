// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  theme: {
    extend: {
      colors: {
        // primary: "var(--color-primary)",
        // secondary: "var(--color-secondary)",
        // bg_primary: "var(--color-background-primary)",
        // bg_secondary: "var(--color-background-secondary)",
        chatButtonBgPrimary: "var(--chat-button-bg-primary)",
        brandBoxBgPrimary: "var(--brand-bg-primary)",
        chatButtonBgSecondary: "var(--chat-button-bg-secondary)",
        brandBoxBgSecondary: "var(--brand-bg-secondary)",
      },
    },
  },
};
