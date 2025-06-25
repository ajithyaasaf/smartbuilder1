import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugins
gsap.registerPlugin(ScrollTrigger);

export const useGSAP = (
  callback: (context: { selector: (sel: string) => NodeListOf<Element> }) => void,
  dependencies: React.DependencyList = []
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const selector = (sel: string) => {
        if (containerRef.current) {
          return containerRef.current.querySelectorAll(sel);
        }
        return document.querySelectorAll(sel);
      };

      callback({ selector });
    }, containerRef.current);

    return () => {
      context.revert();
    };
  }, dependencies);

  return containerRef;
};

export const useScrollTrigger = (
  callback: () => void,
  dependencies: React.DependencyList = []
) => {
  useEffect(() => {
    callback();
    
    return () => {
      ScrollTrigger.refresh();
    };
  }, dependencies);
};