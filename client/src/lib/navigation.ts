import { useLocation } from "wouter";

export const useNavigation = () => {
  const [, setLocation] = useLocation();
  
  const navigate = (path: string) => {
    setLocation(path);
  };
  
  return { navigate };
};