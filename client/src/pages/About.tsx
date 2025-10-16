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
  Award,
  Users,
  Calendar,
  Target,
  Heart,
  Shield,
  Star,
  Trophy,
} from "lucide-react";
import { Footer } from "@/components/Footer";
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
  animateCounterNumbers,
  animateBackgroundParallax,
  animateScrollIndicator,
  animateTextTypewriter,
  initMobileOptimizations,
} from "@/lib/animations";

export const About = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      initMobileOptimizations();
      animatePageTransition();
      animateNavigation();
      animateTextReveal(".section-title");
      animateTextTypewriter(".text-4xl");
      animateImageReveal();
      animateStaggeredCards();
      animateCounterNumbers();
      animateBackgroundParallax();
      animateScrollIndicator();
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
    { name: "About", path: "/about", active: true },
    { name: "Gallery", path: "/gallery", active: false },
    { name: "Services", path: "/services", active: false },
    { name: "Contact", path: "/contact", active: false },
  ];

  const milestones = [
    {
      year: "2000",
      title: "Company Foundation",
      desc: "Smart Builders & Developers established with vision to transform construction standards in Tamil Nadu",
    },
    {
      year: "2005",
      title: "International Projects",
      desc: "Successfully executed high-rise building projects in Sharjah, UAE, gaining valuable international experience",
    },
    {
      year: "2008",
      title: "Local Market Leadership",
      desc: "Became recognized as a trusted name in Madurai's residential construction sector",
    },
    {
      year: "2012",
      title: "Expanded Operations",
      desc: "Extended construction services across Tamil Nadu with multiple ongoing projects",
    },
    {
      year: "2016",
      title: "Technology Integration",
      desc: "Adopted modern construction practices, structural detailing, and quality management systems",
    },
    {
      year: "2020",
      title: "Diverse Portfolio",
      desc: "Expanded into luxury apartments, independent villas, and mini apartment developments",
    },
    {
      year: "2024",
      title: "Market Excellence",
      desc: "Achieved milestone of 50+ completed projects serving Many satisfied families",
    },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity",
      desc: "Transparent dealings with all stakeholders",
      color: "text-blue-600",
    },
    {
      icon: Heart,
      title: "Quality",
      desc: "Uncompromising standards in every project",
      color: "text-red-600",
    },
    {
      icon: Users,
      title: "Community",
      desc: "Building communities, not just buildings",
      color: "text-green-600",
    },
    {
      icon: Target,
      title: "Innovation",
      desc: "Embracing modern technology and methods",
      color: "text-purple-600",
    },
  ];

  const team = [
    {
      name: "M Rajan",
      role: "Founder & CEO",
      experience: "25+ years",
      expertise: "Structural Engineering & Project Management",
      achievements:
        "Led projects across Tamil Nadu with international experience in UAE",
      image: "/rajan.jpg",
      education: [
        { year: "1996", degree: "Diploma in Civil Engineering" },
        { year: "2000", degree: "Bachelor of Engineering (B.E)" },
      ],
      experience_details: [
        "25+ years of construction experience including 3 years abroad",
        "Worked as Site Engineer in Structural Detailing company",
        "Executed projects in Residential, Commercial & Apartment buildings",
        "Completed high-rise building projects in Sharjah, UAE",
        "Projects delivered across Tamil Nadu",
      ],
      memberships: [
        "Engineer Council of India (ECI - New Delhi)",
        "Madurai Corporation",
        "Local Planning Authority",
        "Association of Madurai Civil Engineers",
        "Junior Chamber International",
      ],
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

                {/* Desktop Navigation */}
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

                {/* Mobile Menu */}
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
                25 Years of Excellence
              </Badge>
              <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-6">
                Building <span className="text-[#b48b2f]">Dreams</span> Since
                2000
              </h1>
              <p className="text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-3xl mx-auto leading-relaxed">
                Smart Builders & Developers has grown from a small construction
                firm to become Tamil Nadu's most trusted real estate developer.
                For over two decades, we've been committed to building quality
                homes, creating innovative designs, and ensuring our customers
                are truly satisfied with every project we deliver.
              </p>
            </div>
          </section>

          {/* Story Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-6">
                  Our <span className="text-[#b48b2f]">Story</span>
                </h2>
                <div className="space-y-4 text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-relaxed">
                  <p>
                    Smart Builders & Real Estate Developers was{" "}
                    <span className="font-bold text-[#313131]">
                      founded in 2000
                    </span>{" "}
                    with a simple yet powerful vision: to create{" "}
                    <span className="font-bold text-[#313131]">
                      quality homes
                    </span>{" "}
                    that{" "}
                    <span className="font-bold text-[#313131]">
                      families can cherish for generations
                    </span>
                    . Starting as a small construction firm, we've grown to
                    become one of{" "}
                    <span className="font-bold text-[#313131]">
                      Tamil Nadu's most trusted names
                    </span>{" "}
                    in real estate development.
                  </p>
                  <p>
                    What sets Smart Builders & Real Estate Developers apart is
                    our complete approach to homebuilding. We handle everything
                    from planning your dream home to handing over the keys, and
                    we're still there for you even after you move in. Our team
                    brings together expertise in engineering, design, and
                    project management to ensure every home we build is solid,
                    beautiful, and built to last.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="floating-element absolute -top-4 -right-4 w-24 h-24 bg-[#b48b2f]/10 rounded-full"></div>
                <div className="floating-element absolute -bottom-4 -left-4 w-16 h-16 bg-[#b48b2f]/20 rounded-full"></div>
                <img
                  src="/figmaAssets/mask-group.png"
                  alt="Smart Builders construction site"
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Our <span className="text-[#b48b2f]">Values</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto whitespace-nowrap">
                The principles that guide every decision we make and every
                project we deliver.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center group"
                >
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <value.icon className={`w-8 h-8 ${value.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">
                      {value.title}
                    </CardTitle>
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {value.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* What Sets Us Apart */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                  What Sets <span className="text-[#b48b2f]">Us Apart</span>
                </h2>
                <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                  Discover the unique advantages that make Smart Builders your
                  trusted construction partner in Madurai.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "25+ Years Expertise",
                    description:
                      "Quarter-century of proven construction excellence",
                    icon: Trophy,
                    highlight: "Since 1999",
                  },
                  {
                    title: "100% Quality Assurance",
                    description:
                      "Every project backed by our quality guarantee",
                    icon: Shield,
                    highlight: "Zero Compromise",
                  },
                  {
                    title: "On-Time Delivery",
                    description: "Committed to meeting every project deadline",
                    icon: Target,
                    highlight: "Always Punctual",
                  },
                  {
                    title: "Customer-First Approach",
                    description:
                      "Your satisfaction is our ultimate success metric",
                    icon: Heart,
                    highlight: "Happy Clients",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#b48b2f] rounded-full flex items-center justify-center group-hover:bg-[#9d7829] transition-colors">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-[#b48b2f] font-semibold mb-2 text-sm">
                      {feature.highlight}
                    </p>
                    <p className="text-sm text-[#6b6b6b] leading-relaxed">
                      {feature.description}
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
                  Ready to Build Your Dream Home?
                </h2>
                <p className="text-lg [font-family:'Poppins',Helvetica] mb-8 opacity-90 max-w-2xl mx-auto">
                  Join over 1,000 satisfied families who have made Smart
                  Builders & Developers their trusted construction partner under
                  M Rajan's expert leadership.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => navigate("/contact")}
                    className="bg-white text-[#b48b2f] hover:bg-gray-100 rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                  <Button
                    onClick={() => navigate("/services")}
                    variant="outline"
                    className="border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    View Our Services
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
