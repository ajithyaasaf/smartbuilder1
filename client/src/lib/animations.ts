import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Mobile detection utility
const isMobile = () => {
  return typeof window !== 'undefined' && (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768
  );
};

// Performance-optimized config for mobile
export const animationConfig = {
  duration: {
    fast: isMobile() ? 0.2 : 0.3,
    normal: isMobile() ? 0.4 : 0.6,
    slow: isMobile() ? 0.6 : 1.2,
    extra: isMobile() ? 1.0 : 2.0,
  },
  ease: {
    smooth: "power2.out",
    bounce: isMobile() ? "power2.out" : "back.out(1.7)", // Simpler easing on mobile
    elastic: isMobile() ? "power2.out" : "elastic.out(1, 0.3)",
    custom: "power3.inOut",
    dramatic: "power4.out",
    gentle: "sine.inOut",
  },
  stagger: isMobile() ? 0.05 : 0.1, // Faster stagger on mobile
  mobile: {
    reduceAnimations: true,
    disableScrollTrigger: false, // Can be enabled if needed
    simplifyEffects: true,
  }
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
      // Silently continue to next selector if current one fails
      continue;
    }
  }
  return [];
};

// Mobile-optimized animation wrapper with performance checks
const safeAnimate = (elements: Element[] | Element | string, fromVars: any, toVars: any) => {
  if (!elements) return null;
  
  // Skip animations on very low-end devices
  if (isMobile() && animationConfig.mobile.reduceAnimations) {
    // For mobile, use will-change property for better performance
    if (typeof elements === 'string') {
      const found = document.querySelectorAll(elements);
      found.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.willChange = 'transform, opacity';
        }
      });
    }
  }
  
  try {
    // Handle different element types
    let targets: Element[] = [];
    
    if (typeof elements === 'string') {
      const found = document.querySelectorAll(elements);
      targets = Array.from(found);
    } else if (Array.isArray(elements)) {
      targets = elements.filter(el => el && el.nodeType === 1);
    } else if (elements.nodeType === 1) {
      targets = [elements];
    }
    
    // Only animate if we have valid targets
    if (targets.length > 0) {
      // Mobile optimization: reduce complex animations
      if (isMobile() && animationConfig.mobile.simplifyEffects) {
        // Simplify animations for mobile
        const simplifiedFromVars = { ...fromVars };
        const simplifiedToVars = { ...toVars };
        
        // Remove complex transforms on mobile
        if (simplifiedFromVars.scale) simplifiedFromVars.scale = 1;
        if (simplifiedToVars.scale) simplifiedToVars.scale = 1;
        
        // Reduce movement distance
        if (simplifiedFromVars.y) simplifiedFromVars.y = simplifiedFromVars.y / 2;
        if (simplifiedFromVars.x) simplifiedFromVars.x = simplifiedFromVars.x / 2;
        
        return gsap.fromTo(targets, simplifiedFromVars, simplifiedToVars);
      }
      
      return gsap.fromTo(targets, fromVars, toVars);
    }
  } catch (e) {
    console.debug('Animation skipped for invalid targets');
  }
  
  return null;
};

