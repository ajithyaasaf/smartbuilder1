import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect, lazy, Suspense } from "react";
import { 
  measurePerformance, 
  addResourceHints, 
  optimizeImages,
  preloadCriticalResources 
} from "@/utils/performance";

// Lazy load non-critical pages for code splitting
const About = lazy(() => import("@/pages/About").then(module => ({ default: module.About })));
const Services = lazy(() => import("@/pages/Services").then(module => ({ default: module.Services })));
const Contact = lazy(() => import("@/pages/Contact").then(module => ({ default: module.Contact })));
const Gallery = lazy(() => import("@/pages/Gallery").then(module => ({ default: module.Gallery })));
const Admin = lazy(() => import("@/pages/Admin").then(module => ({ default: module.Admin })));

// Eager load home page for instant display
import { Home } from "@/pages/Home";

function Router() {
  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#b48b2f] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about">
        <Suspense fallback={<LoadingFallback />}>
          <About />
        </Suspense>
      </Route>
      <Route path="/services">
        <Suspense fallback={<LoadingFallback />}>
          <Services />
        </Suspense>
      </Route>
      <Route path="/contact">
        <Suspense fallback={<LoadingFallback />}>
          <Contact />
        </Suspense>
      </Route>
      <Route path="/gallery">
        <Suspense fallback={<LoadingFallback />}>
          <Gallery />
        </Suspense>
      </Route>
      <Route path="/admin">
        <Suspense fallback={<LoadingFallback />}>
          <Admin />
        </Suspense>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
    // Initialize comprehensive performance optimizations
    measurePerformance();
    addResourceHints();
    preloadCriticalResources();
    
    // Optimize images after DOM loads
    setTimeout(() => {
      optimizeImages();
    }, 1000);

    // Add performance styles for faster navigation while keeping GSAP animations
    const style = document.createElement('style');
    style.textContent = `
      /* Hardware acceleration for GSAP animations */
      .gsap-animation { 
        transform: translateZ(0);
        will-change: transform, opacity; 
      }
      
      /* Optimize transitions without breaking GSAP */
      .page-transition { 
        transform: translateZ(0);
      }
      
      /* Preload hover states */
      .btn:hover { transform: translateY(-1px); }
    `;
    
    if (!document.querySelector('#performance-styles')) {
      style.id = 'performance-styles';
      document.head.appendChild(style);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
