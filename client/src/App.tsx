import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import { Home } from "@/pages/Home";
import { Residential } from "@/pages/Residential";
import { Apartments } from "@/pages/Apartments";
import { Villas } from "@/pages/Villas";
import { MiniApartments } from "@/pages/MiniApartments";
import { LandPromotion } from "@/pages/LandPromotion";

function Router() {
  return (
    <Switch>
      {/* Add pages below */}
      <Route path="/" component={Home} />
      <Route path="/residential" component={Residential} />
      <Route path="/apartments" component={Apartments} />
      <Route path="/villas" component={Villas} />
      <Route path="/mini-apartments" component={MiniApartments} />
      <Route path="/land-promotion" component={LandPromotion} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
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
