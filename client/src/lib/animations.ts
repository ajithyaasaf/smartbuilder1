import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
  },
  ease: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
  },
  stagger: 0.1,
};

// Helper function to find elements with multiple selector fallbacks
const findElements = (selectors: string[]): Element[] => {
  // Check if DOM is ready
  if (!document || !document.body) {
    return [];
  }
  
  for (const selector of selectors) {
    try {
      if (selector && typeof selector === 'string') {
        const elements = document.querySelectorAll(selector);
        if (elements && elements.length > 0) {
          return Array.from(elements);
        }
      }
    } catch (e) {
      // Continue to next selector if current one fails
      console.debug(`Selector failed: ${selector}`, e);
    }
  }
  return [];
};

export const animateHeroEntrance = () => {
  try {
    const tl = gsap.timeline();
    
    // Find heading elements
    const headings = findElements([
      "h1", 
      ".text-3xl", 
      ".text-4xl", 
      ".font-bold"
    ]);
    
    // Find subtext elements  
    const subtexts = findElements([
      "p", 
      ".text-lg", 
      ".text-xl"
    ]);
    
    // Find button containers
    const buttonContainers = findElements([
      ".flex.gap-4", 
      ".space-x-4"
    ]);
    
    // Find stats sections
    const statsElements = findElements([
      ".grid.grid-cols-2",
      ".grid.grid-cols-4"
    ]);
    
    // Find image containers
    const imageContainers = findElements([
      ".order-1", 
      ".relative.h-64",
      ".h-80"
    ]);
    
    // Animate found elements with safe checks
    if (headings.length > 0) {
      tl.fromTo(headings, 
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
    
    if (subtexts.length > 0) {
      tl.fromTo(subtexts, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5"
      );
    }
    
    if (buttonContainers.length > 0) {
      tl.fromTo(buttonContainers, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        "-=0.3"
      );
    }
    
    if (statsElements.length > 0) {
      tl.fromTo(statsElements, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.2"
      );
    }
    
    if (imageContainers.length > 0) {
      tl.fromTo(imageContainers, 
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
        "-=0.8"
      );
    }
  } catch (error) {
    console.debug("Hero animation error:", error);
  }
};

export const animateNavigation = () => {
  try {
    // Find logo elements
    const logos = findElements([
      "nav img", 
      "img"
    ]);
    
    // Find navigation items
    const navItems = findElements([
      "nav a"
    ]);
    
    if (logos.length > 0) {
      gsap.fromTo(logos, 
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
      );
    }
    
    if (navItems.length > 0) {
      gsap.fromTo(navItems, 
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out",
          stagger: 0.1 
        }
      );
    }
  } catch (error) {
    console.debug("Navigation animation error:", error);
  }
};

export const animateCardsOnScroll = (selector: string) => {
  try {
    // Enhanced selector system with fallbacks
    const cardSelectors = [
      ".overflow-hidden",
      ".border-none",
      ".bg-white",
      ".p-6",
      ".p-8"
    ];
    
    const cards = findElements(cardSelectors);
    
    if (cards.length === 0) {
      return;
    }

    cards.forEach((card, index) => {
      if (card && typeof card === 'object') {
        gsap.fromTo(card, 
          {
            y: 50,
            opacity: 0,
            scale: 0.95
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "bottom 10%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  } catch (error) {
    console.debug("Cards animation error:", error);
  }
};

export const animateFormEntrance = (selector: string) => {
  try {
    // Wait for DOM to be fully ready
    if (!document.body || !document.readyState === 'complete') {
      setTimeout(() => animateFormEntrance(selector), 100);
      return;
    }

    const formSelectors = [
      "form",
      ".space-y-4",
      ".space-y-6"
    ];
    
    const forms = findElements(formSelectors);
    
    forms.forEach((form) => {
      if (form && typeof form.querySelectorAll === 'function') {
        // Only animate static form elements, avoid dynamic components
        const staticElements = form.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"], button[type="submit"], label:not([data-radix-label])');
        
        if (staticElements.length > 0) {
          // Use a more defensive approach
          const validElements = Array.from(staticElements).filter(el => {
            return el && 
                   el.offsetParent !== null && 
                   !el.hasAttribute('data-no-animate') &&
                   !el.closest('[data-no-animate]') &&
                   !el.closest('[data-radix-collection-item]') && 
                   !el.closest('[data-state]') &&
                   !el.closest('[data-radix-select-trigger]') &&
                   !el.closest('[data-radix-select-content]') &&
                   !el.matches('[role="combobox"]') &&
                   !el.matches('[aria-expanded]') &&
                   getComputedStyle(el).position !== 'fixed'; // Avoid fixed positioned elements
          });

          if (validElements.length > 0) {
            validElements.forEach((element, index) => {
              try {
                // Double-check element is still valid before animating
                if (element && element.isConnected && element.offsetParent !== null) {
                  gsap.fromTo(element, 
                    { y: 20, opacity: 0 },
                    { 
                      y: 0, 
                      opacity: 1, 
                      duration: 0.5, 
                      delay: index * 0.1,
                      ease: "power2.out",
                      overwrite: "auto", // Prevent conflicts with existing animations
                      scrollTrigger: {
                        trigger: form,
                        start: "top 80%",
                        toggleActions: "play none none none",
                        once: true,
                        onUpdate: () => {
                          // Check if element is still valid during animation
                          if (!element.isConnected) {
                            ScrollTrigger.getById(element)?.kill();
                          }
                        }
                      }
                    }
                  );
                }
              } catch (elemError) {
                console.debug("Element animation error:", elemError);
              }
            });
          }
        }
      }
    });
  } catch (error) {
    console.debug("Form animation error:", error);
  }
};

export const animateStatsCounter = (selector: string) => {
  try {
    const statsSelectors = [
      ".text-2xl",
      ".text-3xl",
      ".font-bold"
    ];
    
    const stats = findElements(statsSelectors);
    
    stats.forEach((stat) => {
      if (stat && stat.textContent) {
        const numberElement = stat.textContent.match(/\d+/) ? stat : (stat.querySelector && stat.querySelector('[class*="text-"]'));
        if (numberElement && numberElement.textContent) {
          const finalNumber = numberElement.textContent;
          const numericValue = parseInt(finalNumber.replace(/[^\d]/g, '') || '0');
          
          if (numericValue > 0) {
            gsap.fromTo({ count: 0 }, {
              count: numericValue,
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                if (numberElement && numberElement.textContent !== undefined) {
                  numberElement.textContent = Math.floor(this.targets()[0].count) + (finalNumber.includes('+') ? '+' : '');
                }
              },
              scrollTrigger: {
                trigger: stat,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            });
          }
        }
      }
    });
  } catch (error) {
    console.debug("Stats counter error:", error);
  }
};

export const setupButtonHoverAnimations = () => {
  try {
    const buttonSelectors = [
      "button"
    ];
    
    const buttons = findElements(buttonSelectors);
    
    buttons.forEach((button) => {
      if (button && typeof button.addEventListener === 'function') {
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.02,
            y: -1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }
    });
  } catch (error) {
    console.debug("Button animations error:", error);
  }
};

export const animatePageTransition = () => {
  try {
    const pageElements = findElements([
      "header",
      "main"
    ]);
    
    if (pageElements.length > 0) {
      gsap.fromTo(pageElements, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.1 }
      );
    }
  } catch (error) {
    console.debug("Page transition error:", error);
  }
};

export const animateFloatingElements = () => {
  try {
    const floatingSelectors = [
      ".opacity-40"
    ];
    
    const floatingElements = findElements(floatingSelectors);
    
    floatingElements.forEach((element, index) => {
      if (element && typeof element === 'object') {
        gsap.to(element, {
          y: "random(-10, 10)",
          x: "random(-5, 5)",
          rotation: "random(-3, 3)",
          duration: "random(3, 5)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        });
      }
    });
  } catch (error) {
    console.debug("Floating elements error:", error);
  }
};

export const animateTextReveal = (selector: string) => {
  try {
    const textSelectors = [
      "h2",
      ".text-3xl",
      ".text-4xl"
    ];
    
    const textElements = findElements(textSelectors);
    
    textElements.forEach((element) => {
      if (element && typeof element === 'object') {
        gsap.fromTo(element, 
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });
  } catch (error) {
    console.debug("Text reveal error:", error);
  }
};

export const setupParallaxImages = () => {
  try {
    const imageSelectors = [
      "img"
    ];
    
    const images = findElements(imageSelectors);
    
    images.forEach((img) => {
      if (img && typeof img === 'object') {
        gsap.to(img, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
      }
    });
  } catch (error) {
    console.debug("Parallax images error:", error);
  }
};

export const animateMobileMenu = (isOpen: boolean) => {
  const overlay = document.querySelector('.mobile-menu-overlay');
  const items = document.querySelectorAll('.mobile-menu-item');
  
  if (isOpen) {
    if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.3 });
    if (items.length > 0) {
      gsap.fromTo(items, 
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" }
      );
    }
  } else {
    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.3 });
    if (items.length > 0) {
      gsap.to(items, { x: 50, opacity: 0, duration: 0.3, stagger: 0.05 });
    }
  }
};

export const animateNotification = (type: "success" | "error") => {
  const notification = document.querySelector('.notification');
  if (notification) {
    const tl = gsap.timeline();
    
    tl.fromTo(notification,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    )
    .to(notification,
      { x: 100, opacity: 0, duration: 0.5, ease: "power2.in", delay: 3 }
    );
  }
};

export const cleanupScrollTriggers = () => {
  try {
    if (ScrollTrigger && ScrollTrigger.getAll) {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger && trigger.kill) {
          trigger.kill();
        }
      });
    }
  } catch (error) {
    console.debug("Cleanup error:", error);
  }
};