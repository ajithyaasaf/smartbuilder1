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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50">
      {/* Animated Building Construction Loader */}
      <div className="relative">
        {/* Building Base */}
        <div className="w-32 h-40 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-lg relative overflow-hidden">
          {/* Windows */}
          <div className="absolute top-4 left-4 w-4 h-4 bg-blue-200 rounded animate-pulse"></div>
          <div className="absolute top-4 right-4 w-4 h-4 bg-blue-200 rounded animate-pulse delay-100"></div>
          <div className="absolute top-12 left-4 w-4 h-4 bg-blue-200 rounded animate-pulse delay-200"></div>
          <div className="absolute top-12 right-4 w-4 h-4 bg-blue-200 rounded animate-pulse delay-300"></div>
          <div className="absolute top-20 left-4 w-4 h-4 bg-blue-200 rounded animate-pulse delay-400"></div>
          <div className="absolute top-20 right-4 w-4 h-4 bg-blue-200 rounded animate-pulse delay-500"></div>
          
          {/* Construction Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-400">
            <div className="h-full bg-gradient-to-r from-[#b48b2f] to-[#8f6f23] animate-pulse" style={{width: '100%'}}></div>
          </div>
        </div>
        
        {/* Crane */}
        <div className="absolute -top-16 -right-8">
          <div className="w-1 h-20 bg-yellow-500 transform rotate-12 origin-bottom animate-bounce"></div>
          <div className="absolute top-0 right-0 w-8 h-1 bg-yellow-500 transform rotate-12"></div>
          <div className="absolute top-1 right-6 w-2 h-6 bg-yellow-600 animate-swing"></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute -top-4 left-8 w-1 h-1 bg-[#b48b2f] rounded-full animate-bounce delay-100"></div>
        <div className="absolute -top-6 right-12 w-1 h-1 bg-[#b48b2f] rounded-full animate-bounce delay-300"></div>
        <div className="absolute -top-2 left-16 w-1 h-1 bg-[#b48b2f] rounded-full animate-bounce delay-500"></div>
      </div>
      
      {/* Brand Text */}
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-[#313131] mb-2 animate-pulse">Smart Builders & Developers</h3>
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-[#b48b2f] rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-[#b48b2f] rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-[#b48b2f] rounded-full animate-bounce delay-200"></div>
        </div>
        <p className="text-sm text-[#6b6b6b] mt-2 animate-pulse">Building your dreams...</p>
      </div>
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
