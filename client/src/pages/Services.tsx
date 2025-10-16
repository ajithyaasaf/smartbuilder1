import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  MapPin,
  Phone,
  Mail,
  Building,
  Home,
  Users,
  TreePine,
  ArrowRight,
  CheckCircle,
  Star,
  Award,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { EMICalculatorForm } from "@/components/forms";
import { useNavigation } from "@/lib/navigation";
import { useGSAP } from "@/hooks/useGSAP";
import {
  animatePageTransition,
  animateNavigation,
  animateCardsOnScroll,
  setupButtonHoverAnimations,
  animateFloatingElements,
  setupParallaxImages,
  animateTextReveal,
  animateImageReveal,
  animateStaggeredCards,
  animateServiceTabs,
  animateBackgroundParallax,
  animateScrollIndicator,
  initMobileOptimizations,
} from "@/lib/animations";

export const Services = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState("residential");
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      // Initialize mobile optimizations first
      initMobileOptimizations();

      // Instant execution - no delays
      animatePageTransition();
      animateNavigation();
      animateTextReveal(".section-title");

      // Enhanced service-specific animations
      animateImageReveal();
      animateStaggeredCards();
      animateServiceTabs();
      animateBackgroundParallax();
      animateScrollIndicator();

      // Interactive elements
      setupButtonHoverAnimations();
      animateFloatingElements();
      setupParallaxImages();
      animateCardsOnScroll(".overflow-hidden");
    } catch (error) {
      console.debug("Animation initialization error:", error);
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/", active: false },
    { name: "About", path: "/about", active: false },
    { name: "Gallery", path: "/gallery", active: false },
    { name: "Services", path: "/services", active: true },
    { name: "Contact", path: "/contact", active: false },
  ];

  const services = [
    {
      id: "residential",
      title: "Residential Projects",
      icon: Home,
      description: "Premium residential complexes with modern amenities",
      features: [
        "Quality construction with good materials",
        "Best security and power backup",
        "Clean surroundings and parking space",
      ],
      projects: ["Green Valley Homes", "Royal Residency", "Paradise Heights"],
      priceRange: "Contact for Pricing",
      completedProjects: 5,
      image: "/residential-projects.jpg",
    },
    {
      id: "apartments",
      title: "Apartments",
      icon: Building,
      description: "Modern apartment complexes with luxury amenities",
      features: [
        "Well-ventilated rooms with good lighting",
        "Best amenities and clean common areas",
        "Safe environment for families",
      ],
      projects: ["Sky Gardens", "Elite Towers", "Grand Plaza"],
      priceRange: "Contact for Pricing",
      completedProjects: 3,
      image: "/luxury-apartments.jpg",
    },
    {
      id: "villas",
      title: "Villas",
      icon: TreePine,
      description: "Luxury independent villas with private gardens",
      features: [
        "Private space and car parking",
        "Good ventilation and natural lighting",
        "Functional kitchen and practical design",
      ],
      projects: ["Villa Serena", "Royal Villas", "Green Meadows"],
      priceRange: "Contact for Pricing",
      completedProjects: 2,
      image: "/independent-villas.jpg",
    },
    {
      id: "mini-apartments",
      title: "Mini Apartments",
      icon: Users,
      description: "Affordable housing solutions for young professionals",
      features: [
        "Affordable and budget-friendly homes",
        "Simple EMI payment options",
        "Good location with best connectivity",
      ],
      projects: ["Smart Homes", "Urban Nest", "City Square"],
      priceRange: "Contact for Pricing",
      completedProjects: 3,
      image: "/mini-apartments.jpg",
    },
    {
      id: "land-promotion",
      title: "Land Promoters",
      icon: Award,
      description: "Premium land development and promotion services",
      features: [
        "Clear documents and approved plots",
        "Help with bank loan process",
        "Registration and paperwork support",
      ],
      projects: ["Golden Valley", "Metro Lands", "Future City"],
      priceRange: "Contact for Pricing",
      completedProjects: 2,
      image: "/residential-projects.jpg",
    },
  ];

  const processSteps = [
    {
      step: "1",
      title: "Consultation",
      desc: "Free initial consultation to understand your requirements",
    },
    {
      step: "2",
      title: "Site Visit",
      desc: "Visit and inspect the proposed construction site",
    },
    {
      step: "3",
      title: "Design",
      desc: "Custom architectural design based on your preferences",
    },
    {
      step: "4",
      title: "Approval",
      desc: "Obtain necessary approvals and permits",
    },
    {
      step: "5",
      title: "Construction",
      desc: "Quality construction with regular progress updates",
    },
    {
      step: "6",
      title: "Handover",
      desc: "Final inspection and key handover ceremony",
    },
  ];

  const whyChooseUs = [
    {
      title: "25+ Years Experience",
      desc: "Two decades of construction excellence",
      icon: Award,
    },
    {
      title: "120+ Happy Families",
      desc: "Delivered dream homes across South India",
      icon: Users,
    },
    {
      title: "Zero Compromise Quality",
      desc: "Premium materials and skilled craftsmanship",
      icon: CheckCircle,
    },
    {
      title: "Timely Delivery",
      desc: "On-time project completion guarantee",
      icon: Star,
    },
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full">
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="relative page-content">
          {/* Navigation */}
          <header className="relative bg-transparent pt-3 xs:pt-4 sm:pt-6 lg:pt-8 xl:pt-12">
            <div className="relative">
              <nav className="flex items-center justify-between py-3 xs:py-4 mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
                <div className="nav-logo flex items-center space-x-3">
                  <img
                    src="/logo.jpg"
                    alt="Smart Builders Logo"
                    className="w-20 h-12 sm:w-24 sm:h-16 lg:w-32 lg:h-20 object-contain"
                  />
                  <div className="hidden sm:block">
                    <div className="text-xl lg:text-2xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica] tracking-[-0.50px]">
                      Smart Builders
                    </div>
                    <div className="text-sm lg:text-base text-[#6b6b6b] [font-family:'Poppins',Helvetica] mt-[-2px]">
                      & Developers
                    </div>
                  </div>
                </div>

                <NavigationMenu className="hidden lg:flex">
                  <NavigationMenuList className="flex gap-6 xl:gap-8">
                    {navItems.map((item, index) => (
                      <NavigationMenuItem key={index} className="nav-item">
                        <NavigationMenuLink
                          onClick={() => navigate(item.path)}
                          className={`[font-family:'Poppins',Helvetica] text-base xl:text-lg text-[#313131] hover:text-[#b48b2f] transition-colors cursor-pointer ${
                            item.active
                              ? "font-semibold relative after:absolute after:w-1 after:h-1 after:bg-[#b48b2f] after:rounded-sm after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2"
                              : "font-normal"
                          }`}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="hidden lg:flex items-center space-x-4">
                  <div className="flex items-center text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                    <MapPin className="w-4 h-4 mr-1 text-[#b48b2f]" />
                    SS colony, Madurai
                  </div>
                </div>

                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="lg:hidden p-2"
                      aria-label="Toggle menu"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 sm:w-96">
                    <nav className="flex flex-col space-y-6 mt-8">
                      {navItems.map((item, index) => (
                        <a
                          key={index}
                          href={item.path}
                          className={`text-lg [font-family:'Poppins',Helvetica] hover:text-[#b48b2f] transition-colors px-4 py-2 ${
                            item.active
                              ? "font-semibold text-[#b48b2f] border-l-2 border-[#b48b2f]"
                              : "font-normal text-[#313131]"
                          }`}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </nav>
            </div>
          </header>

          {/* Hero Section - Enhanced Responsive */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <div className="text-center mb-10 sm:mb-12 lg:mb-16 px-2 xs:px-4">
              <Badge className="bg-[#b48b2f]/10 text-[#b48b2f] border-[#b48b2f]/20 font-medium mb-3 sm:mb-4 text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
                Comprehensive Construction Services
              </Badge>
              <h1 className="section-title text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4 sm:mb-6 leading-tight">
                Building Your{" "}
                <span className="text-[#b48b2f]">Dream Spaces</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-xs sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed px-2">
                From residential complexes to luxury villas, we offer
                comprehensive construction services tailored to meet your unique
                requirements and budget.
              </p>
            </div>
          </section>

          {/* Services Tabs - Enhanced Mobile Responsive */}
          <section className="mb-12 sm:mb-16 lg:mb-20">
            <Tabs
              value={activeService}
              onValueChange={setActiveService}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mb-8 sm:mb-10 lg:mb-12 h-auto p-1 bg-gray-100 rounded-lg gap-1">
                {services.map((service) => (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="flex flex-col xs:flex-row lg:flex-col items-center justify-center p-2 xs:p-3 sm:p-4 data-[state=active]:bg-[#b48b2f] data-[state=active]:text-white rounded-md transition-all duration-200 min-h-[60px] xs:min-h-[70px] sm:min-h-[80px]"
                  >
                    <service.icon className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 mb-1 xs:mb-0 xs:mr-2 lg:mr-0 lg:mb-2 flex-shrink-0" />
                    <span className="text-xs xs:text-sm sm:text-sm font-medium [font-family:'Poppins',Helvetica] text-center xs:text-left lg:text-center leading-tight">
                      <span className="hidden xs:inline lg:hidden">
                        {service.title}
                      </span>
                      <span className="xs:hidden lg:inline">
                        {service.title}
                      </span>
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {services.map((service) => (
                <TabsContent
                  key={service.id}
                  value={service.id}
                  className="space-y-6 sm:space-y-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 items-start">
                    {/* Service Image - Enhanced Mobile */}
                    <div className="lg:col-span-1 order-1 lg:order-1">
                      <Card className="overflow-hidden border-none shadow-lg sm:shadow-xl">
                        <div
                          className="relative w-full h-48 xs:h-56 sm:h-64 lg:h-72 bg-cover bg-center bg-no-repeat"
                          style={{
                            backgroundImage: `url(${service.image})`,
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 text-white">
                            <Badge className="bg-[#b48b2f] text-white mb-1.5 xs:mb-2 text-xs xs:text-sm px-2 py-1">
                              {service.completedProjects}+ Projects
                            </Badge>
                            <h3 className="text-base xs:text-lg font-bold [font-family:'Poppins',Helvetica] leading-tight">
                              {service.title}
                            </h3>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Service Details */}
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                          <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                            {service.title}
                          </h2>
                          <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-6 leading-relaxed">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-4 bg-[#b48b2f]/5 rounded-lg">
                              <div className="text-2xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                                {service.completedProjects}+
                              </div>
                              <div className="text-sm text-[#6b6b6b]">
                                Completed Projects
                              </div>
                            </div>
                            <div className="text-center p-4 bg-[#b48b2f]/5 rounded-lg">
                              <div className="text-lg font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                                {service.priceRange}
                              </div>
                              <div className="text-sm text-[#6b6b6b]">
                                Pricing Details
                              </div>
                            </div>
                          </div>

                          <Button className="bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica] w-full lg:w-auto">
                            <Phone className="w-4 h-4 mr-2" />
                            Get Quote
                          </Button>
                        </div>

                        <div>
                          <Card className="overflow-hidden border-none shadow-lg h-full">
                            <CardHeader className="bg-gradient-to-r from-[#b48b2f] to-[#9d7829] text-white p-6">
                              <CardTitle className="text-xl font-bold [font-family:'Poppins',Helvetica] text-center">
                                What Makes Us Special
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                {service.features.map((feature, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start bg-gray-50 p-4 rounded-lg"
                                  >
                                    <CheckCircle className="w-5 h-5 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                                    <span className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] text-base leading-relaxed">
                                      {feature}
                                    </span>
                                  </div>
                                ))}
                              </div>

                              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                <p className="text-[#b48b2f] font-semibold [font-family:'Poppins',Helvetica] text-lg">
                                  {service.completedProjects}+ Completed
                                  Projects
                                </p>
                                <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] text-sm mt-1">
                                  Trusted by families across Madurai
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>

          {/* EMI Calculator Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Financial <span className="text-[#b48b2f]">Planning</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Calculate your EMI and plan your dream home investment with our
                instant calculator tailored for Madurai market rates.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <EMICalculatorForm />
            </div>
          </section>

          {/* Process Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Our <span className="text-[#b48b2f]">Process</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                A systematic approach ensuring quality delivery from concept to
                completion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {processSteps.map((step, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-[#b48b2f] rounded-full flex items-center justify-center">
                      <span className="text-2xl font-bold text-white [font-family:'Poppins',Helvetica]">
                        {step.step}
                      </span>
                    </div>
                    <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {step.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                  Why Choose{" "}
                  <span className="text-[#b48b2f]">Smart Builders</span>
                </h2>
                <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                  Experience the difference that quality, integrity, and
                  commitment make.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#b48b2f] rounded-full flex items-center justify-center">
                      <item.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-[#b48b2f] to-[#9d7829] border-none text-white p-8 lg:p-12 text-center">
              <CardContent className="p-0">
                <h2 className="text-2xl lg:text-3xl font-bold [font-family:'Poppins',Helvetica] mb-4">
                  Ready to Start Your Dream Project?
                </h2>
                <p className="text-lg [font-family:'Poppins',Helvetica] mb-8 opacity-90 max-w-2xl mx-auto">
                  Get a free consultation and quote for your construction
                  project. Our experts are ready to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate("/contact")}
                    className="bg-white text-[#b48b2f] hover:bg-gray-100 rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Us Now
                  </Button>
                  <Button
                    onClick={() => navigate("/about")}
                    variant="outline"
                    className="border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Learn More About Us
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};
