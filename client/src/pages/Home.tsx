import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Clock, Star, Users, Building, Award } from "lucide-react";
import { Footer } from "@/components/Footer";
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
  animateMobileMenu
} from "@/lib/animations";

export const Home = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      setTimeout(() => {
        animateHeroEntrance();
        animateNavigation();
        animateCardsOnScroll(".overflow-hidden");
        animateStatsCounter(".text-3xl");
        setupButtonHoverAnimations();
        animateFloatingElements();
        setupParallaxImages();
      }, 50);
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
    { name: "Services", path: "/services", active: false },
    { name: "Contact", path: "/contact", active: false },
    { name: "Gallery", path: "/gallery", active: false }
  ];

  const stats = [
    { icon: Building, value: "500+", label: "Projects Completed", color: "text-blue-600" },
    { icon: Users, value: "2000+", label: "Happy Families", color: "text-green-600" },
    { icon: Award, value: "25+", label: "Years Experience", color: "text-purple-600" },
    { icon: Star, value: "4.9", label: "Customer Rating", color: "text-orange-600" },
  ];

  const services = [
    {
      title: "Residential Projects",
      description: "Premium homes designed for modern living with world-class amenities",
      image: "/figmaAssets/residential.jpg",
      badge: "Popular"
    },
    {
      title: "Luxury Apartments",
      description: "Spacious apartments with contemporary designs in prime locations",
      image: "/figmaAssets/apartments.jpg",
      badge: "Premium"
    },
    {
      title: "Independent Villas",
      description: "Elegant villas with private gardens and modern architecture",
      image: "/figmaAssets/villas.jpg",
      badge: "Exclusive"
    },
    {
      title: "Mini Apartments",
      description: "Compact yet comfortable living spaces for young professionals",
      image: "/figmaAssets/mini-apt.jpg",
      badge: "Affordable"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Villa Owner",
      content: "Smart Builders delivered our dream villa on time with exceptional quality. The attention to detail is remarkable.",
      rating: 5,
      location: "Anna Nagar, Madurai"
    },
    {
      name: "Priya Selvam",
      role: "Apartment Owner",
      content: "Outstanding construction quality and professional service. Our apartment exceeded all expectations.",
      rating: 5,
      location: "Samayanallur, Madurai"
    },
    {
      name: "Murugan Rajan",
      role: "Land Developer",
      content: "Excellent land promotion services. They helped us maximize our property investment returns.",
      rating: 5,
      location: "Thiruparankundram, Madurai"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full">
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
                    alt="Company Logo" 
                    className="w-20 h-12 sm:w-24 sm:h-16 lg:w-32 lg:h-20 object-contain"
                  />

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
                    Madurai, Tamil Nadu
                  </div>
                </div>

                {/* Mobile Menu */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" className="lg:hidden p-2" aria-label="Toggle menu">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
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
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                    </nav>
                  </SheetContent>
                </Sheet>
              </nav>

              {/* Hero Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] lg:min-h-[70vh]">
                {/* Left Content */}
                <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
                  <div className="space-y-4">
                    <Badge className="bg-[#b48b2f]/10 text-[#b48b2f] border-[#b48b2f]/20 font-medium">
                      #1 Builders in Madurai
                    </Badge>
                    <h1 className="hero-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold [font-family:'Poppins',Helvetica] leading-tight lg:leading-[64px] tracking-[-1.64px]">
                      <span className="text-[#b48b2f]">Building</span>
                      <span className="text-[#313131]"> Dreams,</span>
                      <br />
                      <span className="text-[#313131]">Creating</span>
                      <br />
                      <span className="text-[#b48b2f]">Lifestyles</span>
                      <span className="text-[#313131]">.</span>
                    </h1>
                    <p className="hero-subtext text-lg sm:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-7 max-w-lg">
                      Premium residential projects in Madurai with 25+ years of excellence in construction and development.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-3">
                    <Button 
                      onClick={() => navigate('/services')}
                      className="animate-button w-full sm:w-auto px-8 py-4 h-auto bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] shadow-lg text-white text-base lg:text-[17px] font-medium [font-family:'Poppins',Helvetica] tracking-[-0.50px]"
                    >
                      View Projects
                    </Button>
                    <Button
                      onClick={() => navigate('/contact')}
                      variant="outline"
                      className="animate-button w-full sm:w-auto px-8 py-4 h-auto rounded-[40px_5px_40px_5px] border-2 border-[#b48b2f] hover:bg-[#b48b2f] hover:text-white text-[#b48b2f] text-base lg:text-[17px] font-medium [font-family:'Poppins',Helvetica] tracking-[-0.50px] shadow-lg"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Now
                    </Button>
                  </div>

                  {/* Contact Info */}
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-[#b48b2f]" />
                      Mon-Sat: 9AM-6PM
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-[#b48b2f]" />
                      +91 98765 43210
                    </div>
                  </div>
                </div>

                {/* Right side with image */}
                <div className="hero-image order-1 lg:order-2 relative h-64 sm:h-80 md:h-96 lg:h-[600px] xl:h-[700px]">
                  <div className="floating-element absolute top-4 sm:top-8 lg:top-[97px] left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[238px] lg:h-[213px] bg-[#c9e7ff] rounded-[106.5px_5px_5px_5px] opacity-40" />
                  <div className="floating-element absolute bottom-4 sm:bottom-8 lg:bottom-[50px] right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[238px] lg:h-[213px] bg-[#c9e7ff] rounded-[106.5px_5px_5px_5px] opacity-40 rotate-180" />
                  
                  <div className="absolute inset-2 sm:inset-4 md:inset-6 lg:inset-12 flex items-center justify-center">
                    <img
                      className="parallax-image w-full h-full object-contain"
                      alt="Smart Builders premium construction projects in Madurai"
                      src="/figmaAssets/mask-group.png"
                    />
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Statistics Section */}
          <section className="hero-stats stats-section mt-16 lg:mt-24 mb-16" aria-label="Our achievements">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                    <div className="stat-number text-2xl lg:text-3xl xl:text-[40px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm lg:text-base text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {stat.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Services Section */}
          <section className="mt-16 lg:mt-24 mb-16" aria-label="Our services">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Our <span className="text-[#b48b2f]">Specialties</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                From luxury villas to affordable mini apartments, we create homes that reflect your lifestyle and aspirations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="service-card group hover:shadow-xl transition-all duration-300 border-none overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-[#b48b2f]/10 to-[#b48b2f]/20">
                    <Badge className="floating-element absolute top-4 right-4 bg-[#b48b2f] text-white">
                      {service.badge}
                    </Badge>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building className="w-16 h-16 text-[#b48b2f] opacity-60" />
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <CardTitle className="text-xl font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-6">
                      {service.description}
                    </CardDescription>
                    <Button 
                      variant="ghost" 
                      className="animate-button w-full mt-4 text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white transition-colors"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="mt-16 lg:mt-24 mb-16" aria-label="Customer testimonials">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                What Our <span className="text-[#b48b2f]">Customers Say</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Real stories from real customers who trusted us with their dream homes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="testimonial-card p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
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
                Ready to start your dream project? Contact our experts for personalized guidance and free consultation.
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