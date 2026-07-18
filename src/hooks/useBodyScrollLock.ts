import { useEffect } from "react";

function resetScrollLock() {
  const scrollY = document.body.style.top;
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.paddingRight = "";
  if (scrollY) {
    const parsedScrollY = parseInt(scrollY) * -1;
    
    // Temporarily disable smooth scrolling on html element
    const originalScrollBehavior = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";
    
    window.scrollTo({
      top: parsedScrollY,
      behavior: "instant",
    });
    
    // Restore original scroll behavior next frame
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = originalScrollBehavior;
    });
  }
}

export function useBodyScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      resetScrollLock();
    }

    return () => {
      resetScrollLock();
    };
  }, [isLocked]);
}
