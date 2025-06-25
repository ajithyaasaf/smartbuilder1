import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Bed, Bath, Square, Car, Star, CheckCircle, ArrowRight, Building, Wifi, Coffee, Briefcase, GraduationCap, Heart } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useNavigation } from "@/lib/navigation";
import { EMICalculatorForm, QuickInquiryForm } from "@/components/forms";
import { useGSAP } from "@/hooks/useGSAP";
import { 
  animatePageTransition, 
  animateNavigation, 
  animateCardsOnScroll, 
  setupButtonHoverAnimations,
  animateFloatingElements,
  setupParallaxImages,
  animateFormEntrance
} from "@/lib/animations";

export const MiniApartments = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();

  const containerRef = useGSAP(() => {
    try {
      setTimeout(() => {
        animatePageTransition();
        animateNavigation();
        animateCardsOnScroll(".overflow-hidden");
        animateFormEntrance(".emi-calculator");
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
    { name: "Residential", path: "/residential", active: false },
    { name: "Apartments", path: "/apartments", active: false },
    { name: "Villas", path: "/villas", active: false },
    { name: "Mini Apartments", path: "/mini-apartments", active: true },
    { name: "Land Promotion", path: "/land-promotion", active: false },
    { name: "About", path: "/about", active: false },
    { name: "Contact", path: "/contact", active: false },
  ];

  const miniApartments = [
    {
      id: 1,
      name: "Smart Studios Premium",
      location: "Samayanallur, Madurai",
      price: "₹25 Lakhs onwards",
      emi: "₹18,500/month",
      bedrooms: "1 BHK",
      bathrooms: "1",
      area: "650-750 sq ft",
      parking: "Open Parking",
      status: "Ready to Move",
      rating: 4.7,
      reviews: 89,
      targetAudience: "Young Professionals",
      amenities: ["Furnished", "Wi-Fi Ready", "Gym", "Cafeteria", "Laundry Service", "Security", "Power Backup", "Maintenance"],
      highlights: ["IT Hub Proximity", "Metro Connectivity", "First Home Buyers", "Rental Investment"],
      specialFeatures: ["Modular Kitchen", "Built-in Wardrobes", "Premium Flooring", "Modern Bathroom"],
      possession: "Immediate"
    },
    {
      id: 2,
      name: "Urban Living Pods",
      location: "Anna Nagar, Madurai",
      price: "₹32 Lakhs onwards",
      emi: "₹23,500/month",
      bedrooms: "1-1.5 BHK",
      bathrooms: "1",
      area: "750-900 sq ft",
      parking: "Covered Parking",
      status: "New Launch",
      rating: 4.8,
      reviews: 56,
      targetAudience: "Students & Professionals",
      amenities: ["Co-working Space", "Rooftop Garden", "Game Room", "Study Area", "High-Speed Internet", "Food Court", "Medical Center", "Banking"],
      highlights: ["University Nearby", "Hospital Access", "Shopping Complex", "Public Transport"],
      specialFeatures: ["Smart Home Features", "Balcony Garden", "Study Nook", "Storage Solutions"],
      possession: "April 2025"
    },
    {
      id: 3,
      name: "Compact Luxury Homes",
      location: "KK Nagar, Madurai",
      price: "₹38 Lakhs onwards",
      emi: "₹27,800/month",
      bedrooms: "1.5-2 BHK",
      bathrooms: "1-2",
      area: "850-1100 sq ft",
      parking: "Covered + Visitor",
      status: "Under Construction",
      rating: 4.9,
      reviews: 34,
      targetAudience: "Young Couples",
      amenities: ["Swimming Pool", "Yoga Deck", "BBQ Area", "Children's Play", "Library", "Spa", "Concierge", "Valet Parking"],
      highlights: ["Premium Location", "Luxury Finishes", "Smart Investment", "Resale Value"],
      specialFeatures: ["Designer Interiors", "Premium Fixtures", "Skylight", "Private Balcony"],
      possession: "September 2025"
    }
  ];

  const targetGroups = [
    {
      icon: Briefcase,
      title: "Young Professionals",
      description: "Perfect starter homes for IT professionals and working executives",
      benefits: ["Easy EMI", "IT Hub Proximity", "Rental Potential", "Appreciation Value"]
    },
    {
      icon: GraduationCap,
      title: "Students & Graduates",
      description: "Affordable housing near educational institutions and training centers",
      benefits: ["Budget Friendly", "Shared Amenities", "Study Spaces", "Safe Environment"]
    },
    {
      icon: Heart,
      title: "Young Couples",
      description: "Cozy homes for newlyweds starting their journey together",
      benefits: ["Modern Design", "Community Living", "Security", "Easy Maintenance"]
    },
    {
      icon: Building,
      title: "Investment Buyers",
      description: "High rental yield properties for smart investors",
      benefits: ["High ROI", "Easy Rent", "Low Maintenance", "Prime Locations"]
    }
  ];

  const compactFeatures = [
    {
      title: "Space Optimization",
      description: "Clever design solutions to maximize every square foot",
      features: ["Multi-functional Furniture", "Built-in Storage", "Foldable Elements", "Vertical Space Usage"]
    },
    {
      title: "Modern Amenities",
      description: "Full-scale amenities in compact layouts",
      features: ["Modular Kitchen", "Designer Bathroom", "Balcony/Terrace", "Premium Flooring"]
    },
    {
      title: "Smart Technology",
      description: "Tech-enabled features for modern living",
      features: ["High-Speed Internet", "Smart Home Ready", "Video Door Phone", "App-based Services"]
    },
    {
      title: "Community Spaces",
      description: "Shared spaces that extend your living area",
      features: ["Co-working Areas", "Recreation Zones", "Rooftop Gardens", "Community Kitchen"]
    }
  ];

  const financingOptions = [
    { bank: "SBI", rate: "8.5%", tenure: "20 years", processing: "₹5,000" },
    { bank: "HDFC", rate: "8.75%", tenure: "25 years", processing: "₹3,000" },
    { bank: "ICICI", rate: "8.65%", tenure: "20 years", processing: "₹4,000" },
    { bank: "Axis Bank", rate: "8.9%", tenure: "25 years", processing: "₹3,500" }
  ];

  return (
    <div ref={containerRef} className="bg-white min-h-screen w-full">
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative page-content">
          {/* Navigation */}
          <header className="relative bg-transparent pt-4 sm:pt-8 lg:pt-12">
            <nav className="flex items-center justify-between py-4 mb-8 lg:mb-12">
              <div className="flex items-center space-x-2">
                
                <img 
                  src="/logo.jpg" 
                  alt="Company Logo" 
                  className="w-20 h-12 sm:w-24 sm:h-16 lg:w-32 lg:h-20 object-contain"
                />

              </div>
              
              <NavigationMenu className="hidden lg:flex">
                <NavigationMenuList className="flex gap-6 xl:gap-8">
                  {navItems.slice(0, 6).map((item, index) => (
                    <NavigationMenuItem key={index}>
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

              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="lg:hidden p-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <nav className="flex flex-col space-y-6 mt-8">
                    {navItems.map((item, index) => (
                      <a
                        key={index}
                        href={item.path}
                        className={`text-lg [font-family:'Poppins',Helvetica] hover:text-[#b48b2f] transition-colors px-4 py-2 ${
                          item.active ? "font-semibold text-[#b48b2f] border-l-2 border-[#b48b2f]" : "font-normal text-[#313131]"
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
          </header>

          {/* Hero Section */}
          <section className="text-center mb-16 lg:mb-20">
            <div className="max-w-4xl mx-auto">
              <Badge className="bg-[#b48b2f]/10 text-[#b48b2f] border-[#b48b2f]/20 font-medium mb-6">
                Affordable Mini Apartments in Madurai
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] leading-tight mb-6">
                <span className="text-[#b48b2f]">Smart</span> Mini Apartments
                <br />
                for <span className="text-[#b48b2f]">Urban</span> Living
              </h1>
              <p className="text-lg sm:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-7 mb-8 max-w-2xl mx-auto">
                Perfectly designed compact homes for young professionals, students, and first-time buyers. Experience modern living with smart space utilization and premium amenities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  View Mini Apartments
                </Button>
                <Button variant="outline" className="border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  <Phone className="w-4 h-4 mr-2" />
                  EMI Calculator
                </Button>
              </div>
            </div>
          </section>

          {/* Target Groups */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Perfect for <span className="text-[#b48b2f]">Every Lifestyle</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Our mini apartments cater to diverse needs and lifestyles in urban Madurai.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {targetGroups.map((group, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <group.icon className="w-12 h-12 mx-auto mb-4 text-[#b48b2f]" />
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {group.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-4">
                      {group.description}
                    </CardDescription>
                    <div className="space-y-1">
                      {group.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-center justify-center text-xs text-[#6b6b6b]">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Mini Apartments Grid */}
          <section className="mb-16">
            <div className="space-y-12">
              {miniApartments.map((apartment) => (
                <Card key={apartment.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-80 lg:h-full bg-gradient-to-br from-[#b48b2f]/10 to-[#b48b2f]/20">
                      <div className="absolute top-4 left-4 space-y-2">
                        <Badge className="bg-[#b48b2f] text-white">
                          {apartment.status}
                        </Badge>
                        <Badge className="bg-green-500 text-white">
                          Affordable
                        </Badge>
                        <Badge className="bg-purple-500 text-white">
                          {apartment.targetAudience}
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-semibold text-sm text-[#313131]">{apartment.rating}</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building className="w-24 h-24 text-[#b48b2f] opacity-40" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="text-sm font-medium text-[#313131]">EMI Starting</div>
                          <div className="text-lg font-bold text-[#b48b2f]">{apartment.emi}</div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-8">
                      <div className="mb-4">
                        <CardTitle className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                          {apartment.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-1">
                          <MapPin className="w-4 h-4 mr-1 text-[#b48b2f]" />
                          {apartment.location}
                        </div>
                        <div className="text-xs text-[#6b6b6b]">Possession: {apartment.possession}</div>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6 text-sm">
                        <div className="flex items-center text-[#6b6b6b]">
                          <Bed className="w-4 h-4 mr-2 text-[#b48b2f]" />
                          {apartment.bedrooms}
                        </div>
                        <div className="flex items-center text-[#6b6b6b]">
                          <Bath className="w-4 h-4 mr-2 text-[#b48b2f]" />
                          {apartment.bathrooms}
                        </div>
                        <div className="flex items-center text-[#6b6b6b]">
                          <Square className="w-4 h-4 mr-2 text-[#b48b2f]" />
                          {apartment.area}
                        </div>
                        <div className="flex items-center text-[#6b6b6b]">
                          <Car className="w-4 h-4 mr-2 text-[#b48b2f]" />
                          {apartment.parking}
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-baseline gap-3 mb-2">
                          <div className="font-bold text-2xl text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                            {apartment.price}
                          </div>
                          <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                            EMI: {apartment.emi}
                          </div>
                        </div>
                        <div className="text-sm text-[#6b6b6b] flex items-center">
                          <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
                          {apartment.rating} ({apartment.reviews} reviews)
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">Amenities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {apartment.amenities.slice(0, 6).map((amenity, index) => (
                            <div key={index} className="flex items-center text-xs text-[#6b6b6b]">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">Special Features</h4>
                        <div className="flex flex-wrap gap-2">
                          {apartment.specialFeatures.map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">Why Choose This</h4>
                        <div className="flex flex-wrap gap-2">
                          {apartment.highlights.map((highlight, index) => (
                            <Badge key={index} className="bg-[#b48b2f]/10 text-[#b48b2f] text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[20px_2px_20px_2px] font-medium [font-family:'Poppins',Helvetica]">
                          View Details
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                        <Button variant="outline" className="border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[20px_2px_20px_2px] px-6">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Compact Living Features */}
          <section className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                <span className="text-[#b48b2f]">Smart</span> Design Features
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Innovative design solutions that make compact living comfortable and efficient.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {compactFeatures.map((feature, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-4">
                      {feature.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center text-xs text-[#6b6b6b]">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Financing Options */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Easy <span className="text-[#b48b2f]">Financing</span> Options
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Partner banks offering attractive home loan rates for your mini apartment purchase.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {financingOptions.map((option, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <CardTitle className="text-xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-4">
                      {option.bank}
                    </CardTitle>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Interest Rate:</span>
                        <span className="font-semibold text-[#313131]">{option.rate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Max Tenure:</span>
                        <span className="font-semibold text-[#313131]">{option.tenure}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6b6b6b]">Processing Fee:</span>
                        <span className="font-semibold text-[#313131]">{option.processing}</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4 bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[20px_2px_20px_2px] font-medium [font-family:'Poppins',Helvetica]">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* EMI Calculator & Quick Inquiry Section */}
          <section className="mt-16 lg:mt-24 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Plan Your <span className="text-[#b48b2f]">Investment</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Calculate affordable EMI options and get instant callback from our housing loan experts.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EMICalculatorForm defaultPrice={2500000} />
              <QuickInquiryForm 
                title="Get Instant Callback"
                subtitle="Our loan experts will help you with the best financing options"
              />
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
};