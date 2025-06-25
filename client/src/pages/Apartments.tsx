import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Bed, Bath, Square, Car, Star, CheckCircle, ArrowRight, Building, Calendar, Users, Wifi, Shield } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useNavigation } from "@/lib/navigation";
import { ContactForm, SiteVisitForm } from "@/components/forms";

export const Apartments = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { navigate } = useNavigation();
  
  const navItems = [
    { name: "Home", path: "/", active: false },
    { name: "Residential", path: "/residential", active: false },
    { name: "Apartments", path: "/apartments", active: true },
    { name: "Villas", path: "/villas", active: false },
    { name: "Mini Apartments", path: "/mini-apartments", active: false },
    { name: "Land Promotion", path: "/land-promotion", active: false },
    { name: "About", path: "/about", active: false },
    { name: "Contact", path: "/contact", active: false },
  ];

  const apartments = [
    {
      id: 1,
      name: "Smart Residency Elite",
      location: "Anna Nagar, Madurai",
      price: "₹45 Lakhs onwards",
      originalPrice: "₹52 Lakhs",
      bedrooms: "2-3 BHK",
      bathrooms: "2-3",
      area: "1200-1800 sq ft",
      parking: "Covered",
      status: "Ready to Move",
      completionPercentage: 100,
      rating: 4.8,
      reviews: 156,
      totalUnits: 120,
      soldUnits: 95,
      amenities: ["Swimming Pool", "Gym", "Children's Play Area", "24/7 Security", "Power Backup", "Lift", "Intercom", "CCTV"],
      highlights: ["Vastu Compliant", "Earthquake Resistant", "Rain Water Harvesting", "Solar Lighting"],
      launchDate: "Possession Ready",
      developer: "Smart Builders",
      rera: "TN/04/Building/0123/2023"
    },
    {
      id: 2,
      name: "Grand Heights Premium",
      location: "KK Nagar, Madurai",
      price: "₹65 Lakhs onwards",
      originalPrice: "₹70 Lakhs",
      bedrooms: "2-4 BHK",
      bathrooms: "2-4",
      area: "1400-2400 sq ft",
      parking: "Covered + Visitor",
      status: "Pre-Launch",
      completionPercentage: 25,
      rating: 4.9,
      reviews: 89,
      totalUnits: 150,
      soldUnits: 45,
      amenities: ["Sky Garden", "Terrace Pool", "Yoga Deck", "Club House", "Banquet Hall", "EV Charging", "Smart Home", "Concierge"],
      highlights: ["Premium Location", "Green Building", "Smart Automation", "High-Speed Elevators"],
      launchDate: "Expected Dec 2025",
      developer: "Smart Builders",
      rera: "TN/04/Building/0456/2024"
    },
    {
      id: 3,
      name: "Metro View Apartments",
      location: "Bypass Road, Madurai",
      price: "₹38 Lakhs onwards",
      originalPrice: "₹42 Lakhs",
      bedrooms: "1-2 BHK",
      bathrooms: "1-2",
      area: "750-1200 sq ft",
      parking: "Open + Covered",
      status: "Under Construction",
      completionPercentage: 65,
      rating: 4.7,
      reviews: 72,
      totalUnits: 80,
      soldUnits: 52,
      amenities: ["Garden", "Security", "Power Backup", "Water Supply", "Parking", "Lift", "Fire Safety", "Waste Management"],
      highlights: ["Metro Connectivity", "IT Hub Proximity", "Budget Friendly", "First Home Buyers"],
      launchDate: "Possession: Aug 2025",
      developer: "Smart Builders",
      rera: "TN/04/Building/0789/2024"
    }
  ];

  const floorPlans = [
    { type: "1 BHK", area: "650-750 sq ft", price: "₹25-30 Lakhs", rooms: "1 Bedroom, 1 Bathroom, Kitchen, Living" },
    { type: "2 BHK", area: "1200-1400 sq ft", price: "₹40-50 Lakhs", rooms: "2 Bedrooms, 2 Bathrooms, Kitchen, Living, Dining" },
    { type: "3 BHK", area: "1600-1800 sq ft", price: "₹55-65 Lakhs", rooms: "3 Bedrooms, 2-3 Bathrooms, Kitchen, Living, Dining, Balcony" },
    { type: "4 BHK", area: "2200-2400 sq ft", price: "₹75-85 Lakhs", rooms: "4 Bedrooms, 3-4 Bathrooms, Kitchen, Living, Dining, 2 Balconies" }
  ];

  const commonAmenities = [
    { icon: Shield, name: "24/7 Security", desc: "CCTV surveillance and security guards" },
    { icon: Car, name: "Parking", desc: "Covered parking for residents and visitors" },
    { icon: Wifi, name: "Internet Ready", desc: "High-speed fiber optic internet" },
    { icon: Users, name: "Community Hall", desc: "Multipurpose hall for events" }
  ];

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

              {/* Mobile Menu */}
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
                Premium Apartments in Madurai
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] leading-tight mb-6">
                <span className="text-[#b48b2f]">Luxury</span> Apartments
                <br />
                with <span className="text-[#b48b2f]">Modern</span> Amenities
              </h1>
              <p className="text-lg sm:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-7 mb-8 max-w-2xl mx-auto">
                Experience sophisticated living in our thoughtfully designed apartments featuring world-class amenities and prime locations across Madurai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  Explore Apartments
                </Button>
                <Button variant="outline" className="border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Site Visit
                </Button>
              </div>
            </div>
          </section>

          {/* Apartments Grid */}
          <section className="mb-16">
            <div className="space-y-12">
              {apartments.map((apartment) => (
                <Card key={apartment.id} className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-shadow">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    {/* Image Section */}
                    <div className="relative h-80 lg:h-full bg-gradient-to-br from-[#b48b2f]/10 to-[#b48b2f]/20">
                      <div className="absolute top-4 left-4 space-y-2">
                        <Badge className="bg-[#b48b2f] text-white">
                          {apartment.status}
                        </Badge>
                        {apartment.originalPrice && (
                          <Badge className="bg-green-500 text-white">
                            Save ₹{(parseInt(apartment.originalPrice.replace(/[₹,\s]/g, '')) - parseInt(apartment.price.replace(/[₹,\s]/g, ''))).toLocaleString('en-IN')}
                          </Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Building className="w-24 h-24 text-[#b48b2f] opacity-40" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-[#6b6b6b]">Construction Progress</span>
                            <span className="font-semibold text-[#313131]">{apartment.completionPercentage}%</span>
                          </div>
                          <Progress value={apartment.completionPercentage} className="mt-2" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <CardTitle className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                            {apartment.name}
                          </CardTitle>
                          <div className="flex items-center text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-1">
                            <MapPin className="w-4 h-4 mr-1 text-[#b48b2f]" />
                            {apartment.location}
                          </div>
                          <div className="text-xs text-[#6b6b6b]">RERA: {apartment.rera}</div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center mb-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="font-semibold text-[#313131]">{apartment.rating}</span>
                            <span className="text-sm text-[#6b6b6b] ml-1">({apartment.reviews})</span>
                          </div>
                          <div className="text-xs text-[#6b6b6b]">
                            {apartment.soldUnits}/{apartment.totalUnits} sold
                          </div>
                        </div>
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
                          {apartment.originalPrice && (
                            <div className="text-lg text-[#6b6b6b] line-through [font-family:'Poppins',Helvetica]">
                              {apartment.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-[#6b6b6b] flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-[#b48b2f]" />
                          {apartment.launchDate}
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
                        {apartment.amenities.length > 6 && (
                          <div className="text-xs text-[#b48b2f] mt-2">
                            +{apartment.amenities.length - 6} more amenities
                          </div>
                        )}
                      </div>

                      <div className="mb-6">
                        <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">Key Highlights</h4>
                        <div className="flex flex-wrap gap-2">
                          {apartment.highlights.map((highlight, index) => (
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
                        <Button variant="outline" className="border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[20px_2px_20px_2px] px-6">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Floor Plans */}
          <section className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Choose Your <span className="text-[#b48b2f]">Perfect Layout</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                From compact 1 BHK to spacious 4 BHK apartments, find the perfect size for your family.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {floorPlans.map((plan, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#b48b2f]/10 rounded-full flex items-center justify-center">
                      
                <img 
                  src="/attached_assets/construction_1750832040927.jpg" 
                  alt="Company Logo" 
                  className="w-12 h-8 sm:w-16 sm:h-10 lg:w-20 lg:h-12 object-contain"
                />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {plan.type}
                    </CardTitle>
                    <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica] mb-2">
                      {plan.area}
                    </div>
                    <div className="font-semibold text-lg text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-3">
                      {plan.price}
                    </div>
                    <div className="text-xs text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-4">
                      {plan.rooms}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Common Amenities */}
          <section className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                <span className="text-[#b48b2f]">Premium</span> Amenities
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Enjoy world-class facilities designed for comfort, convenience, and community living.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {commonAmenities.map((amenity, index) => (
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

          {/* Contact Section */}
          <section className="mt-16 lg:mt-24 mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl xl:text-[48px] font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Book Your <span className="text-[#b48b2f]">Dream Apartment</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                Limited units available with exclusive offers. Schedule a visit or get detailed pricing information.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <SiteVisitForm projectName="Apartment Complex" />
              <ContactForm 
                title="Get Detailed Pricing" 
                subtitle="Receive comprehensive pricing details and payment plans"
              />
            </div>
          </section>

        </div>
      </div>
      <Footer />
    </div>
  );
};