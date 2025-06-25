import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Award, Users, Calendar, Target, Heart, Shield, Star } from "lucide-react";
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
  animateTextReveal
} from "@/lib/animations";

export const About = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      setTimeout(() => {
        animatePageTransition();
        animateNavigation();
        animateCardsOnScroll(".overflow-hidden");
        animateTextReveal(".section-title");
        setupButtonHoverAnimations();
        animateFloatingElements();
        setupParallaxImages();
      }, 100);
    } catch (error) {
      console.debug("Animation initialization error:", error);
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/", active: false },
    { name: "About", path: "/about", active: true },
    { name: "Services", path: "/services", active: false },
    { name: "Contact", path: "/contact", active: false },
    { name: "Gallery", path: "/gallery", active: false }
  ];

  const milestones = [
    { year: "1999", title: "Foundation", desc: "Started with a vision to transform Madurai's skyline" },
    { year: "2005", title: "First Major Project", desc: "Completed our landmark residential complex" },
    { year: "2010", title: "Recognition", desc: "Awarded 'Best Builder in Tamil Nadu'" },
    { year: "2015", title: "Expansion", desc: "Extended operations across South India" },
    { year: "2020", title: "Innovation", desc: "Introduced eco-friendly construction practices" },
    { year: "2024", title: "Excellence", desc: "Delivered 50+ premium projects with 1000+ happy families" }
  ];

  const values = [
    { icon: Shield, title: "Integrity", desc: "Transparent dealings with all stakeholders", color: "text-blue-600" },
    { icon: Heart, title: "Quality", desc: "Uncompromising standards in every project", color: "text-red-600" },
    { icon: Users, title: "Community", desc: "Building communities, not just buildings", color: "text-green-600" },
    { icon: Target, title: "Innovation", desc: "Embracing modern technology and methods", color: "text-purple-600" }
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      experience: "25+ years",
      expertise: "Project Management & Real Estate Development",
      achievements: "Led 50+ successful projects worth ₹500+ Crores"
    },
    {
      name: "Priya Sharma",
      role: "Chief Architect",
      experience: "18+ years",
      expertise: "Sustainable Architecture & Urban Planning",
      achievements: "Winner of 3 National Architecture Awards"
    },
    {
      name: "Vikram Singh",
      role: "Construction Head",
      experience: "22+ years",
      expertise: "Construction Technology & Quality Control",
      achievements: "Zero-defect delivery record for 15 consecutive projects"
    }
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full">
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative page-content">
          {/* Navigation */}
          <header className="relative bg-transparent pt-4 sm:pt-8 lg:pt-12">
            <div className="relative">
              <nav className="flex items-center justify-between py-4 mb-8 lg:mb-16">
                <div className="nav-logo flex items-center space-x-3">
                  <img 
                    src="/logo.jpg" 
                    alt="BuildMasters Logo" 
                    className="w-20 h-12 sm:w-24 sm:h-16 lg:w-32 lg:h-20 object-contain"
                  />
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
                Building <span className="text-[#b48b2f]">Dreams</span> Since 1999
              </h1>
              <p className="text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-3xl mx-auto leading-relaxed">
                From humble beginnings to becoming Madurai's most trusted construction company, 
                our journey has been defined by unwavering commitment to quality, innovation, and customer satisfaction.
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
                    BuildMasters was founded with a simple yet powerful vision: to create homes that 
                    families would cherish for generations. What started as a small construction firm 
                    has evolved into one of Tamil Nadu's most respected real estate developers.
                  </p>
                  <p>
                    Our founder, with a background in civil engineering and a passion for architecture, 
                    recognized the need for quality housing that combined modern amenities with traditional values. 
                    This philosophy continues to guide every project we undertake.
                  </p>
                  <p>
                    Today, we've delivered over 50 successful projects, housing more than 1,000 families 
                    across South India. Each project reflects our commitment to excellence, sustainability, 
                    and creating communities where people truly belong.
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="floating-element absolute -top-4 -right-4 w-24 h-24 bg-[#b48b2f]/10 rounded-full"></div>
                <div className="floating-element absolute -bottom-4 -left-4 w-16 h-16 bg-[#b48b2f]/20 rounded-full"></div>
                <img 
                  src="/figmaAssets/mask-group.png" 
                  alt="BuildMasters construction site" 
                  className="w-full h-96 object-cover rounded-lg shadow-xl"
                />
              </div>
            </div>
          </section>

          {/* Journey Section - Redesigned */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Our <span className="text-[#b48b2f]">Journey</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                From humble beginnings to industry leadership - discover the milestones that shaped our success story.
              </p>
            </div>
            
            {/* Journey Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-2xl">
                <div className="text-3xl lg:text-4xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-2">25+</div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">Years of Excellence</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-2xl">
                <div className="text-3xl lg:text-4xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-2">50+</div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">Projects Delivered</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-2xl">
                <div className="text-3xl lg:text-4xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-2">1000+</div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">Happy Families</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-2xl">
                <div className="text-3xl lg:text-4xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-2">₹500+</div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">Crores Worth Projects</div>
              </div>
            </div>

            {/* Milestone Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {milestones.map((milestone, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#b48b2f] to-[#9d7829] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-2xl font-bold text-white [font-family:'Poppins',Helvetica]">
                          {milestone.year.slice(-2)}
                        </span>
                      </div>
                      <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#b48b2f] text-white font-bold px-3 py-1">
                        {milestone.year}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-3 group-hover:text-[#b48b2f] transition-colors">
                      {milestone.title}
                    </CardTitle>
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-relaxed">
                      {milestone.desc}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Achievement Highlight */}
            <div className="mt-16 bg-gradient-to-r from-[#b48b2f] to-[#9d7829] rounded-3xl p-8 lg:p-12 text-white text-center">
              <div className="flex items-center justify-center mb-4">
                <Award className="w-8 h-8 mr-3" />
                <h3 className="text-2xl lg:text-3xl font-bold [font-family:'Poppins',Helvetica]">
                  Our Legacy Continues
                </h3>
              </div>
              <p className="text-lg [font-family:'Poppins',Helvetica] opacity-90 max-w-3xl mx-auto leading-relaxed">
                With each passing year, we strengthen our commitment to excellence, innovation, and customer satisfaction. Join us as we build the future of construction in Tamil Nadu. 
                Today, BuildMasters stands as a testament to what passion, dedication, and unwavering quality can achieve.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Our <span className="text-[#b48b2f]">Values</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                The principles that guide every decision we make and every project we deliver.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 text-center group">
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
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

          {/* Leadership Team */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Leadership <span className="text-[#b48b2f]">Team</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Meet the visionaries behind BuildMasters' success story.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#b48b2f]/20 to-[#b48b2f]/10 rounded-full flex items-center justify-center">
                      <Users className="w-12 h-12 text-[#b48b2f]" />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {member.name}
                    </CardTitle>
                    <Badge className="bg-[#b48b2f]/10 text-[#b48b2f] mb-4">
                      {member.role}
                    </Badge>
                    <div className="space-y-3 text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      <div className="flex items-center justify-center">
                        <Calendar className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {member.experience}
                      </div>
                      <p className="font-medium">Expertise:</p>
                      <p>{member.expertise}</p>
                      <p className="font-medium">Key Achievement:</p>
                      <p>{member.achievements}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Awards & Recognition */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                  Awards & <span className="text-[#b48b2f]">Recognition</span>
                </h2>
                <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                  Industry recognition for our commitment to excellence and innovation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: "Best Builder Award", year: "2023", org: "Tamil Nadu Builders Association" },
                  { title: "Quality Excellence", year: "2022", org: "Construction Industry Council" },
                  { title: "Sustainable Construction", year: "2021", org: "Green Building Council" },
                  { title: "Customer Satisfaction", year: "2020", org: "Real Estate Excellence Awards" }
                ].map((award, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#b48b2f] rounded-full flex items-center justify-center">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-1">
                      {award.title}
                    </h3>
                    <p className="text-[#b48b2f] font-semibold mb-1">{award.year}</p>
                    <p className="text-sm text-[#6b6b6b]">{award.org}</p>
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
                  Join over 1,000 satisfied families who have made BuildMasters their trusted construction partner.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-white text-[#b48b2f] hover:bg-gray-100 rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Get In Touch
                  </Button>
                  <Button 
                    onClick={() => navigate('/services')}
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-[#b48b2f] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
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