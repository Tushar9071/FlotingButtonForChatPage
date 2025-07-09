import React, { createContext, useContext } from "react";
import type { ChatButtonOptions, BrandOptions } from "../types/global";

interface LayoutContextType {
  chatIconLayout: ChatButtonOptions;
  chatBoxLayout: BrandOptions;
}

const LayOutContext = createContext<LayoutContextType | undefined>(undefined);

export const LayOutContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const chatIconLayout: ChatButtonOptions = window.chatButtonOptions || {
    id: 5.1,
    name: "Default Widget",
    backgroundprimaryColor: "#000000",
    buttonText: "Chat with us",
    position: "right",
  };

  const chatBoxLayout: BrandOptions = window.brandOptions || {
    brandName: "xyz",
    brandImg:
      "https://raw.githubusercontent.com/Tushar9071/chatbot/refs/heads/main/src/assets/chatIcon.png",
    welcomeText: "Hi there!\nHow can I help you?",
    // backgroundprimaryColor: "#25D366",
    backgroundprimaryColor: "#000000",
    backgroundsecondaryColor: "#000000",
    textprimaryColor: "#ffffff",
    textsecondaryColor: "#000000",
    buttonText: "Chat with us",
  };

  return (
    <LayOutContext.Provider value={{ chatIconLayout, chatBoxLayout }}>
      {children}
    </LayOutContext.Provider>
  );
};

export const useLayOutConfig = (): LayoutContextType => {
  const context = useContext(LayOutContext);
  if (!context) {
    throw new Error(
      "useWidgetConfig must be used within a LayOutContextProvider"
    );
  }
  return context;
};
