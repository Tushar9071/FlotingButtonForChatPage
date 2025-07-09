import { useEffect } from "react";

const GlobalStylesSetter = () => {
  useEffect(() => {
    const root = document.documentElement;

    if (window.chatButtonOptions?.backgroundprimaryColor) {
      root.style.setProperty(
        "--chat-button-bg-primary",
        window.chatButtonOptions.backgroundprimaryColor
      );
    }

    if (window.brandOptions?.backgroundsecondaryColor) {
      root.style.setProperty(
        "--brand-bg-secondary",
        window.brandOptions.backgroundsecondaryColor
      );
    }

    if (window.brandOptions?.backgroundprimaryColor) {
      root.style.setProperty(
        "--brand-bg-primary",
        window.brandOptions.backgroundprimaryColor
      );
    }
  }, []);

  return null;
};

export default GlobalStylesSetter;
