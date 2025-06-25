import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Bed, Bath, Square, Car, Star, CheckCircle, ArrowRight, Building, TreePine, Home, Leaf, Sun, Droplets } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useNavigation } from "@/lib/navigation";
import { SiteVisitForm, ContactForm } from "@/components/forms";

export const Villas = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { navigate } = useNavigation();
  
  const navItems = [
    { name: "Home", path: "/", active: false },
    { name: "Residential", path: "/residential", active: false },
    { name: "Apartments", path: "/apartments", active: false },
    { name: "Villas", path: "/villas", active: true },
    { name: "Mini Apartments", path: "/mini-apartments", active: false },
    { name: "Land Promotion", path: "/land-promotion", active: false },
    { name: "About", path: "/about", active: false },
    { name: "Contact", path: "/contact", active: false },
  ];

  const villas = [
    {
      id: 1,
      name: "Elite Garden Villas",
      category: "luxury",
      location: "Thiruparankundram, Madurai",
      price: "₹1.2 Crores onwards",
      bedrooms: "3-4 BHK",
      bathrooms: "3-4",
      area: "2800-3500 sq ft",
      plotSize: "2400-3000 sq ft",
      parking: "Private Garage",
      status: "Ready to Move",
      rating: 4.9,
      reviews: 87,
      features: ["Private Garden", "Swimming Pool", "Solar Power", "Smart Home", "Security", "Club House"],
      highlights: ["Gated Community", "24/7 Security", "Landscape Garden", "Premium Finishes"],
      possession: "Immediate",
      type: "Independent Villa"
    },
    {
      id: 2,
      name: "Smart Eco Villas",
      category: "eco-friendly",
      location: "Sellur, Madurai",
      price: "₹95 Lakhs onwards",
      bedrooms: "3 BHK",
      bathrooms: "3",
      area: "2200-2600 sq ft",
      plotSize: "1800-2200 sq ft",
      parking: "Covered",
      status: "Under Construction",
      rating: 4.8,
      reviews: 65,
      features: ["Rain Water Harvesting", "Solar Panels", "Organic Garden", "EV Charging", "Green Building", "Natural Ventilation"],
      highlights: ["Eco-Certified", "Energy Efficient", "Sustainable Living", "Zero Waste"],
      possession: "March 2026",
      type: "Eco Villa"
    },
    {
      id: 3,
      name: "Royal Heritage Villas",
      category: "luxury",
      location: "Anna Nagar Extension, Madurai",
      price: "₹1.8 Crores onwards",
      bedrooms: "4-5 BHK",
      bathrooms: "4-5",
      area: "3500-4200 sq ft",
      plotSize: "3000-3600 sq ft",
      parking: "Multi-car Garage",
      status: "Pre-Launch",
      rating: 4.9,
      reviews: 23,
      features: ["Private Pool", "Home Theater", "Wine Cellar", "Butler Service", "Concierge", "Spa Room"],
      highlights: ["Ultra-Luxury", "Premium Location", "Architectural Marvel", "Exclusive Community"],
      possession: "December 2026",
      type: "Luxury Villa"
    },
    {
      id: 4,
      name: "Smart Family Villas",
      category: "family",
      location: "Samayanallur, Madurai",
      price: "₹75 Lakhs onwards",
      bedrooms: "2-3 BHK",
      bathrooms: "2-3",
      area: "1800-2200 sq ft",
      plotSize: "1500-1800 sq ft",
      parking: "Open + Covered",
      status: "New Launch",
      rating: 4.7,
      reviews: 45,
      features: ["Modular Kitchen", "Garden Space", "Children Play Area", "Community Hall", "Security", "Power Backup"],
      highlights: ["Family Oriented", "Affordable Luxury", "Great Connectivity", "Schools Nearby"],
      possession: "June 2025",
      type: "Family Villa"
    }
  ];

  const villaTypes = [
    {
      type: "Independent Villas",
      description: "Standalone villas with complete privacy and spacious layouts",
      features: ["Private Garden", "Individual Gate", "No Shared Walls", "Complete Privacy"],
      priceRange: "₹85L - ₹2Cr",
      icon: Home
    },
    {
      type: "Row Houses",
      description: "Modern row houses with contemporary designs and community living",
      features: ["Gated Community", "Shared Amenities", "Security", "Maintenance"],
      priceRange: "₹65L - ₹1.2Cr",
      icon: Building
    },
    {
      type: "Eco Villas",
      description: "Sustainable villas with green building features and eco-friendly designs",
      features: ["Solar Power", "Rain Water Harvesting", "Organic Gardens", "Green Materials"],
      priceRange: "₹75L - ₹1.5Cr",
      icon: Leaf
    },
    {
      type: "Luxury Villas",
      description: "Premium villas with high-end finishes and exclusive amenities",
      features: ["Private Pool", "Home Automation", "Premium Finishes", "Concierge Services"],
      priceRange: "₹1.2Cr - ₹3Cr",
      icon: Star
    }
  ];

  const amenities = [
    { icon: TreePine, name: "Landscaped Gardens", desc: "Professionally designed green spaces" },
    { icon: Car, name: "Private Parking", desc: "Dedicated parking for multiple vehicles" },
    { icon: Sun, name: "Solar Power", desc: "Renewable energy systems" },
    { icon: Droplets, name: "Swimming Pool", desc: "Private or community swimming pools" }
  ];

  const filteredVillas = activeTab === "all" 
    ? villas 
    : villas.filter(villa => villa.category === activeTab);

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation */}
          <header className="relative bg-transparent pt-4 sm:pt-8 lg:pt-12">
            <nav className="flex items-center justify-between py-4 mb-8 lg:mb-12">
              <div className="flex items-center space-x-2">
                
                <img 
                  src="/logo.jpg" 
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
                Independent Villas in Madurai
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] leading-tight mb-6">
                <span className="text-[#b48b2f]">Elegant</span> Villas
                <br />
                for <span className="text-[#b48b2f]">Premium</span> Living
              </h1>
              <p className="text-lg sm:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-7 mb-8 max-w-2xl mx-auto">
                Experience the pinnacle of luxury living in our meticulously designed independent villas featuring private gardens, modern amenities, and premium locations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  Explore Villas
                </Button>
                <Button variant="outline" className="border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Tour
                </Button>
              </div>
            </div>
          </section>

          {/* Villa Types */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Villa <span className="text-[#b48b2f]">Categories</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Choose from our diverse range of villa styles designed to match your lifestyle and preferences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {villaTypes.map((villa, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <villa.icon className="w-12 h-12 mx-auto mb-4 text-[#b48b2f]" />
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {villa.type}
                    </CardTitle>
                    <CardDescription className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-4">
                      {villa.description}
                    </CardDescription>
                    <div className="text-sm font-semibold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-3">
                      {villa.priceRange}
                    </div>
                    <div className="space-y-1">
                      {villa.features.slice(0, 2).map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center text-xs text-[#6b6b6b]">
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

          {/* Filter Tabs */}
          <section className="mb-12">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto">
                <TabsTrigger value="all" className="[font-family:'Poppins',Helvetica]">All Villas</TabsTrigger>
                <TabsTrigger value="luxury" className="[font-family:'Poppins',Helvetica]">Luxury</TabsTrigger>
                <TabsTrigger value="eco-friendly" className="[font-family:'Poppins',Helvetica]">Eco-Friendly</TabsTrigger>
                <TabsTrigger value="family" className="[font-family:'Poppins',Helvetica]">Family</TabsTrigger>
              </TabsList>
            </Tabs>
          </section>

          {/* Villas Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredVillas.map((villa) => (
                <Card key={villa.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="relative h-64 bg-gradient-to-br from-[#b48b2f]/10 to-[#b48b2f]/20">
                    <div className="absolute top-4 left-4 space-y-2">
                      <Badge className="bg-[#b48b2f] text-white">
                        {villa.status}
                      </Badge>
                      <Badge className="bg-white text-[#b48b2f]">
                        {villa.type}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="font-semibold text-sm text-[#313131]">{villa.rating}</span>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Home className="w-20 h-20 text-[#b48b2f] opacity-40" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                        {villa.name}
                      </CardTitle>
                      <div className="flex items-center text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-1">
                        <MapPin className="w-4 h-4 mr-1 text-[#b48b2f]" />
                        {villa.location}
                      </div>
                      <div className="text-xs text-[#6b6b6b]">Possession: {villa.possession}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-[#6b6b6b]">
                        <Bed className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {villa.bedrooms}
                      </div>
                      <div className="flex items-center text-[#6b6b6b]">
                        <Bath className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {villa.bathrooms}
                      </div>
                      <div className="flex items-center text-[#6b6b6b]">
                        <Square className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {villa.area}
                      </div>
                      <div className="flex items-center text-[#6b6b6b]">
                        <TreePine className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {villa.plotSize}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="font-bold text-xl text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-2">
                        {villa.price}
                      </div>
                      <div className="text-sm text-[#6b6b6b] flex items-center">
                        <Car className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {villa.parking}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">Key Features</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {villa.features.slice(0, 4).map((feature, index) => (
                          <div key={index} className="flex items-center text-xs text-[#6b6b6b]">
                            <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-1">
                        {villa.highlights.map((highlight, index) => (
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
                </Card>
              ))}
            </div>
          </section>

          {/* Amenities */}
          <section className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                <span className="text-[#b48b2f]">Premium</span> Villa Amenities
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Enjoy exclusive amenities designed for luxury living and complete comfort.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {amenities.map((amenity, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <amenity.icon className="w-12 h-12 mx-auto mb-4 text-[#b48b2f]" />
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {amenity.name}
                    </CardTitle>
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {amenity.desc}
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
                  Own Your Dream Villa Today
                </h2>
                <p className="text-lg [font-family:'Poppins',Helvetica] mb-8 opacity-90 max-w-2xl mx-auto">
                  Experience luxury living with our premium villas. Book a private tour or speak with our villa specialists.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-[#b48b2f] hover:bg-gray-100 rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Villa Expert
                  </Button>
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#b48b2f] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                    <Mail className="w-4 h-4 mr-2" />
                    Villa Brochure
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