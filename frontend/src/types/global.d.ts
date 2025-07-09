export interface ChatButtonOptions {
  id?: number;
  name?: string;
  backgroundprimaryColor?: string;
  buttonText?: string;
  position?: string;
}

export interface BrandOptions {
  brandName?: string;
  brandImg?: string;
  welcomeText?: string;
  messageText?: string;
  backgroundprimaryColor?: string;
  backgroundsecondaryColor?: string;
  textprimaryColor?: string;
  textsecondaryColor?: string;
  buttonText?: string;
}

declare global {
  interface Window {
    chatButtonOptions?: ChatButtonOptions;
    brandOptions?: BrandOptions;
  }
}