export const animateHeroEntrance = () => {
  try {
    const tl = gsap.timeline();
    
    // Enhanced selectors for better element targeting
    const headings = findElements([
      "h1", 
      ".text-3xl", 
      ".text-4xl", 
      ".text-5xl",
      ".text-6xl",
      ".font-bold:first-child"
    ]);
    
    const subtexts = findElements([
      "p", 
      ".text-lg", 
      ".text-xl",
      ".text-[#6b6b6b]"
    ]);
    
    const buttonContainers = findElements([
      ".flex.gap-4", 
      ".space-x-4",
      ".flex.flex-col.sm\\:flex-row"
    ]);
    
    const statsElements = findElements([
      ".grid.grid-cols-2",
      ".grid.grid-cols-4",
      ".grid.grid-cols-1.md\\:grid-cols-4"
    ]);
    
    const imageContainers = findElements([
      ".order-1", 
      ".relative.h-64",
      ".h-80",
      ".aspect-\\[4\\/3\\]",
      ".h-48"
    ]);

    // Create smooth entrance effects without DOM manipulation
    if (headings.length > 0) {
      const headingAnimation = safeAnimate(headings, 
        { y: 60, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8, 
          ease: "power3.out",
          stagger: 0.05
        }
      );
      if (headingAnimation) tl.add(headingAnimation);
    }
    
    if (subtexts.length > 0) {
      const subtextAnimation = safeAnimate(subtexts, 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.6, 
          ease: "power2.out",
          delay: 0.3
        }
      );
      if (subtextAnimation) tl.add(subtextAnimation, "-=0.4");
    }
    
    if (buttonContainers.length > 0) {
      const buttons = buttonContainers[0]?.querySelectorAll('button');
      if (buttons && buttons.length > 0) {
        const buttonAnimation = safeAnimate(Array.from(buttons), 
          { y: 30, opacity: 0, scale: 0.95 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.5, 
            ease: "power2.out",
            stagger: 0.1
          }
        );
        if (buttonAnimation) tl.add(buttonAnimation, "-=0.2");
      }
    }
    
    if (statsElements.length > 0) {
      const statItems = statsElements[0]?.querySelectorAll('div');
      if (statItems && statItems.length > 0) {
        const statAnimation = safeAnimate(Array.from(statItems), 
          { y: 30, opacity: 0, scale: 0.95 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.6, 
            ease: "power2.out",
            stagger: 0.08
          }
        );
        if (statAnimation) tl.add(statAnimation, "-=0.2");
      }
    }
    
    if (imageContainers.length > 0) {
      const imageAnimation = safeAnimate(imageContainers, 
        { x: 80, opacity: 0, scale: 0.9 },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          ease: "power2.out" 
        }
      );
      if (imageAnimation) tl.add(imageAnimation, "-=0.8");
    }

    // Skip floating animations on mobile for performance
    if (!isMobile()) {
      tl.call(() => {
        setTimeout(() => {
          animateFloatingElements();
        }, 1000);
      });
    }

  } catch (error) {
    console.debug("Hero animation error:", error);
  }
};

export const animateNavigation = () => {
  try {
    const tl = gsap.timeline();
    
    // Enhanced navigation selectors
    const logos = findElements([
      "nav img", 
      ".nav-logo img",
      ".w-20, .w-24, .w-32"
    ]);
    
    const brandText = findElements([
      ".nav-logo div",
      ".text-xl.font-bold",
      ".text-2xl.font-bold"
    ]);
    
    const navItems = findElements([
      "nav a",
      ".nav-item a",
      "[class*='NavigationMenuLink']"
    ]);

    // Logo entrance with smooth animation
    if (logos.length > 0) {
      const logoAnimation = safeAnimate(logos, 
        { x: -40, opacity: 0, scale: 0.8 },
        { 
          x: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.8, 
          ease: "power2.out" 
        }
      );
      if (logoAnimation) tl.add(logoAnimation);
    }

    // Brand text reveal
    if (brandText.length > 0) {
      const brandAnimation = safeAnimate(brandText, 
        { x: -20, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.6, 
          ease: "power2.out",
          stagger: 0.05 
        }
      );
      if (brandAnimation) tl.add(brandAnimation, "-=0.4");
    }
    
    // Navigation items with stagger
    if (navItems.length > 0) {
      const navAnimation = safeAnimate(navItems, 
        { y: -20, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.5, 
          ease: "power2.out",
          stagger: 0.08,
          delay: 0.2
        }
      );
      if (navAnimation) tl.add(navAnimation);

      // Add smooth hover animations for nav items
      navItems.forEach(item => {
        if (item && typeof item.addEventListener === 'function') {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              y: -2,
              scale: 1.02,
              duration: 0.2,
              ease: "power1.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              y: 0,
              scale: 1,
              duration: 0.2,
              ease: "power1.out"
            });
          });
        }
      });
    }

  } catch (error) {
    console.debug("Navigation animation error:", error);
  }
};

export const animateCardsOnScroll = (selector: string) => {
  try {
    // Skip complex scroll animations on mobile for better performance
    if (isMobile() && animationConfig.mobile.disableScrollTrigger) {
      return;
    }

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
      if (card && card.nodeType === 1) {
        const scrollConfig = isMobile() ? {
          // Simplified mobile scroll config
          trigger: card,
          start: "top 90%",
          once: true,
          refreshPriority: -1 // Lower priority for better performance
        } : {
          // Full desktop scroll config
          trigger: card,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
          once: true
        };

        const animationConfig = {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: isMobile() ? 0.3 : 0.5,
          delay: index * (isMobile() ? 0.02 : 0.05),
          ease: "power2.out",
          scrollTrigger: scrollConfig
        };
        
        safeAnimate(card, 
          { y: isMobile() ? 15 : 30, opacity: 0, scale: isMobile() ? 1 : 0.98 },
          animationConfig
        );
      }
    });
  } catch (error) {
    console.debug("Cards animation error:", error);
  }
};

