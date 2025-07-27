import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Award, Users, Calendar, Target, Heart, Shield, Star, Trophy } from "lucide-react";
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
  initMobileOptimizations
} from "@/lib/animations";

export const About = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      // Initialize mobile optimizations first
      initMobileOptimizations();
      
      // Instant execution - no delays
      animatePageTransition();
      animateNavigation();
      animateTextReveal(".section-title");
      
      // Enhanced about-specific animations
      animateTextTypewriter(".text-4xl");
      animateImageReveal();
      animateStaggeredCards();
      animateCounterNumbers();
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
    { name: "About", path: "/about", active: true },
    { name: "Gallery", path: "/gallery", active: false },
    { name: "Services", path: "/services", active: false },
    { name: "Contact", path: "/contact", active: false }
  ];

  const milestones = [
    { year: "1996", title: "Education Foundation", desc: "M Rajan completed Diploma in Civil Engineering" },
    { year: "2000", title: "Advanced Qualification", desc: "Completed Bachelor of Engineering (B.E)" },
    { year: "2002", title: "Company Foundation", desc: "Started Smart Builders & Developers with a vision to transform Madurai's skyline" },
    { year: "2005", title: "International Experience", desc: "Worked on high-rise building projects in Sharjah, UAE" },
    { year: "2010", title: "Tamil Nadu Expansion", desc: "Extended operations across Tamil Nadu" },
    { year: "2015", title: "Recognition", desc: "Established memberships with professional engineering bodies" },
    { year: "2020", title: "Innovation", desc: "Introduced modern construction practices and structural detailing" },
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
      name: "M Rajan",
      role: "Founder & CEO",
      experience: "25+ years",
      expertise: "Structural Engineering & Project Management",
      achievements: "Led projects across Tamil Nadu with international experience in UAE",
      image: "/rajan.jpg",
      education: [
        { year: "1996", degree: "Diploma in Civil Engineering" },
        { year: "2000", degree: "Bachelor of Engineering (B.E)" }
      ],
      experience_details: [
        "25+ years of construction experience including 3 years abroad",
        "Worked as Site Engineer in Structural Detailing company",
        "Executed projects in Residential, Commercial & Apartment buildings",
        "Completed high-rise building projects in Sharjah, UAE",
        "Projects delivered across Tamil Nadu"
      ],
      memberships: [
        "Engineer Council of India (ECI - New Delhi)",
        "Madurai Corporation",
        "Local Planning Authority",
        "Association of Madurai Civil Engineers",
        "Junior Chamber International"
      ]
    }
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
                    Ramnagar, Madurai
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
              <Badge className="bg-[#b48b2f]/10 text-[#b48b2f] border-[#b48b2f]/20 font-medium mb-4">25 Years of Excellence</Badge>
              <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-6">
                Building <span className="text-[#b48b2f]">Dreams</span> Since 2002
              </h1>
              <p className="text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-3xl mx-auto leading-relaxed">
                Founded by M Rajan with his engineering expertise and international experience, 
                our journey from humble beginnings to becoming Madurai's most trusted construction company 
                has been defined by unwavering commitment to quality, innovation, and customer satisfaction.
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
                    Smart Builders & Developers was founded with a simple yet powerful vision: to create homes that 
                    families would cherish for generations. What started as a small construction firm 
                    has evolved into one of Tamil Nadu's most respected real estate developers.
                  </p>
                  <p>
                    Our founder M Rajan, with his Diploma in Civil Engineering (1996) and B.E degree (2000), 
                    combined with 25+ years of experience including international projects in UAE, 
                    recognized the need for quality housing that combines modern amenities with traditional values. 
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

          {/* Leadership Team - Founder Profile */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Leadership <span className="text-[#b48b2f]">Team</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Meet the visionary founder driving Smart Builders & Developers towards excellence in construction and real estate.
              </p>
            </div>
            
            {team.map((member, index) => (
              <div key={index} className="max-w-6xl mx-auto mb-16">
                {/* Modern Card Layout with Visual Impact */}
                <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white">
                  {/* Decorative Background Elements */}
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#b48b2f]/5 to-transparent"></div>
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#b48b2f]/10 rounded-full"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#b48b2f]/5 rounded-full"></div>
                  
                  <div className="relative z-10 p-8 lg:p-12">
                    {/* Hero Section - Split Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                      {/* Profile Image & Basic Info */}
                      <div className="lg:col-span-1 text-center">
                        <div className="relative inline-block mb-6">
                          <div 
                            className="w-48 h-48 lg:w-56 lg:h-56 rounded-2xl shadow-xl border-4 border-white"
                            style={{
                              backgroundImage: `url(${member.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center center',
                              backgroundRepeat: 'no-repeat'
                            }}
                          ></div>
                          <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#b48b2f] rounded-full flex items-center justify-center shadow-lg">
                            <Star className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold [font-family:'Poppins',Helvetica] text-[#313131] mb-2">
                          {member.name}
                        </h3>
                        <p className="text-lg font-semibold text-[#b48b2f] mb-4">
                          {member.role}
                        </p>
                        <div className="inline-flex items-center gap-2 bg-[#b48b2f]/10 px-4 py-2 rounded-full">
                          <Calendar className="w-4 h-4 text-[#b48b2f]" />
                          <span className="text-sm font-medium text-[#313131]">{member.experience}</span>
                        </div>
                      </div>

                      {/* Main Content Area */}
                      <div className="lg:col-span-2">
                        {/* Expertise & Vision */}
                        <div className="mb-8">
                          <h4 className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                            Leadership Vision
                          </h4>
                          <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] text-lg leading-relaxed">
                            {member.expertise}
                          </p>
                        </div>

                        {/* Key Achievement Highlight */}
                        <div className="bg-gradient-to-r from-[#b48b2f] to-[#9d7829] p-6 rounded-2xl text-white mb-8">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                              <Trophy className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold [font-family:'Poppins',Helvetica] mb-2">
                                Key Achievement
                              </h4>
                              <p className="[font-family:'Poppins',Helvetica] opacity-95">
                                {member.achievements}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Professional Stats */}
                        <div className="grid grid-cols-2 gap-6">
                          <div className="text-center p-4 bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-xl">
                            <Award className="w-8 h-8 text-[#b48b2f] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-[#313131]">{member.education.length}</p>
                            <p className="text-sm text-[#6b6b6b] font-medium">Qualifications</p>
                          </div>
                          <div className="text-center p-4 bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-xl">
                            <Shield className="w-8 h-8 text-[#b48b2f] mx-auto mb-2" />
                            <p className="text-2xl font-bold text-[#313131]">{member.memberships.length}</p>
                            <p className="text-sm text-[#6b6b6b] font-medium">Memberships</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Information - Expandable Style */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Education - Modern Card Style */}
                      <div className="bg-gray-50 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-[#b48b2f] rounded-xl flex items-center justify-center">
                            <Award className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                            Education
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {member.education.map((edu, eduIndex) => (
                            <div key={eduIndex} className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#b48b2f]/20 rounded-lg flex items-center justify-center text-xs font-bold text-[#b48b2f]">
                                {edu.year.slice(-2)}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-[#313131] text-sm">{edu.degree}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Professional Memberships */}
                      <div className="bg-gray-50 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-[#b48b2f] rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                            Memberships
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {member.memberships.map((membership, memIndex) => (
                            <div key={memIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-[#b48b2f] rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] text-sm leading-relaxed">{membership}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Experience Highlights */}
                      <div className="bg-gray-50 p-6 rounded-2xl">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-[#b48b2f] rounded-xl flex items-center justify-center">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <h4 className="text-lg font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                            Experience
                          </h4>
                        </div>
                        <div className="space-y-3">
                          {member.experience_details.slice(0, 3).map((exp, expIndex) => (
                            <div key={expIndex} className="flex items-start gap-3">
                              <div className="w-6 h-6 bg-[#b48b2f] rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                                {expIndex + 1}
                              </div>
                              <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] text-sm leading-relaxed">{exp}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
                  Join over 1,000 satisfied families who have made Smart Builders & Developers their trusted construction partner under M Rajan's expert leadership.
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