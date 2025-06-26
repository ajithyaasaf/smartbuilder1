// Performance optimization utilities for Smart Builders & Developers

// Lazy loading observer for images
export const createLazyImageObserver = () => {
  if (!('IntersectionObserver' in window)) return null;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add('fade-in');
          observer.unobserve(img);
        }
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  return imageObserver;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/assets/hero-building.jpg',
    '/assets/logo.png'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Debounce utility for scroll events
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for resize events
export const throttle = <T extends (...args: any[]) => void>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Critical CSS loading helper
export const loadNonCriticalCSS = (href: string) => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => {
    link.media = 'all';
  };
  document.head.appendChild(link);
};

// Service worker registration for caching
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.debug('SW registered successfully');
      return registration;
    } catch (error) {
      console.debug('SW registration failed');
      return null;
    }
  }
  return null;
};

// Resource hints for better performance
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: 'anonymous' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ];

  hints.forEach(hint => {
    const existing = document.querySelector(`link[rel="${hint.rel}"][href="${hint.href}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = hint.rel;
      link.href = hint.href;
      if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
      document.head.appendChild(link);
    }
  });
};

// Performance monitoring
export const measurePerformance = () => {
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        try {
          const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          const metrics = {
            DNS: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
            TCP: Math.round(perfData.connectEnd - perfData.connectStart),
            TTFB: Math.round(perfData.responseStart - perfData.requestStart),
            DOMLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
            FullLoad: Math.round(perfData.loadEventEnd - perfData.fetchStart)
          };
          
          console.debug('Performance Metrics (ms):', metrics);
        } catch (error) {
          console.debug('Performance measurement failed');
        }
      }, 0);
    });
  }
};

// Memory cleanup for animations
export const cleanupAnimations = () => {
  // Clean up GSAP animations and event listeners
  const elementsWithWillChange = document.querySelectorAll('[style*="will-change"]');
  elementsWithWillChange.forEach(el => {
    if (el instanceof HTMLElement) {
      el.style.willChange = 'auto';
    }
  });
};

// Optimize images with loading attribute
export const optimizeImages = () => {
  const images = document.querySelectorAll('img:not([loading])');
  images.forEach((img, index) => {
    if (img instanceof HTMLImageElement) {
      // First 3 images are eagerly loaded, rest are lazy
      img.loading = index < 3 ? 'eager' : 'lazy';
      img.decoding = 'async';
    }
  });
};