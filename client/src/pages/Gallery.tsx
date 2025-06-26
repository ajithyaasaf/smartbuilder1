import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Camera, Play, Award, Users, Calendar, Eye, Download, Share2 } from "lucide-react";
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
  animateMorphingShapes,
  initMobileOptimizations
} from "@/lib/animations";

export const Gallery = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      // Initialize mobile optimizations first
      initMobileOptimizations();
      
      setTimeout(() => {
        // Core page animations
        animatePageTransition();
        animateNavigation();
        animateTextReveal(".section-title");
        
        // Gallery-specific animations
        animateImageReveal();
        animateStaggeredCards();
        animateCounterNumbers();
        animateMorphingShapes();
        animateBackgroundParallax();
        animateScrollIndicator();
        
        // Interactive elements
        setupButtonHoverAnimations();
        animateFloatingElements();
        setupParallaxImages();
        animateCardsOnScroll(".overflow-hidden");
      }, 100);
    } catch (error) {
      console.debug("Animation initialization error:", error);
    }
  }, []);

  const navItems = [
    { name: "Home", path: "/", active: false },
    { name: "About", path: "/about", active: false },
    { name: "Services", path: "/services", active: false },
    { name: "Contact", path: "/contact", active: false },
    { name: "Gallery", path: "/gallery", active: true }
  ];

  const galleryItems = [
    // Completed Projects
    {
      id: 1,
      title: "Royal Residency",
      category: "completed",
      type: "image",
      description: "Luxury apartment complex with modern amenities",
      location: "Madurai",
      year: "2023",
      image: "@assets/1_1750919638071.jpeg",
      stats: { units: 120, floors: 15, parking: 200 }
    },
    {
      id: 2,
      title: "Smart Heights",
      category: "completed",
      type: "image",
      description: "Premium residential tower with panoramic views",
      location: "Madurai",
      year: "2023",
      image: "@assets/2_1750919638075.jpeg",
      stats: { units: 80, floors: 12, parking: 160 }
    },
    {
      id: 3,
      title: "Garden View Apartments",
      category: "completed",
      type: "image",
      description: "Modern apartments with landscaped gardens",
      location: "Madurai",
      year: "2022",
      image: "@assets/3_1750919638076.jpeg",
      stats: { units: 100, floors: 10, parking: 180 }
    },
    {
      id: 4,
      title: "Elite Complex",
      category: "completed",
      type: "image",
      description: "Contemporary design with premium finishes",
      location: "Madurai",
      year: "2022",
      image: "@assets/4_1750919638076.jpeg",
      stats: { units: 90, floors: 8, parking: 150 }
    },
    {
      id: 5,
      title: "Golden Tower",
      category: "completed",
      type: "image",
      description: "Luxury high-rise with world-class amenities",
      location: "Madurai",
      year: "2021",
      image: "@assets/5_1750919638077.jpeg",
      stats: { units: 150, floors: 18, parking: 250 }
    },
    // Ongoing Projects
    {
      id: 6,
      title: "Paradise Heights",
      category: "ongoing",
      type: "image",
      description: "Premium residential development in progress",
      location: "Bypass Road, Madurai",
      year: "2024",
      image: "@assets/6_1750919638078.jpeg",
      progress: 75,
      stats: { units: 140, floors: 16, parking: 220 }
    },
    {
      id: 7,
      title: "Smart City Towers",
      category: "ongoing",
      type: "image",
      description: "Modern twin towers with smart home features",
      location: "Madurai",
      year: "2024",
      image: "@assets/7_1750919638079.jpeg",
      progress: 60,
      stats: { units: 180, floors: 20, parking: 300 }
    },
    {
      id: 8,
      title: "Green Valley Phase II",
      category: "ongoing",
      type: "image",
      description: "Eco-friendly residential complex under construction",
      location: "Madurai",
      year: "2024",
      image: "@assets/8_1750919638079.jpeg",
      progress: 45,
      stats: { units: 110, floors: 12, parking: 200 }
    },
    // Construction Process
    {
      id: 9,
      title: "Foundation Excellence",
      category: "process",
      type: "image",
      description: "Deep foundation work using advanced technology",
      location: "Construction Site",
      image: "@assets/9_1750919638080.jpeg"
    },
    {
      id: 10,
      title: "Structural Framework",
      category: "process",
      type: "image",
      description: "High-quality concrete and steel construction",
      location: "Construction Site",
      image: "@assets/10_1750919638081.jpeg"
    },
    {
      id: 11,
      title: "Premium Finishing",
      category: "process",
      type: "image",
      description: "Attention to detail in interior finishing",
      location: "Construction Site",
      image: "@assets/11_1750919638082.jpeg"
    },
    // Awards & Recognition
    {
      id: 12,
      title: "Project Excellence Award",
      category: "awards",
      type: "image",
      description: "Recognition for outstanding construction quality",
      location: "Madurai",
      year: "2023",
      image: "@assets/12_1750919638083.jpeg"
    },
    {
      id: 13,
      title: "Completed Milestone",
      category: "awards",
      type: "image",
      description: "Celebration of successful project completion",
      location: "Madurai",
      year: "2023",
      image: "@assets/13_1750919638083.jpeg"
    }
  ];

  const categories = [
    { id: "all", label: "All Gallery", count: galleryItems.length },
    { id: "completed", label: "Completed Projects", count: galleryItems.filter(item => item.category === "completed").length },
    { id: "ongoing", label: "Ongoing Projects", count: galleryItems.filter(item => item.category === "ongoing").length },
    { id: "process", label: "Construction Process", count: galleryItems.filter(item => item.category === "process").length },
    { id: "awards", label: "Awards & Events", count: galleryItems.filter(item => item.category === "awards").length }
  ];

  const filteredItems = activeCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const achievements = [
    { number: "50+", label: "Completed Projects", icon: Award },
    { number: "1000+", label: "Happy Families", icon: Users },
    { number: "22+", label: "Years Experience", icon: Calendar },
    { number: "500K+", label: "Sq.Ft Delivered", icon: Camera }
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
                    Ramnagar, Madurai
                  </div>
                </div>

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
                Visual Excellence
              </Badge>
              <h1 className="section-title text-4xl sm:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-6">
                Our Work <span className="text-[#b48b2f]">Gallery</span>
              </h1>
              <p className="text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-3xl mx-auto leading-relaxed">
                Explore our portfolio of completed projects, ongoing developments, and construction excellence. 
                Each image tells a story of quality, innovation, and satisfied customers.
              </p>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {achievements.map((achievement, index) => (
                <Card key={index} className="text-center p-6 border-none bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10">
                  <CardContent className="p-0">
                    <achievement.icon className="w-8 h-8 mx-auto mb-4 text-[#b48b2f]" />
                    <div className="text-2xl lg:text-3xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {achievement.number}
                    </div>
                    <div className="text-sm lg:text-base text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {achievement.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Gallery Categories */}
          <section className="mb-12">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 h-auto p-1 bg-gray-100 rounded-lg">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex flex-col items-center p-4 data-[state=active]:bg-[#b48b2f] data-[state=active]:text-white rounded-md transition-all duration-200"
                  >
                    <span className="font-medium [font-family:'Poppins',Helvetica] mb-1">
                      {category.label}
                    </span>
                    <Badge className="bg-white/20 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </section>

          {/* Gallery Grid */}
          <section className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className="relative h-64 bg-gradient-to-br from-[#b48b2f]/10 to-[#b48b2f]/20">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex space-x-3">
                        <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                        {item.type === "video" && (
                          <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                            <Play className="w-4 h-4 mr-2" />
                            Play
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Type Badge */}
                    <Badge className={`absolute top-4 left-4 ${
                      item.type === "video" ? "bg-red-500" : "bg-[#b48b2f]"
                    } text-white`}>
                      {item.type === "video" ? (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Video
                        </>
                      ) : (
                        <>
                          <Camera className="w-3 h-3 mr-1" />
                          Photo
                        </>
                      )}
                    </Badge>

                    {/* Progress for ongoing projects */}
                    {item.progress && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 rounded-full p-2">
                          <div className="flex items-center justify-between text-xs text-[#313131] mb-1">
                            <span>Progress</span>
                            <span className="font-bold">{item.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-[#b48b2f] h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                        {item.title}
                      </CardTitle>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost" className="p-1">
                          <Share2 className="w-4 h-4 text-[#6b6b6b]" />
                        </Button>
                        <Button size="sm" variant="ghost" className="p-1">
                          <Download className="w-4 h-4 text-[#6b6b6b]" />
                        </Button>
                      </div>
                    </div>
                    
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-4">
                      {item.description}
                    </CardDescription>

                    <div className="flex items-center justify-between text-sm text-[#6b6b6b] mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#b48b2f]" />
                        {item.location}
                      </div>
                      {item.year && (
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1 text-[#b48b2f]" />
                          {item.year}
                        </div>
                      )}
                    </div>

                    {/* Project Stats */}
                    {item.stats && (
                      <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
                        <div className="text-center">
                          <div className="font-bold text-[#b48b2f]">{item.stats.units}</div>
                          <div className="text-xs text-[#6b6b6b]">Units</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-[#b48b2f]">{item.stats.floors}</div>
                          <div className="text-xs text-[#6b6b6b]">Floors</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-[#b48b2f]">{item.stats.parking}</div>
                          <div className="text-xs text-[#6b6b6b]">Parking</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Video Showcase */}
          <section className="mb-20">
            <div className="bg-gradient-to-br from-[#b48b2f]/5 to-[#b48b2f]/10 rounded-3xl p-8 lg:p-12">
              <div className="text-center mb-12">
                <h2 className="section-title text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                  Featured <span className="text-[#b48b2f]">Project Tour</span>
                </h2>
                <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                  Take a virtual tour of our flagship project - Royal Residency
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <Card className="overflow-hidden border-none shadow-2xl">
                  <div className="relative h-96 bg-gradient-to-br from-[#b48b2f]/20 to-[#b48b2f]/10 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-6 bg-[#b48b2f] rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                        <Play className="w-12 h-12 text-white ml-1" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                        Royal Residency - Complete Walkthrough
                      </h3>
                      <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                        Experience luxury living with our 360° virtual tour
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-[#b48b2f] to-[#9d7829] border-none text-white p-8 lg:p-12 text-center">
              <CardContent className="p-0">
                <h2 className="text-2xl lg:text-3xl font-bold [font-family:'Poppins',Helvetica] mb-4">
                  Want to See More?
                </h2>
                <p className="text-lg [font-family:'Poppins',Helvetica] mb-8 opacity-90 max-w-2xl mx-auto">
                  Schedule a visit to our ongoing projects or completed properties to experience our quality firsthand.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-white text-[#b48b2f] hover:bg-gray-100 rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Site Visit
                  </Button>
                  <Button 
                    onClick={() => navigate('/services')}
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white hover:text-[#b48b2f] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]"
                  >
                    <Camera className="w-4 h-4 mr-2" />
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