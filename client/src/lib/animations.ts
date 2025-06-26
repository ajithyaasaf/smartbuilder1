import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    extra: 2.0,
  },
  ease: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    custom: "power3.inOut",
    dramatic: "power4.out",
    gentle: "sine.inOut",
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

    // Create dramatic entrance effects
    if (headings.length > 0) {
      // Split text for word-by-word animation
      headings.forEach(heading => {
        if (heading.textContent) {
          const words = heading.textContent.split(' ');
          heading.innerHTML = words.map(word => `<span class="word-animate">${word}</span>`).join(' ');
        }
      });
      
      const words = findElements([".word-animate"]);
      tl.fromTo(words, 
        { y: 120, opacity: 0, rotationX: 90 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0,
          duration: 1.2, 
          ease: "power4.out",
          stagger: 0.1
        }
      );
    }
    
    if (subtexts.length > 0) {
      tl.fromTo(subtexts, 
        { y: 80, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1, 
          ease: "power3.out" 
        },
        "-=0.6"
      );
    }
    
    if (buttonContainers.length > 0) {
      const buttons = buttonContainers[0]?.querySelectorAll('button');
      if (buttons) {
        tl.fromTo(buttons, 
          { y: 60, opacity: 0, scale: 0.8 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8, 
            ease: "back.out(1.7)",
            stagger: 0.2
          },
          "-=0.4"
        );
      }
    }
    
    if (statsElements.length > 0) {
      const statItems = statsElements[0]?.querySelectorAll('div');
      if (statItems) {
        tl.fromTo(statItems, 
          { y: 50, opacity: 0, scale: 0.9 },
          { 
            y: 0, 
            opacity: 1, 
            scale: 1,
            duration: 0.8, 
            ease: "power2.out",
            stagger: 0.1
          },
          "-=0.3"
        );
      }
    }
    
    if (imageContainers.length > 0) {
      tl.fromTo(imageContainers, 
        { x: 150, opacity: 0, scale: 0.8, rotationY: 25 },
        { 
          x: 0, 
          opacity: 1, 
          scale: 1,
          rotationY: 0,
          duration: 1.5, 
          ease: "power3.out" 
        },
        "-=1"
      );
    }

    // Add floating animations after entrance
    tl.call(() => {
      setTimeout(() => {
        animateFloatingElements();
      }, 1000);
    });

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

    // Logo entrance with bounce
    if (logos.length > 0) {
      tl.fromTo(logos, 
        { x: -80, opacity: 0, rotation: -180, scale: 0.5 },
        { 
          x: 0, 
          opacity: 1, 
          rotation: 0,
          scale: 1,
          duration: 1.2, 
          ease: "back.out(1.7)" 
        }
      );
    }

    // Brand text reveal
    if (brandText.length > 0) {
      tl.fromTo(brandText, 
        { x: -40, opacity: 0 },
        { 
          x: 0, 
          opacity: 1, 
          duration: 0.8, 
          ease: "power2.out",
          stagger: 0.1 
        },
        "-=0.8"
      );
    }
    
    // Navigation items with stagger
    if (navItems.length > 0) {
      tl.fromTo(navItems, 
        { y: -30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6, 
          ease: "power2.out",
          stagger: 0.1 
        },
        "-=0.6"
      );

      // Add hover animations for nav items
      navItems.forEach(item => {
        if (item && typeof item.addEventListener === 'function') {
          item.addEventListener('mouseenter', () => {
            gsap.to(item, {
              y: -3,
              scale: 1.05,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          item.addEventListener('mouseleave', () => {
            gsap.to(item, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
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
    if (!document.body || document.readyState !== 'complete') {
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
            const htmlEl = el as HTMLElement;
            return el && 
                   htmlEl.offsetParent !== null && 
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
                const htmlElement = element as HTMLElement;
                if (element && element.isConnected && htmlElement.offsetParent !== null) {
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
                            ScrollTrigger.getAll().forEach(trigger => {
                              if (trigger.trigger === element) {
                                trigger.kill();
                              }
                            });
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
            const counterObj = { count: 0 };
            gsap.to(counterObj, {
              count: numericValue,
              duration: 2,
              ease: "power2.out",
              onUpdate: function() {
                if (numberElement && numberElement.textContent !== undefined) {
                  numberElement.textContent = Math.floor(counterObj.count) + (finalNumber.includes('+') ? '+' : '');
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
      "button",
      ".animate-button",
      "[class*='rounded-\\[40px']"
    ];
    
    const buttons = findElements(buttonSelectors);
    
    buttons.forEach((button) => {
      if (button && typeof button.addEventListener === 'function') {
        // Enhanced hover animations
        button.addEventListener("mouseenter", () => {
          const tl = gsap.timeline();
          
          tl.to(button, {
            scale: 1.05,
            y: -4,
            rotationX: 5,
            duration: 0.3,
            ease: "power2.out"
          })
          .to(button, {
            boxShadow: "0 10px 25px rgba(180, 139, 47, 0.3)",
            duration: 0.2,
            ease: "power2.out"
          }, "-=0.3");

          // Animate button text/icons
          const buttonText = button.querySelector('span, .w-4');
          if (buttonText) {
            gsap.to(buttonText, {
              x: 3,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });
        
        button.addEventListener("mouseleave", () => {
          const tl = gsap.timeline();
          
          tl.to(button, {
            scale: 1,
            y: 0,
            rotationX: 0,
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power2.out"
          });

          const buttonText = button.querySelector('span, .w-4');
          if (buttonText) {
            gsap.to(buttonText, {
              x: 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        });

        // Click animation
        button.addEventListener("mousedown", () => {
          gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            ease: "power2.out"
          });
        });

        button.addEventListener("mouseup", () => {
          gsap.to(button, {
            scale: 1.05,
            duration: 0.1,
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
      // Create reveal mask effect
      gsap.set(container, { 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" 
      });

      gsap.to(container, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power3.out",
        delay: index * 0.2,
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
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

    if (cards.length > 0) {
      gsap.set(cards, { 
        y: 100, 
        opacity: 0, 
        scale: 0.9,
        rotationY: 15 
      });

      ScrollTrigger.batch(cards, {
        onEnter: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            overwrite: true
          });
        },
        onLeave: (elements) => {
          gsap.to(elements, {
            y: -50,
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            stagger: 0.1
          });
        },
        onEnterBack: (elements) => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1
          });
        }
      });
    }
  } catch (error) {
    console.debug("Staggered cards error:", error);
  }
};

export const animateCounterNumbers = () => {
  try {
    const counterSelectors = [
      ".text-2xl.font-bold",
      ".text-3xl.font-bold", 
      ".text-4xl.font-bold"
    ];

    const counters = findElements(counterSelectors);

    counters.forEach((counter) => {
      const text = counter.textContent;
      if (text && /\d/.test(text)) {
        const number = parseInt(text.replace(/\D/g, ''));
        const suffix = text.replace(/\d/g, '');
        
        if (number > 0) {
          const obj = { count: 0 };
          counter.textContent = "0" + suffix;
          
          gsap.to(obj, {
            count: number,
            duration: 2.5,
            ease: "power2.out",
            onUpdate: () => {
              counter.textContent = Math.floor(obj.count) + suffix;
            },
            scrollTrigger: {
              trigger: counter,
              start: "top 80%",
              toggleActions: "play none none reset"
            }
          });
        }
      }
    });
  } catch (error) {
    console.debug("Counter animation error:", error);
  }
};

export const animateTextTypewriter = (selector: string) => {
  try {
    const elements = findElements([selector, "h1", "h2", ".text-4xl", ".text-5xl"]);
    
    elements.forEach((element) => {
      const text = element.textContent;
      if (text) {
        element.textContent = "";
        
        const chars = text.split("");
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reset"
          }
        });

        chars.forEach((char, index) => {
          tl.to(element, {
            duration: 0.05,
            onComplete: () => {
              element.textContent += char;
            }
          });
        });
      }
    });
  } catch (error) {
    console.debug("Typewriter animation error:", error);
  }
};

export const animateBackgroundParallax = () => {
  try {
    const backgrounds = findElements([
      ".bg-gradient-to-br",
      ".bg-gradient-to-r",
      ".bg-\\[\\#b48b2f\\]"
    ]);

    backgrounds.forEach((bg) => {
      gsap.to(bg, {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: bg,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });
    });
  } catch (error) {
    console.debug("Background parallax error:", error);
  }
};

export const animateServiceTabs = () => {
  try {
    const tabTriggers = findElements([
      "[data-state='active']",
      ".data-\\[state\\=active\\]"
    ]);

    const tabContents = findElements([
      "[role='tabpanel']",
      ".space-y-8"
    ]);

    tabContents.forEach((content) => {
      gsap.set(content, { 
        x: 50, 
        opacity: 0,
        scale: 0.95 
      });

      gsap.to(content, {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.2
      });
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
      gsap.to(shape, {
        borderRadius: "50% 20% 80% 30%",
        duration: "random(3, 6)",
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: index * 0.5
      });
    });
  } catch (error) {
    console.debug("Morphing shapes error:", error);
  }
};

export const animateScrollIndicator = () => {
  try {
    // Create scroll progress indicator
    const indicator = document.createElement('div');
    indicator.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 4px;
      background: linear-gradient(90deg, #b48b2f, #d4af37);
      z-index: 1000;
      transform-origin: left;
    `;
    document.body.appendChild(indicator);

    gsap.to(indicator, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: true
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