import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MapPin, Phone, Mail, Bed, Bath, Square, Car, Star, CheckCircle, ArrowRight, Building } from "lucide-react";
import { Footer } from "@/components/Footer";
import { useNavigation } from "@/lib/navigation";
import { SiteVisitForm } from "@/components/forms";

export const Residential = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const { navigate } = useNavigation();
  
  const navItems = [
    { name: "Home", path: "/", active: false },
    { name: "Residential", path: "/residential", active: true },
    { name: "Apartments", path: "/apartments", active: false },
    { name: "Villas", path: "/villas", active: false },
    { name: "Mini Apartments", path: "/mini-apartments", active: false },
    { name: "Land Promotion", path: "/land-promotion", active: false },
    { name: "About", path: "/about", active: false },
    { name: "Contact", path: "/contact", active: false },
  ];

  const projects = [
    {
      id: 1,
      name: "Smart Residency",
      type: "apartments",
      location: "Anna Nagar, Madurai",
      price: "₹45 Lakhs onwards",
      bedrooms: "2-3 BHK",
      bathrooms: "2-3",
      area: "1200-1800 sq ft",
      parking: "Covered",
      status: "Ready to Move",
      rating: 4.8,
      features: ["Modular Kitchen", "Gym", "Swimming Pool", "Security", "Power Backup"],
      image: "/figmaAssets/project1.jpg",
      badge: "Best Seller"
    },
    {
      id: 2,
      name: "Elite Villas",
      type: "villas",
      location: "Thiruparankundram, Madurai",
      price: "₹85 Lakhs onwards",
      bedrooms: "3-4 BHK",
      bathrooms: "3-4",
      area: "2200-2800 sq ft",
      parking: "Private Garage",
      status: "Under Construction",
      rating: 4.9,
      features: ["Private Garden", "Solar Power", "Smart Home", "Club House", "24/7 Security"],
      image: "/figmaAssets/project2.jpg",
      badge: "Premium"
    },
    {
      id: 3,
      name: "Smart Studios",
      type: "mini-apartments",
      location: "Samayanallur, Madurai",
      price: "₹25 Lakhs onwards",
      bedrooms: "1 BHK",
      bathrooms: "1",
      area: "650-850 sq ft",
      parking: "Open",
      status: "New Launch",
      rating: 4.7,
      features: ["Compact Design", "Furnished", "Wi-Fi Ready", "Cafeteria", "Laundry"],
      image: "/figmaAssets/project3.jpg",
      badge: "Affordable"
    },
    {
      id: 4,
      name: "Grand Heights",
      type: "apartments",
      location: "KK Nagar, Madurai",
      price: "₹65 Lakhs onwards",
      bedrooms: "2-4 BHK",
      bathrooms: "2-4",
      area: "1400-2400 sq ft",
      parking: "Covered",
      status: "Pre-Launch",
      rating: 4.8,
      features: ["Sky Garden", "Terrace Pool", "Yoga Deck", "Kids Play Area", "EV Charging"],
      image: "/figmaAssets/project4.jpg",
      badge: "Luxury"
    }
  ];

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.type === activeCategory);

  const features = [
    { icon: CheckCircle, title: "Premium Locations", desc: "Strategic locations with excellent connectivity" },
    { icon: CheckCircle, title: "Quality Construction", desc: "ISI marked materials and expert craftsmanship" },
    { icon: CheckCircle, title: "Modern Amenities", desc: "Contemporary facilities for comfortable living" },
    { icon: CheckCircle, title: "Legal Compliance", desc: "All approvals and clear title documents" },
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Navigation */}
          <header className="relative bg-transparent pt-4 sm:pt-8 lg:pt-12">
            <nav className="flex items-center justify-between py-4 mb-8 lg:mb-12">
              <div className="flex items-center">
                <img 
                  src="/attached_assets/construction_1750785320323.jpg" 
                  alt="Company Logo" 
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
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
                Residential Projects in Madurai
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] leading-tight mb-6">
                <span className="text-[#b48b2f]">Premium</span> Residential
                <br />
                Projects for <span className="text-[#b48b2f]">Modern Living</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-7 mb-8 max-w-2xl mx-auto">
                Discover our carefully crafted residential projects featuring contemporary designs, premium amenities, and strategic locations across Madurai.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  View All Projects
                </Button>
                <Button variant="outline" className="border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Visit
                </Button>
              </div>
            </div>
          </section>

          {/* Filter Tabs */}
          <section className="mb-12">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4 mx-auto">
                <TabsTrigger value="all" className="[font-family:'Poppins',Helvetica]">All Projects</TabsTrigger>
                <TabsTrigger value="apartments" className="[font-family:'Poppins',Helvetica]">Apartments</TabsTrigger>
                <TabsTrigger value="villas" className="[font-family:'Poppins',Helvetica]">Villas</TabsTrigger>
                <TabsTrigger value="mini-apartments" className="[font-family:'Poppins',Helvetica]">Mini Apts</TabsTrigger>
              </TabsList>
            </Tabs>
          </section>

          {/* Projects Grid */}
          <section className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="group hover:shadow-2xl transition-all duration-300 border-none overflow-hidden">
                  <div className="relative h-64 bg-gradient-to-br from-[#b48b2f]/10 to-[#b48b2f]/20">
                    <Badge className="absolute top-4 right-4 bg-[#b48b2f] text-white z-10">
                      {project.badge}
                    </Badge>
                    <Badge className="absolute top-4 left-4 bg-white text-[#b48b2f] z-10">
                      {project.status}
                    </Badge>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Building className="w-20 h-20 text-[#b48b2f] opacity-40" />
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-1">
                          {project.name}
                        </CardTitle>
                        <div className="flex items-center text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                          <MapPin className="w-4 h-4 mr-1 text-[#b48b2f]" />
                          {project.location}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm font-medium text-[#313131]">{project.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center text-[#6b6b6b]">
                        <Bed className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {project.bedrooms}
                      </div>
                      <div className="flex items-center text-[#6b6b6b]">
                        <Bath className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {project.bathrooms}
                      </div>
                      <div className="flex items-center text-[#6b6b6b]">
                        <Square className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {project.area}
                      </div>
                      <div className="flex items-center text-[#6b6b6b]">
                        <Car className="w-4 h-4 mr-2 text-[#b48b2f]" />
                        {project.parking}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="font-bold text-lg text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-2">
                        {project.price}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {project.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{project.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[20px_2px_20px_2px] font-medium [font-family:'Poppins',Helvetica]">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" className="border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[20px_2px_20px_2px]">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16 lg:mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                Why Choose <span className="text-[#b48b2f]">Smart Builders</span>
              </h2>
              <p className="text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] max-w-2xl mx-auto">
                We bring 25+ years of expertise in creating exceptional residential spaces that combine quality, comfort, and value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow border-none bg-neutral-50/50">
                  <CardContent className="p-0">
                    <feature.icon className="w-12 h-12 mx-auto mb-4 text-[#b48b2f]" />
                    <CardTitle className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                      {feature.desc}
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
                  Find Your Perfect Home Today
                </h2>
                <p className="text-lg [font-family:'Poppins',Helvetica] mb-8 opacity-90 max-w-2xl mx-auto">
                  Book a site visit or speak with our experts to explore the best residential options in Madurai.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-white text-[#b48b2f] hover:bg-gray-100 rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                    <Phone className="w-4 h-4 mr-2" />
                    Call +91 98765 43210
                  </Button>
                  <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#b48b2f] rounded-[40px_5px_40px_5px] px-8 py-4 font-medium [font-family:'Poppins',Helvetica]">
                    <Mail className="w-4 h-4 mr-2" />
                    Request Brochure
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