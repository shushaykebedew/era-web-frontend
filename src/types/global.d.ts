export {};

declare global {
  interface Window {
    __authClearSession?: () => void;
  }
}
