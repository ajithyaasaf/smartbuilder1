import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Animation presets for consistent branding
export const animationConfig = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    extraSlow: 2.0,
  },
  ease: {
    smooth: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    expo: "expo.out",
  },
  stagger: 0.1,
};

// Hero section entrance animation
export const animateHeroEntrance = () => {
  const tl = gsap.timeline();
  
  tl.from(".hero-heading", {
    y: 100,
    opacity: 0,
    duration: animationConfig.duration.slow,
    ease: animationConfig.ease.smooth,
  })
  .from(".hero-subtext", {
    y: 50,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.smooth,
  }, "-=0.3")
  .from(".hero-buttons", {
    y: 30,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.smooth,
  }, "-=0.2")
  .from(".hero-stats", {
    scale: 0.8,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.bounce,
    stagger: animationConfig.stagger,
  }, "-=0.1")
  .from(".hero-image", {
    scale: 0.9,
    opacity: 0,
    duration: animationConfig.duration.slow,
    ease: animationConfig.ease.smooth,
  }, "-=0.8");

  return tl;
};

// Navigation animation
export const animateNavigation = () => {
  gsap.from(".nav-item", {
    y: -20,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.smooth,
    stagger: animationConfig.stagger,
    delay: 0.2,
  });

  gsap.from(".nav-logo", {
    scale: 0,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.bounce,
  });
};

// Card reveal animations with scroll trigger
export const animateCardsOnScroll = (selector: string) => {
  gsap.fromTo(selector, 
    {
      y: 80,
      opacity: 0,
      scale: 0.95,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.smooth,
      stagger: animationConfig.stagger,
      scrollTrigger: {
        trigger: selector,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    }
  );
};

// Form entrance animation
export const animateFormEntrance = (selector: string) => {
  const tl = gsap.timeline();
  
  tl.from(`${selector} .form-header`, {
    y: -30,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.smooth,
  })
  .from(`${selector} .form-field`, {
    x: -20,
    opacity: 0,
    duration: animationConfig.duration.fast,
    ease: animationConfig.ease.smooth,
    stagger: 0.08,
  }, "-=0.2")
  .from(`${selector} .form-button`, {
    scale: 0.8,
    opacity: 0,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.bounce,
  }, "-=0.1");

  return tl;
};

// Stats counter animation
export const animateStatsCounter = (selector: string) => {
  const statsElements = document.querySelectorAll(`${selector} .stat-number`);
  
  statsElements.forEach((element) => {
    const finalValue = parseInt(element.textContent || "0");
    const obj = { value: 0 };
    
    gsap.to(obj, {
      value: finalValue,
      duration: animationConfig.duration.extraSlow,
      ease: animationConfig.ease.expo,
      onUpdate: () => {
        if (element.textContent?.includes("+")) {
          element.textContent = Math.round(obj.value) + "+";
        } else if (element.textContent?.includes(".")) {
          element.textContent = obj.value.toFixed(1);
        } else {
          element.textContent = Math.round(obj.value).toString();
        }
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });
  });
};

// Button hover animations
export const setupButtonHoverAnimations = () => {
  const buttons = document.querySelectorAll(".animate-button");
  
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      gsap.to(button, {
        scale: 1.05,
        y: -2,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      });
    });
    
    button.addEventListener("mouseleave", () => {
      gsap.to(button, {
        scale: 1,
        y: 0,
        duration: animationConfig.duration.fast,
        ease: animationConfig.ease.smooth,
      });
    });
  });
};

// Page transition animation
export const animatePageTransition = () => {
  const tl = gsap.timeline();
  
  tl.from(".page-content", {
    opacity: 0,
    y: 30,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.smooth,
  })
  .from(".page-header", {
    opacity: 0,
    scale: 0.95,
    duration: animationConfig.duration.normal,
    ease: animationConfig.ease.smooth,
  }, "-=0.4");

  return tl;
};

// Floating elements animation
export const animateFloatingElements = () => {
  gsap.to(".floating-element", {
    y: -10,
    duration: 2,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    stagger: 0.3,
  });
};

// Text reveal animation
export const animateTextReveal = (selector: string) => {
  const textElements = document.querySelectorAll(selector);
  
  textElements.forEach((element) => {
    const text = element.textContent;
    if (!text) return;
    
    element.innerHTML = text
      .split("")
      .map((char) => `<span class="char">${char === " " ? "&nbsp;" : char}</span>`)
      .join("");
    
    gsap.from(`${selector} .char`, {
      opacity: 0,
      y: 20,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
      stagger: 0.02,
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  });
};

// Image parallax effect
export const setupParallaxImages = () => {
  const parallaxImages = document.querySelectorAll(".parallax-image");
  
  parallaxImages.forEach((image) => {
    gsap.to(image, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: image,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
      },
    });
  });
};

// Mobile menu animation
export const animateMobileMenu = (isOpen: boolean) => {
  const tl = gsap.timeline();
  
  if (isOpen) {
    tl.to(".mobile-menu-overlay", {
      opacity: 1,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
    })
    .from(".mobile-menu-item", {
      x: -30,
      opacity: 0,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
      stagger: 0.05,
    }, "-=0.1");
  } else {
    tl.to(".mobile-menu-item", {
      x: -30,
      opacity: 0,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
      stagger: 0.02,
    })
    .to(".mobile-menu-overlay", {
      opacity: 0,
      duration: animationConfig.duration.fast,
      ease: animationConfig.ease.smooth,
    }, "-=0.1");
  }
  
  return tl;
};

// Success/Error message animations
export const animateNotification = (type: "success" | "error") => {
  const selector = `.toast-${type}`;
  
  gsap.fromTo(selector, 
    {
      scale: 0.8,
      opacity: 0,
      y: 20,
    },
    {
      scale: 1,
      opacity: 1,
      y: 0,
      duration: animationConfig.duration.normal,
      ease: animationConfig.ease.bounce,
    }
  );
};

// Cleanup function for scroll triggers
export const cleanupScrollTriggers = () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
};