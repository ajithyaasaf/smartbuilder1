import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Clock,
  Star,
  Users,
  Building,
  Award,
  Menu,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { SEOHead, getOrganizationSchema } from "@/components/SEOHead";
import { useNavigation } from "@/lib/navigation";
import { ContactForm, QuickInquiryForm } from "@/components/forms";
import { useGSAP } from "@/hooks/useGSAP";
import {
  animateHeroEntrance,
  animateNavigation,
  animateCardsOnScroll,
  animateStatsCounter,
  setupButtonHoverAnimations,
  animateFloatingElements,
  setupParallaxImages,
  animateMobileMenu,
  animateImageReveal,
  animateStaggeredCards,
  animateCounterNumbers,
  animateBackgroundParallax,
  animateScrollIndicator,
  initMobileOptimizations,
} from "@/lib/animations";

export const Home = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      // Initialize mobile optimizations first
      initMobileOptimizations();

      // Instant execution - no delays
      animateHeroEntrance();
      animateNavigation();

      // Only essential smooth effects
      animateImageReveal();
      animateStaggeredCards();

      // Essential interactions
      setupButtonHoverAnimations();
    } catch (error) {
      console.debug("Animation initialization error:", error);
    }
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      animateMobileMenu(true);
    }
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: "Home", path: "/", active: true },
    { name: "About", path: "/about", active: false },
    { name: "Gallery", path: "/gallery", active: false },
    { name: "Services", path: "/services", active: false },
    { name: "Contact", path: "/contact", active: false },
  ];

  const stats = [
    {
      icon: Building,
      value: "60+",
      label: "Projects Completed",
      color: "text-blue-600",
    },
    {
      icon: Users,
      value: "95%",
      label: "Happy Families",
      color: "text-green-600",
    },
    {
      icon: Award,
      value: "25+",
      label: "Years Experience",
      color: "text-purple-600",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Customer Rating",
      color: "text-orange-600",
    },
  ];

  const services = [
    {
      title: "Residential Projects",
      description:
        "Premium homes designed for modern living with world-class amenities",
      image: "/residential-projects.jpg",
      badge: "Popular",
    },
    {
      title: "Luxury Apartments",
      description:
        "Spacious apartments with contemporary designs in prime locations",
      image: "/luxury-apartments.jpg",
      badge: "Premium",
    },
    {
      title: "Independent Villas",
      description:
        "Elegant villas with private gardens and modern architecture",
      image: "/independent-villas.jpg",
      badge: "Exclusive",
    },
    {
      title: "Mini Apartments",
      description:
        "Compact yet comfortable living spaces for young professionals",
      image: "/mini-apartments.jpg",
      badge: "Affordable",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Villa Owner",
      content:
        "Smart Builders delivered our dream villa on time with exceptional quality. The attention to detail is remarkable.",
      rating: 5,
      location: "Ramnagar, Madurai",
    },
    {
      name: "Priya Selvam",
      role: "Apartment Owner",
      content:
        "Outstanding construction quality and professional service. Our apartment exceeded all expectations.",
      rating: 5,
      location: "Samayanallur, Madurai",
    },
    {
      name: "Murugan Rajan",
      role: "Land Developer",
      content:
        "Excellent land promotion services. They helped us maximize our property investment returns.",
      rating: 5,
      location: "Thiruparankundram, Madurai",
    },
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full">
      <SEOHead
        title="Premier Construction Company in Madurai"
        description="Smart Builders & Developers - Leading construction company in Madurai with 22+ years experience. Specializing in residential projects, apartments, villas, and land development. 500+ projects completed."
        keywords="construction company Madurai, builders Madurai, residential projects, apartments, villas, real estate Madurai, Tamil Nadu builders"
        canonicalUrl="https://smartbuilders.replit.app/"
        schema={getOrganizationSchema()}
      />
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative page-content">
          {/* Background decorative elements */}
          <img
            className="absolute w-48 h-48 sm:w-80 sm:h-80 lg:w-[632px] lg:h-[608px] top-96 sm:top-80 lg:top-[565px] left-0 opacity-10 lg:opacity-20 -z-10 floating-element parallax-image"
            alt="Vector"
            src="/figmaAssets/vector-11.svg"
          />

          <header className="relative bg-transparent pt-4 sm:pt-8 lg:pt-12">
            <div className="relative">
              {/* Navigation */}
              <nav className="flex items-center justify-between py-4 mb-8 lg:mb-16">
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

                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex">
                  <NavigationMenuList className="flex gap-6 xl:gap-8">
                    {navItems.slice(0, 6).map((item, index) => (
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

                {/* Mobile Menu - Enhanced Touch Friendly */}
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="lg:hidden p-2 min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="Toggle navigation menu"
                    >
                      <Menu className="w-5 h-5 xs:w-6 xs:h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[280px] xs:w-[320px] sm:w-[380px] p-0"
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div className="p-4 xs:p-6 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <img
                            src="/logo.jpg"
                            alt="Smart Builders Logo"
                            className="w-10 h-6 xs:w-12 xs:h-8 object-contain"
                          />
                          <div>
                            <div className="text-sm xs:text-base font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                              Smart Builders
                            </div>
                            <div className="text-xs text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                              & Developers
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Navigation */}
                      <nav className="flex-1 p-4 xs:p-6">
                        <div className="flex flex-col space-y-1">
                          {navItems.map((item, index) => (
                            <a
                              key={index}
                              href={item.path}
                              className={`flex items-center text-base xs:text-lg [font-family:'Poppins',Helvetica] hover:text-[#b48b2f] hover:bg-[#b48b2f]/5 transition-all duration-200 px-4 py-3 xs:py-4 rounded-lg min-h-[44px] ${
                                item.active
                                  ? "font-semibold text-[#b48b2f] bg-[#b48b2f]/10 border-l-4 border-[#b48b2f]"
                                  : "font-normal text-[#313131]"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </nav>

                      {/* Footer */}
                      <div className="p-4 xs:p-6 border-t border-gray-100 bg-gray-50">
                        <div className="flex flex-col space-y-2 text-xs xs:text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                          <div className="flex items-center">
                            <MapPin className="w-3.5 h-3.5 mr-2 text-[#b48b2f] flex-shrink-0" />
                            <span>Ramnagar, Madurai</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-3.5 h-3.5 mr-2 text-[#b48b2f] flex-shrink-0" />
                            <span>+91 98765 43210</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </nav>

              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center min-h-[50vh] sm:min-h-[60vh] lg:min-h-[70vh] xl:min-h-[75vh]">
                {/* Left Content */}
                <div className="order-2 lg:order-1 space-y-4 sm:space-y-6 lg:space-y-8 pl-0 pr-4 sm:px-6 lg:px-0">
                  <div className="space-y-3 sm:space-y-4">
                    <Badge className="bg-[#b48b2f]/10 text-[#b48b2f] border-[#b48b2f]/20 font-medium text-xs sm:text-sm px-3 py-1.5 sm:px-4 sm:py-2">
                      #1 Builders in Madurai
                    </Badge>
                    <h1 className="hero-heading text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] 2xl:text-[72px] font-bold [font-family:'Poppins',Helvetica] leading-tight sm:leading-tight lg:leading-[64px] xl:leading-[72px] tracking-[-0.5px] sm:tracking-[-1px] lg:tracking-[-1.64px] max-w-full overflow-hidden">
                      <span className="text-[#b48b2f]">Building</span>
                      <span className="text-[#313131]"> Dreams,</span>
                      <br />
                      <span className="text-[#313131]">Creating </span>
                      <span className="text-[#b48b2f]">Lifestyles</span>
                      <span className="text-[#313131]">.</span>
                    </h1>
                    <p className="hero-subtext text-base sm:text-lg md:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-6 sm:leading-7 md:leading-8 max-w-full sm:max-w-lg lg:max-w-xl">
                      Premium residential projects in Madurai with 25+ years of
                      excellence in construction and development.
                    </p>
                  </div>

                  {/* CTA Buttons - Enhanced Responsive */}
                  <div className="hero-buttons flex flex-col xs:flex-row gap-3 sm:gap-4 w-full">
                    <Button
                      onClick={() => navigate("/services")}
                      className="animate-button w-full xs:flex-1 sm:w-auto sm:flex-none px-6 sm:px-8 py-3 sm:py-4 h-auto bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] shadow-lg hover:shadow-xl text-white text-sm sm:text-base lg:text-[17px] font-medium [font-family:'Poppins',Helvetica] tracking-[-0.50px] transition-all duration-300 min-h-[44px] sm:min-h-[48px] lg:min-h-[52px]"
                    >
                      View Projects
                    </Button>
                    <Button
                      onClick={() => navigate("/contact")}
                      variant="outline"
                      className="animate-button w-full xs:flex-1 sm:w-auto sm:flex-none px-6 sm:px-8 py-3 sm:py-4 h-auto rounded-[40px_5px_40px_5px] border-2 border-[#b48b2f] hover:bg-[#b48b2f] hover:text-white text-[#b48b2f] text-sm sm:text-base lg:text-[17px] font-medium [font-family:'Poppins',Helvetica] tracking-[-0.50px] shadow-lg hover:shadow-xl transition-all duration-300 min-h-[44px] sm:min-h-[48px] lg:min-h-[52px]"
                    >
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2" />
                      <span className="hidden xs:inline">Call Now</span>
                      <span className="xs:hidden">Call</span>
                    </Button>
                  </div>

                  {/* Contact Info - Enhanced Mobile */}
                  <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 text-xs sm:text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                    <div className="flex items-center justify-center xs:justify-start">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-[#b48b2f] flex-shrink-0" />
                      <span className="whitespace-nowrap">
                        Mon-Sat: 9AM-6PM
                      </span>
                    </div>
                    <div className="flex items-center justify-center xs:justify-start">
                      <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 text-[#b48b2f] flex-shrink-0" />
                      <span className="whitespace-nowrap">+91 98765 43210</span>
                    </div>
                  </div>
                </div>

                {/* Right side with image - Enhanced Responsive */}
                <div className="hero-image order-1 lg:order-2 relative h-[250px] xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] px-4 sm:px-6 lg:px-0">
                  {/* Responsive floating elements */}
                  <div className="floating-element absolute top-2 xs:top-4 sm:top-6 lg:top-[97px] left-2 xs:left-4 sm:left-6 lg:left-0 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[180px] lg:h-[160px] xl:w-[238px] xl:h-[213px] bg-[#c9e7ff] rounded-[50px_3px_3px_3px] sm:rounded-[80px_4px_4px_4px] lg:rounded-[106.5px_5px_5px_5px] opacity-30 sm:opacity-40" />
                  <div className="floating-element absolute bottom-2 xs:bottom-4 sm:bottom-6 lg:bottom-[50px] right-2 xs:right-4 sm:right-6 lg:right-0 w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[180px] lg:h-[160px] xl:w-[238px] xl:h-[213px] bg-[#c9e7ff] rounded-[50px_3px_3px_3px] sm:rounded-[80px_4px_4px_4px] lg:rounded-[106.5px_5px_5px_5px] opacity-30 sm:opacity-40 rotate-180" />

                  <div className="absolute inset-1 xs:inset-2 sm:inset-4 md:inset-6 lg:inset-8 xl:inset-12 flex items-center justify-center bg-white/5 rounded-2xl sm:rounded-3xl backdrop-blur-sm">
                    <img
                      className="parallax-image w-full h-full object-contain drop-shadow-xl"
                      alt="Smart Builders premium construction projects in Madurai"
                      src="/figmaAssets/mask-group.png"
                      loading="eager"
                    />
                  </div>

                  {/* Mobile-optimized badge overlay */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 lg:hidden">
                    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2.5 sm:p-3 shadow-lg border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs sm:text-sm font-semibold text-[#313131]">
                            Premium Quality
                          </div>
                          <div className="text-xs text-[#6b6b6b]">Since 2000</div>
                        </div>
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#b48b2f] rounded-full flex items-center justify-center">
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Statistics Section - Enhanced Mobile First */}
          <section
            className="hero-stats stats-section mt-12 sm:mt-16 lg:mt-24 mb-12 sm:mb-16 px-4 sm:px-6 lg:px-0"
            aria-label="Our achievements"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center p-3 sm:p-4 md:p-5 lg:p-6 hover:shadow-lg hover:scale-105 transition-all duration-300 border-none bg-gradient-to-b from-white to-neutral-50/80 shadow-sm"
                >
                  <CardContent className="p-0">
                    <stat.icon
                      className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 mx-auto mb-2 sm:mb-3 md:mb-4 ${stat.color} transition-transform duration-300 hover:scale-110`}
                    />
                    <div className="stat-number text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[40px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-1 sm:mb-2 leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm lg:text-base text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-tight px-1">
                      <span className="block sm:hidden">
                        {stat.label.split(" ")[0]}
                      </span>
                      <span className="hidden sm:block">{stat.label}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Services Section - Enhanced Mobile First */}
          <section
            className="mt-12 sm:mt-16 lg:mt-24 mb-12 sm:mb-16 px-4 sm:px-6 lg:px-0"
            aria-label="Our services"
          >
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl xl:text-[48px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-3 sm:mb-4">
                Our <span className="text-[#b48b2f]">Specialties</span>
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-xs sm:max-w-2xl mx-auto px-2">
                From luxury villas to affordable mini apartments, we create
                homes that reflect your lifestyle and aspirations.
              </p>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-5 lg:gap-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="service-card group hover:shadow-xl transition-all duration-300 border-none overflow-hidden flex flex-col"
                >
                  <div
                    className="relative w-full h-36 xs:h-40 sm:h-44 lg:h-48 overflow-hidden bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{
                      backgroundImage: `url(${service.image})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <Badge className="floating-element absolute top-2 xs:top-3 sm:top-4 right-2 xs:right-3 sm:right-4 bg-[#b48b2f] text-white shadow-lg z-10 text-xs xs:text-sm px-2 py-1">
                      {service.badge}
                    </Badge>
                  </div>
                  <CardContent className="p-3 xs:p-4 flex-1 flex flex-col">
                    <CardTitle className="text-sm xs:text-base sm:text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-1.5 xs:mb-2 leading-tight">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-5 text-xs xs:text-sm flex-1 line-clamp-3">
                      {service.description}
                    </CardDescription>
                    <Button
                      variant="ghost"
                      className="animate-button w-full mt-2 xs:mt-3 text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white transition-colors text-xs xs:text-sm py-2 min-h-[36px] xs:min-h-[40px]"
                      onClick={() => navigate("/services")}
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section
            className="mt-16 lg:mt-24 mb-16"
            aria-label="Customer testimonials"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                What Our <span className="text-[#b48b2f]">Customers Say</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Real stories from real customers who trusted us with their dream
                homes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card
                  key={index}
                  className="testimonial-card p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] italic mb-4 leading-6">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica]">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                        {testimonial.role}
                      </div>
                      <div className="text-xs text-[#b48b2f] [font-family:'Poppins',Helvetica] flex items-center mt-1">
                        <MapPin className="w-3 h-3 mr-1" />
                        {testimonial.location}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Forms Section */}
          <section className="mt-16 lg:mt-24 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Get in <span className="text-[#b48b2f]">Touch</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Ready to start your dream project? Contact our experts for
                personalized guidance and free consultation.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Inquiry Form */}
              <QuickInquiryForm />

              {/* Contact Form */}
              <ContactForm />
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};
