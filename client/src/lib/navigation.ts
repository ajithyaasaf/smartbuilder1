import { useLocation } from "wouter";
import { useCallback } from "react";

export const useNavigation = () => {
  const [, setLocation] = useLocation();
  
  const navigate = useCallback((path: string) => {
    // Add a slight delay to prevent double-clicks and improve perceived performance
    requestAnimationFrame(() => {
      setLocation(path);
    });
  }, [setLocation]);
  
  return { navigate };
};