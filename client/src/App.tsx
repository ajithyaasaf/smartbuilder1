import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Services } from "@/pages/Services";
import { Contact } from "@/pages/Contact";
import { Gallery } from "@/pages/Gallery";
import { Admin } from "@/pages/Admin";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/contact" component={Contact} />
      <Route path="/gallery" component={Gallery} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => {
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
    `;
    
    if (!document.querySelector('#nav-speed')) {
      style.id = 'nav-speed';
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
