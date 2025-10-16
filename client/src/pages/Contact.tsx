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
  MessageSquare,
  Building,
  Users,
  Calendar,
} from "lucide-react";
import { Footer } from "@/components/Footer";
import { useNavigation } from "@/lib/navigation";
import {
  ContactForm,
  QuickInquiryForm,
  SiteVisitForm,
} from "@/components/forms";
import { useGSAP } from "@/hooks/useGSAP";
import {
  animatePageTransition,
  animateNavigation,
  animateCardsOnScroll,
  setupButtonHoverAnimations,
  animateFloatingElements,
  setupParallaxImages,
  animateFormEntrance,
  animateImageReveal,
  animateStaggeredCards,
  animateBackgroundParallax,
  animateScrollIndicator,
  initMobileOptimizations,
} from "@/lib/animations";

export const Contact = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      // Initialize mobile optimizations first
      initMobileOptimizations();

      // Instant execution - no delays
      animatePageTransition();
      animateNavigation();

      // Contact-specific animations
      animateFormEntrance(".contact-form");
      animateImageReveal();
      animateStaggeredCards();
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
    { name: "Services", path: "/services", active: false },
    { name: "Contact", path: "/contact", active: true },
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 96004 52274"],
      desc: "Available Numbers",
      color: "text-green-600",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@smartbuilders.com", "sales@smartbuilders.com"],
      desc: "Get response as soon as possible",
      color: "text-blue-600",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: [
        "23/72, Ramnagar, 3rd Street, Bypass Rd",
        "S S Colony, Madurai, Tamil Nadu 625016",
      ],
      desc: "Mon-Sat: 9AM-6PM",
      color: "text-purple-600",
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Saturday: 9:00 AM - 6:00 PM", ""],
      desc: "Extended hours during project phases",
      color: "text-orange-600",
    },
  ];

  const officeLocations = [
    {
      city: "Madurai",
      address: `23/72, Ramnagar 3rd Street, S S Colony, Bypass Rd, Madurai -
          625016`,
      phone: "+91 96004 52274",
      email: "madurai@smartbuilders.com",
      type: "Head Office",
    },
    {
      city: "Coimbatore",
      address: "28, Lakshmi Nagar, Near KM school, Irugur, COIMBATORE - 26",
      phone: "+91 96004 52274",
      email: "coimbatore@smartbuilders.com",
      type: "Branch Office",
    },
  ];

  const faqs = [
    {
      question: "What types of construction projects do you handle?",
      answer:
        "We specialize in residential projects including apartments, villas, mini apartments, and land development. We also offer commercial construction services.",
    },
    {
      question: "How long does a typical construction project take?",
      answer:
        "Project timelines vary based on size and complexity. Apartments typically take 18-24 months, while villas can take 12-18 months from foundation to handover.",
    },
    {
      question: "Do you provide home loan assistance?",
      answer:
        "Yes, we have partnerships with leading banks and can assist you with home loan processing, documentation, and getting the best interest rates.",
    },
    {
      question: "What is your warranty policy?",
      answer:
        "We provide a comprehensive 5-year structural warranty and 1-year warranty on electrical and plumbing fixtures. Extended warranty options are also available.",
    },
    {
      question: "Can I customize the design of my home?",
      answer:
        "Absolutely! We offer complete customization services. Our architects will work with you to create a design that perfectly matches your vision and requirements.",
    },
    {
      question: "Do you have ready-to-move-in properties?",
      answer:
        "Yes, we have several ready-to-move-in properties across different price ranges. Contact us for current availability and site visits.",
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

          {/* Hero Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <Badge className="bg-[#b48b2f]/10 text-[#b48b2f] border-[#b48b2f]/20 font-medium mb-4">
                Get In Touch
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-6">
                Let's Build Your{" "}
                <span className="text-[#b48b2f]">Dream Together</span>
              </h1>
              <p className="text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-3xl mx-auto leading-relaxed">
                Ready to start your construction journey? Our expert team is
                here to guide you every step of the way. Contact us for free
                consultation and personalized solutions.
              </p>
            </div>
          </section>

          {/* Contact Information Cards */}
          <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-gray-100 flex items-center justify-center`}
                    >
                      <info.icon
                        className={`w-6 h-6 sm:w-8 sm:h-8 ${info.color}`}
                      />
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2 sm:mb-3">
                      {info.title}
                    </CardTitle>
                    <div className="space-y-1 mb-2 sm:mb-3">
                      {info.details.map((detail, idx) => (
                        <div
                          key={idx}
                          className="text-sm sm:text-base text-[#6b6b6b] [font-family:'Poppins',Helvetica] font-medium break-words"
                        >
                          {detail}
                        </div>
                      ))}
                    </div>
                    <CardDescription className="text-xs sm:text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {info.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Contact Forms Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-3 sm:mb-4">
                Send Us a <span className="text-[#b48b2f]">Message</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto px-4">
                Choose the most convenient way to reach us. We'll respond
                promptly to all inquiries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
              {/* Quick Inquiry */}
              <div className="contact-form w-full">
                <QuickInquiryForm
                  title="Quick Inquiry"
                  subtitle="Get a callback within 2 hours"
                />
              </div>

              {/* Detailed Contact */}
              <div className="contact-form w-full">
                <ContactForm
                  title="Detailed Inquiry"
                  subtitle="Tell us about your project requirements"
                />
              </div>
            </div>
          </section>

          {/* Interactive Map & Office Location */}
          <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-3 sm:mb-4">
                Visit Our <span className="text-[#b48b2f]">Office</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto px-4">
                Located in the heart of Madurai, we're easily accessible and
                ready to serve you.
              </p>
            </div>

            {/* Interactive Map */}
            <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
              <Card className="overflow-hidden border-none shadow-2xl">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="w-full h-[300px] sm:h-[400px] lg:h-[450px] bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.764867635944!2d78.14379481!3d9.9312328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b00c582b1189633%3A0x559e0c50c3c4b8a5!2s23%2F72%2C%203rd%20St%2C%20Ramnagar%2C%20S%20S%20Colony%2C%20Madurai%2C%20Tamil%20Nadu%20625016!5e0!3m2!1sen!2sin!4v1735293042000"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Smart Builders & Developers Office Location"
                        className="w-full h-full"
                      />
                    </div>

                    {/* Map Overlay Info */}
                    <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-lg max-w-[280px] sm:max-w-xs">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-[#b48b2f] rounded-full mr-2 animate-pulse"></div>
                        <span className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] text-xs sm:text-sm">
                          Smart Builders & Developers
                        </span>
                      </div>
                      <p className="text-xs text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-2">
                        23/72, Ramnagar, 3rd Street
                        <br />
                        Bypass Rd, S S Colony
                        <br />
                        Madurai, Tamil Nadu 625016
                      </p>
                      <div className="flex items-center text-xs text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                        Open Now • 9 AM - 6 PM
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 flex gap-2">
                      <Button
                        size="sm"
                        className="bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[40px_5px_40px_5px] font-medium [font-family:'Poppins',Helvetica] shadow-lg text-xs"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=23/72,+Ramnagar,+3rd+Street,+Bypass+Rd,+S+S+Colony,+Madurai,+Tamil+Nadu+625016`,
                            "_blank",
                          )
                        }
                      >
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Directions
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] font-medium [font-family:'Poppins',Helvetica] shadow-lg text-xs"
                        onClick={() =>
                          window.open(`tel:+919443221100`, "_self")
                        }
                      >
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:gap-8 max-w-lg mx-auto">
              {officeLocations.map((office, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <CardHeader className="bg-gradient-to-r from-[#b48b2f] to-[#9d7829] text-white p-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold [font-family:'Poppins',Helvetica]">
                        {office.city}
                      </CardTitle>
                      <Badge className="bg-white/20 text-white">
                        {office.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <MapPin className="w-5 h-5 text-[#b48b2f] mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-[#313131] [font-family:'Poppins',Helvetica]">
                            Address
                          </div>
                          <div className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                            {office.address}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 text-[#b48b2f] mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-[#313131] [font-family:'Poppins',Helvetica]">
                            Phone
                          </div>
                          <div className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                            {office.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 text-[#b48b2f] mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-[#313131] [font-family:'Poppins',Helvetica]">
                            Email
                          </div>
                          <div className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                            {office.email}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      <Button
                        className="bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[40px_5px_40px_5px] font-medium [font-family:'Poppins',Helvetica]"
                        onClick={() =>
                          window.open(
                            `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(office.address)}`,
                            "_blank",
                          )
                        }
                      >
                        <MapPin className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] font-medium [font-family:'Poppins',Helvetica]"
                        onClick={() =>
                          window.open(`tel:${office.phone}`, "_self")
                        }
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12 sm:mb-16 lg:mb-20 px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-3 sm:mb-4">
                Frequently Asked{" "}
                <span className="text-[#b48b2f]">Questions</span>
              </h2>
              <p className="text-base sm:text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto px-4">
                Find answers to common questions about our services and
                processes.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="space-y-4 sm:space-y-6">
                {faqs.map((faq, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-none shadow-lg"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <h3 className="text-base sm:text-lg font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2 sm:mb-3 flex items-start">
                        <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-[#b48b2f] mr-2 sm:mr-3 mt-1 flex-shrink-0" />
                        <span className="min-w-0">{faq.question}</span>
                      </h3>
                      <p className="text-sm sm:text-base text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-relaxed ml-6 sm:ml-8">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};
