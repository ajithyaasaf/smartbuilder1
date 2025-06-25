import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Square, TrendingUp, CheckCircle, ArrowRight, Building, FileCheck, Zap, Shield, Award, Landmark, TreePine, Road } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useNavigation } from "@/lib/navigation";
import { ContactForm, QuickInquiryForm } from "@/components/forms";

export const LandPromotion = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("residential");
  const { navigate } = useNavigation();
  
  const navItems = [
    { name: "Home", path: "/", active: false },
    { name: "Residential", path: "/residential", active: false },
    { name: "Apartments", path: "/apartments", active: false },
    { name: "Villas", path: "/villas", active: false },
    { name: "Mini Apartments", path: "/mini-apartments", active: false },
    { name: "Land Promotion", path: "/land-promotion", active: true },
    { name: "About", path: "/about", active: false },
    { name: "Contact", path: "/contact", active: false },
  ];

  const landProjects = [
    {
      id: 1,
      name: "Smart City Plots",
      category: "residential",
      location: "Bypass Road, Madurai",
      pricePerSqFt: "₹2,800/sq ft",
      totalPrice: "₹28 Lakhs onwards",
      plotSizes: ["800 sq ft", "1000 sq ft", "1200 sq ft", "1500 sq ft"],
      status: "Selling Fast",
      rating: 4.8,
      totalPlots: 120,
      soldPlots: 85,
      amenities: ["Gated Community", "Underground Electricity", "Water Connection", "Drainage", "Street Lights", "Security"],
      highlights: ["DTCP Approved", "Clear Title", "Bank Loan Available", "Corner Plots Available"],
      appreciation: "15-20% annually",
      possession: "Immediate",
      roadWidth: "30-40 feet"
    },
    {
      id: 2,
      name: "Elite Commercial Hub",
      category: "commercial",
      location: "Anna Nagar Main Road, Madurai",
      pricePerSqFt: "₹4,500/sq ft",
      totalPrice: "₹45 Lakhs onwards",
      plotSizes: ["600 sq ft", "800 sq ft", "1000 sq ft", "1200 sq ft"],
      status: "New Launch",
      rating: 4.9,
      totalPlots: 80,
      soldPlots: 32,
      amenities: ["Commercial Zoning", "High-Speed Internet", "Power Backup", "Parking Space", "Security", "Maintenance"],
      highlights: ["Main Road Facing", "IT Hub Proximity", "High ROI", "Business District"],
      appreciation: "20-25% annually",
      possession: "Ready for Construction",
      roadWidth: "60 feet"
    },
    {
      id: 3,
      name: "Green Valley Plots",
      category: "residential",
      location: "Thiruparankundram, Madurai",
      pricePerSqFt: "₹2,200/sq ft",
      totalPrice: "₹22 Lakhs onwards",
      plotSizes: ["1000 sq ft", "1200 sq ft", "1500 sq ft", "2000 sq ft"],
      status: "Limited Plots",
      rating: 4.7,
      totalPlots: 150,
      soldPlots: 95,
      amenities: ["Landscaping", "Children's Park", "Jogging Track", "Bore Well", "Compound Wall", "Security Gate"],
      highlights: ["Hill View", "Pollution Free", "Temple Proximity", "Peaceful Environment"],
      appreciation: "12-18% annually",
      possession: "Immediate",
      roadWidth: "24-30 feet"
    },
    {
      id: 4,
      name: "Industrial Estate Plots",
      category: "industrial",
      location: "SIPCOT Area, Madurai",
      pricePerSqFt: "₹1,800/sq ft",
      totalPrice: "₹36 Lakhs onwards",
      plotSizes: ["2000 sq ft", "3000 sq ft", "5000 sq ft", "1 acre"],
      status: "Government Approved",
      rating: 4.6,
      totalPlots: 60,
      soldPlots: 25,
      amenities: ["Industrial Infrastructure", "Heavy Vehicle Access", "Power Substation", "Water Supply", "Drainage", "Fire Safety"],
      highlights: ["SIPCOT Approved", "Industrial License Ready", "Logistics Hub", "Export Facilitation"],
      appreciation: "10-15% annually",
      possession: "Phase-wise Handover",
      roadWidth: "80 feet"
    }
  ];

  const investmentBenefits = [
    {
      icon: TrendingUp,
      title: "High Appreciation",
      description: "Land values in Madurai have consistently grown 12-25% annually",
      details: ["Prime Locations", "Infrastructure Development", "Urban Expansion", "Government Projects"]
    },
    {
      icon: FileCheck,
      title: "Legal Clarity",
      description: "All properties come with clear titles and necessary approvals",
      details: ["DTCP Approved", "Clear Title Deeds", "Survey Settlement", "Legal Verification"]
    },
    {
      icon: Zap,
      title: "Ready Infrastructure",
      description: "Developed plots with essential amenities and connectivity",
      details: ["Roads & Drainage", "Electricity Connection", "Water Supply", "Street Lighting"]
    },
    {
      icon: Shield,
      title: "Secure Investment",
      description: "Low-risk investment option with steady returns",
      details: ["Tangible Asset", "Inflation Hedge", "No Maintenance", "Easy Liquidity"]
    }
  ];

  const services = [
    {
      title: "Land Acquisition",
      description: "Help you find and acquire the perfect plot for your needs",
      features: ["Location Scouting", "Price Negotiation", "Legal Verification", "Documentation"]
    },
    {
      title: "Project Development",
      description: "End-to-end development services for your land investment",
      features: ["Master Planning", "Approval Management", "Infrastructure Development", "Marketing Support"]
    },
    {
      title: "Investment Advisory",
      description: "Expert guidance on land investment opportunities",
      features: ["Market Analysis", "ROI Projections", "Risk Assessment", "Portfolio Planning"]
    },
    {
      title: "Legal Services",
      description: "Complete legal support for land transactions",
      features: ["Title Verification", "Document Preparation", "Registration Support", "Legal Compliance"]
    }
  ];

  const processSteps = [
    { step: 1, title: "Site Visit", description: "Visit the location and explore available plots" },
    { step: 2, title: "Documentation", description: "Verify all legal documents and approvals" },
    { step: 3, title: "Booking", description: "Book your preferred plot with token amount" },
    { step: 4, title: "Registration", description: "Complete registration and get possession" }
  ];

  const filteredLands = landProjects.filter(land => land.category === activeTab);

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation */}
          <header className="relative bg-transparent pt-4 sm:pt-8 lg:pt-12">
            <nav className="flex items-center justify-between py-4 mb-8 lg:mb-12">
              <div className="flex items-center space-x-2">
                
                <img 
                  src="/attached_assets/construction_1750832040927.jpg" 
                  alt="Company Logo" 
                  className="w-12 h-8 sm:w-16 sm:h-10 lg:w-20 lg:h-12 object-contain"
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
                Land Investment & Development in Madurai
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] leading-tight mb-6">
                <span className="text-[#b48b2f]">Smart</span> Land Investments
                <br />
                for <span className="text-[#b48b2f]">Future</span> Growth
              </h1>
              <p className="text-lg sm:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-7 mb-8 max-w-2xl mx-auto">
                Discover premium land investment opportunities in Madurai's fastest-growing areas. From residential plots to commercial spaces, we help you build wealth through strategic land investments.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  Explore Land Options
                </Button>
                <Button variant="outline" className="border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  <Phone className="w-4 h-4 mr-2" />
                  Investment Advisory
                </Button>
              </div>
            </div>
          </section>

          {/* Investment Benefits */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Why Invest in <span className="text-[#b48b2f]">Madurai Land</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Madurai's strategic location and rapid development make it an ideal destination for land investments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {investmentBenefits.map((benefit, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <benefit.icon className="w-12 h-12 mx-auto mb-4 text-[#b48b2f]" />
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-4">
                      {benefit.description}
                    </CardDescription>
                    <div className="space-y-1">
                      {benefit.details.slice(0, 2).map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-center text-xs text-[#6b6b6b]">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Land Categories */}
          <section className="mb-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-fit lg:grid-cols-3 mx-auto">
                <TabsTrigger value="residential" className="[font-family:'Poppins',Helvetica]">Residential</TabsTrigger>
                <TabsTrigger value="commercial" className="[font-family:'Poppins',Helvetica]">Commercial</TabsTrigger>
                <TabsTrigger value="industrial" className="[font-family:'Poppins',Helvetica]">Industrial</TabsTrigger>
              </TabsList>
            </Tabs>
          </section>

          {/* Land Projects */}
          <section className="mb-16">
            <div className="space-y-8">
              {filteredLands.map((land) => (
                <Card key={land.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-80 lg:h-full bg-gradient-to-br from-[#b48b2f]/10 to-[#b48b2f]/20">
                      <div className="absolute top-4 left-4 space-y-2">
                        <Badge className="bg-[#b48b2f] text-white">
                          {land.status}
                        </Badge>
                        <Badge className="bg-green-500 text-white">
                          {land.appreciation} Growth
                        </Badge>
                      </div>
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 text-center">
                          <div className="text-xs text-[#6b6b6b]">Plots Available</div>
                          <div className="font-bold text-sm text-[#313131]">{land.totalPlots - land.soldPlots}</div>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Landmark className="w-24 h-24 text-[#b48b2f] opacity-40" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="text-xs text-[#6b6b6b]">Road Width</div>
                              <div className="font-semibold text-sm text-[#313131]">{land.roadWidth}</div>
                            </div>
                            <div>
                              <div className="text-xs text-[#6b6b6b]">Possession</div>
                              <div className="font-semibold text-sm text-[#313131]">{land.possession}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-8">
                      <div className="mb-4">
                        <CardTitle className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                          {land.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-1">
                          <MapPin className="w-4 h-4 mr-1 text-[#b48b2f]" />
                          {land.location}
                        </div>
                        <div className="text-xs text-[#6b6b6b]">
                          {land.soldPlots}/{land.totalPlots} plots sold
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-[#6b6b6b]">Price per sq ft</div>
                            <div className="font-bold text-xl text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                              {land.pricePerSqFt}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-[#6b6b6b]">Total Price</div>
                            <div className="font-bold text-xl text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                              {land.totalPrice}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-[#6b6b6b]">
                          Annual Appreciation: <span className="font-semibold text-green-600">{land.appreciation}</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">Available Plot Sizes</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {land.plotSizes.map((size, index) => (
                            <div key={index} className="flex items-center text-sm text-[#6b6b6b]">
                              <Square className="w-4 h-4 mr-2 text-[#b48b2f]" />
                              {size}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">Amenities</h4>
                        <div className="grid grid-cols-2 gap-2">
                          {land.amenities.slice(0, 4).map((amenity, index) => (
                            <div key={index} className="flex items-center text-xs text-[#6b6b6b]">
                              <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">Key Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {land.highlights.map((highlight, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
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

          {/* Services */}
          <section className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Our <span className="text-[#b48b2f]">Land Services</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Comprehensive land development and investment services to maximize your returns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-xs text-[#6b6b6b]">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Process Steps */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Simple <span className="text-[#b48b2f]">Investment Process</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Our streamlined process makes land investment easy and transparent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <div className="w-12 h-12 mx-auto mb-4 bg-[#b48b2f] text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {step.step}
                    </div>
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {step.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mb-16">
            <Card className="bg-gradient-to-r from-[#b48b2f] to-[#9d7829] border-none text-white p-8 lg:p-12 text-center">
              <CardContent className="p-0">
                <h2 className="text-2xl lg:text-3xl font-bold [font-family:'Poppins',Helvetica] mb-4">
                  Start Your Land Investment Journey
                </h2>
                <p className="text-lg [font-family:'Poppins',Helvetica] mb-8 opacity-90 max-w-2xl mx-auto">
                  Book a site visit or consult with our land investment experts to explore the best opportunities in Madurai.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-[#b48b2f] hover:bg-gray-100 rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Land Expert
                  </Button>
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#b48b2f] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                    <Mail className="w-4 h-4 mr-2" />
                    Investment Guide
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