import { useEffect } from "react";

export function useEscapeKey(onEscape: () => void, isListening: boolean = true) {
  useEffect(() => {
    if (!isListening) return;
    
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onEscape();
    };
    
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onEscape, isListening]);
}