export const animateFormEntrance = (selector: string) => {
  try {
    // Wait for DOM readiness
    if (!document.body) return;

    const formSelectors = [
      "form",
      ".space-y-4",
      ".space-y-6"
    ];
    
    const forms = findElements(formSelectors);
    
    forms.forEach((form) => {
      if (form && form.nodeType === 1) {
        // Simple form container animation
        safeAnimate(form,
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.6, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: form,
              start: "top 85%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
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
      if (stat && stat.nodeType === 1) {
        // Simple fade and scale animation instead of text manipulation
        safeAnimate(stat,
          { opacity: 0, scale: 0.8, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      }
    });
  } catch (error) {
    console.debug("Stats counter error:", error);
  }
};

export const setupButtonHoverAnimations = () => {
  try {
    // Skip hover animations on mobile devices for better performance
    if (isMobile()) {
      return;
    }

    const buttonSelectors = [
      "button",
      ".animate-button",
      "[class*='rounded-\\[40px']"
    ];
    
    const buttons = findElements(buttonSelectors);
    
    buttons.forEach((button) => {
      if (button && typeof button.addEventListener === 'function') {
        // Smooth hover animations
        button.addEventListener("mouseenter", () => {
          gsap.to(button, {
            scale: 1.02,
            y: -2,
            duration: 0.2,
            ease: "power1.out"
          });

          // Animate button text/icons if present
          const buttonText = button.querySelector('span, .w-4');
          if (buttonText) {
            gsap.to(buttonText, {
              x: 2,
              duration: 0.2,
              ease: "power1.out"
            });
          }
        });
        
        button.addEventListener("mouseleave", () => {
          gsap.to(button, {
            scale: 1,
            y: 0,
            duration: 0.2,
            ease: "power1.out"
          });

          const buttonText = button.querySelector('span, .w-4');
          if (buttonText) {
            gsap.to(buttonText, {
              x: 0,
              duration: 0.2,
              ease: "power1.out"
            });
          }
        });

        // Click animation
        button.addEventListener("mousedown", () => {
          gsap.to(button, {
            scale: 0.98,
            duration: 0.1,
            ease: "power1.out"
          });
        });

        button.addEventListener("mouseup", () => {
          gsap.to(button, {
            scale: 1.02,
            duration: 0.1,
            ease: "power1.out"
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
      safeAnimate(pageElements, 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.05 }
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
      if (element && element.nodeType === 1) {
        gsap.to(element, {
          y: Math.random() * 20 - 10,
          x: Math.random() * 10 - 5,
          rotation: Math.random() * 6 - 3,
          duration: 3 + Math.random() * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.2
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
      if (element && element.nodeType === 1) {
        safeAnimate(element, 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none reverse",
              once: true
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
    // Disable parallax on mobile for performance
    if (isMobile()) {
      return;
    }

    const imageSelectors = [
      "img"
    ];
    
    const images = findElements(imageSelectors);
    
    images.forEach((img) => {
      if (img && img.nodeType === 1) {
        gsap.to(img, {
          yPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: img,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            refreshPriority: -1 // Lower priority for better performance
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
    if (overlay) gsap.to(overlay, { opacity: 1, duration: 0.2 });
    if (items.length > 0) {
      safeAnimate(Array.from(items), 
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }
      );
    }
  } else {
    if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.2 });
    if (items.length > 0) {
      safeAnimate(Array.from(items), 
        { x: 0, opacity: 1 },
        { x: 30, opacity: 0, duration: 0.2, stagger: 0.02 }
      );
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

// Advanced new animations
export const animateImageReveal = () => {
  try {
    const imageContainers = findElements([
      ".h-48",
      ".h-56", 
      ".h-64",
      ".aspect-\\[4\\/3\\]",
      ".bg-cover"
    ]);

    imageContainers.forEach((container, index) => {
      if (container && container.nodeType === 1) {
        // Simple fade and scale reveal
        safeAnimate(container,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              toggleActions: "play none none reverse",
              once: true
            }
          }
        );
      }
    });
  } catch (error) {
    console.debug("Image reveal error:", error);
  }
};

export const animateStaggeredCards = () => {
  try {
    const cardSelectors = [
      ".service-card",
      ".overflow-hidden",
      ".shadow-xl"
    ];

    const cards = findElements(cardSelectors);

    cards.forEach((card, index) => {
      if (card && card.nodeType === 1) {
        safeAnimate(card,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
              once: true
            }
          }
        );
      }
    });
  } catch (error) {
    console.debug("Staggered cards error:", error);
  }
};

export const animateCounterNumbers = () => {
  try {
    // Skip counter animations to avoid React DOM conflicts
    const counterSelectors = [
      ".text-2xl.font-bold",
      ".text-3xl.font-bold", 
      ".text-4xl.font-bold"
    ];

    const counters = findElements(counterSelectors);

    counters.forEach((counter) => {
      if (counter && counter.nodeType === 1) {
        // Simple fade and scale animation instead of text manipulation
        safeAnimate(counter,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 75%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      }
    });
  } catch (error) {
    console.debug("Counter animation error:", error);
  }
};

export const animateTextTypewriter = (selector: string) => {
  try {
    // Skip typewriter animation to avoid React DOM conflicts
    const elements = findElements([selector, "h1", "h2", ".text-4xl", ".text-5xl"]);
    
    elements.forEach((element) => {
      if (element && element.nodeType === 1) {
        // Simple fade-in instead of typewriter to avoid DOM manipulation
        safeAnimate(element,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: element,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true
            }
          }
        );
      }
    });
  } catch (error) {
    console.debug("Text animation error:", error);
  }
};

export const animateBackgroundParallax = () => {
  try {
    // Disable background parallax on mobile for performance
    if (isMobile()) {
      return;
    }

    const backgrounds = findElements([
      ".bg-gradient-to-br",
      ".bg-gradient-to-r",
      ".bg-\\[\\#b48b2f\\]"
    ]);

    backgrounds.forEach((bg) => {
      if (bg && bg.nodeType === 1) {
        gsap.to(bg, {
          backgroundPosition: "50% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: bg,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
            refreshPriority: -1
          }
        });
      }
    });
  } catch (error) {
    console.debug("Background parallax error:", error);
  }
};

export const animateServiceTabs = () => {
  try {
    const tabContents = findElements([
      "[role='tabpanel']",
      ".space-y-8"
    ]);

    tabContents.forEach((content) => {
      if (content && content.nodeType === 1) {
        safeAnimate(content,
          { x: 30, opacity: 0, scale: 0.98 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: 0.1
          }
        );
      }
    });
  } catch (error) {
    console.debug("Service tabs animation error:", error);
  }
};

export const animateMorphingShapes = () => {
  try {
    const shapes = findElements([
      ".rounded-full",
      ".rounded-lg",
      ".rounded-3xl"
    ]);

    shapes.forEach((shape, index) => {
      if (shape && shape.nodeType === 1) {
        gsap.to(shape, {
          borderRadius: "50% 20% 80% 30%",
          duration: 4 + Math.random() * 2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: index * 0.3
        });
      }
    });
  } catch (error) {
    console.debug("Morphing shapes error:", error);
  }
};

export const animateScrollIndicator = () => {
  try {
    // Only create if it doesn't exist
    let indicator = document.querySelector('.scroll-indicator') as HTMLElement;
    if (!indicator) {
      indicator = document.createElement('div');
      indicator.className = 'scroll-indicator';
      indicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #17a6b8, #148a9a);
        z-index: 1000;
        transform-origin: left;
        pointer-events: none;
      `;
      document.body.appendChild(indicator);
    }

    gsap.to(indicator, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      }
    });
  } catch (error) {
    console.debug("Scroll indicator error:", error);
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

// Mobile Performance Optimization Functions
export const optimizeGSAPForMobile = () => {
  if (!isMobile()) return;

  // Set GSAP to use force3D: false on mobile to reduce GPU usage
  gsap.config({
    force3D: false,
    nullTargetWarn: false
  });

  // Configure ScrollTrigger for mobile optimization
  if (ScrollTrigger) {
    ScrollTrigger.config({
      limitCallbacks: true,
      syncInterval: 150, // Reduce sync frequency on mobile
      ignoreMobileResize: true
    });
  }
};

// Performance monitoring
export const initPerformanceMonitoring = () => {
  if (!isMobile() || typeof window === 'undefined') return;

  let animationCount = 0;
  
  // Simple performance monitoring without overriding GSAP methods
  const checkAnimationCount = () => {
    if (animationCount > 50) {
      console.debug('High animation count detected on mobile:', animationCount);
    }
    animationCount = 0; // Reset counter
  };
  
  // Check every 2 seconds
  setInterval(checkAnimationCount, 2000);
};

// Cleanup function for will-change properties
export const cleanupWillChange = () => {
  if (typeof document === 'undefined') return;
  
  try {
    const elements = document.querySelectorAll('[style*="will-change"]');
    elements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.willChange = 'auto';
      }
    });
  } catch (error) {
    console.debug('Will-change cleanup error:', error);
  }
};

// Initialize mobile optimizations
export const initMobileOptimizations = () => {
  if (isMobile()) {
    optimizeGSAPForMobile();
    initPerformanceMonitoring();
    
    // Clean up will-change properties after animations
    setTimeout(cleanupWillChange, 5000);
  }
};