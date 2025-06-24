import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const Section = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation menu items
  const navItems = [
    { name: "Home", active: true },
    { name: "About Us", active: false },
    { name: "Services", active: false },
    { name: "Project", active: false },
  ];

  // Statistics data
  const stats = [
    { value: "25,356", label: "Projects Done" },
    { value: "15,200", label: "Buildings Done" },
    { value: "350+", label: "Total Employees" },
  ];

  // Partner logos
  const partnerLogos = [
    { src: "/figmaAssets/logo-2.png", alt: "Logo" },
    { src: "/figmaAssets/type.png", alt: "Type" },
    { src: "/figmaAssets/dots-wrapper.png", alt: "Dots wrapper" },
    { src: "/figmaAssets/text.png", alt: "Text" },
    { src: "/figmaAssets/logo.png", alt: "Logo" },
    { src: "/figmaAssets/logo-1.png", alt: "Logo" },
  ];

  return (
    <div className="bg-white min-h-screen w-full">
      <div className="bg-white overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Background decorative element */}
          <img
            className="absolute w-48 h-48 sm:w-80 sm:h-80 lg:w-[632px] lg:h-[608px] top-96 sm:top-80 lg:top-[565px] left-0 opacity-30 lg:opacity-100 -z-10"
            alt="Vector"
            src="/figmaAssets/vector-11.svg"
          />

          <header className="relative bg-transparent pt-4 sm:pt-8 lg:pt-12">
            <div className="relative">
              {/* Navigation */}
              <nav className="flex items-center justify-between py-4 mb-8 lg:mb-16">
                <div className="text-xl sm:text-2xl lg:text-[25px] font-semibold text-[#b48b2f] tracking-[-1.50px] [font-family:'Poppins',Helvetica]">
                  BuildMasters
                </div>
                
                {/* Desktop Navigation */}
                <NavigationMenu className="hidden lg:flex">
                  <NavigationMenuList className="flex gap-6 xl:gap-8">
                    {navItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className={`[font-family:'Poppins',Helvetica] text-base xl:text-lg text-[#313131] hover:text-[#b48b2f] transition-colors ${
                            item.active
                              ? "font-semibold relative after:absolute after:w-1 after:h-1 after:bg-[#313131] after:rounded-sm after:bottom-[-8px] after:left-1/2 after:-translate-x-1/2"
                              : "font-normal"
                          }`}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Mobile Menu */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      className="lg:hidden p-2"
                      aria-label="Toggle menu"
                    >
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
                          href="#"
                          className={`text-lg [font-family:'Poppins',Helvetica] hover:text-[#b48b2f] transition-colors px-4 py-2 ${
                            item.active
                              ? "font-semibold text-[#b48b2f] border-l-2 border-[#b48b2f]"
                              : "font-normal text-[#313131]"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      ))}
                      <div className="pt-4 px-4 space-y-3">
                        <Button className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white font-medium [font-family:'Poppins',Helvetica]">
                          Explore
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-2 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white font-medium [font-family:'Poppins',Helvetica]"
                        >
                          Contact Us
                        </Button>
                      </div>
                    </nav>
                  </SheetContent>
                </Sheet>
              </nav>

              {/* Main Content Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] lg:min-h-[70vh]">
                {/* Left Content */}
                <div className="order-2 lg:order-1 space-y-6 lg:space-y-8">
                  {/* Heading */}
                  <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[64px] font-bold [font-family:'Poppins',Helvetica] leading-tight lg:leading-[64px] tracking-[-1.64px]">
                      <span className="text-[#b48b2f]">Masters</span>
                      <span className="text-[#313131]"> of</span>
                      <br />
                      <span className="text-[#313131]">Consistency and</span>
                      <br />
                      <span className="text-[#b48b2f]">Quality</span>
                      <span className="text-[#313131]">.</span>
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-base sm:text-lg text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-7 max-w-lg">
                    Blessing welcomed ladyship she met humoured sir breeding her.
                    Six curiosity day assurance bed necessary.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-3">
                    <Button className="w-full sm:w-auto px-8 py-4 h-auto bg-[#b48b2f] hover:bg-[#9d7829] rounded-[40px_5px_40px_5px] shadow-[0px_1.85px_3.15px_#18a7b906,0px_8.15px_6.52px_#18a7b90a,0px_20px_13px_#18a7b90d,0px_38.52px_25.48px_#18a7b910,0px_64.81px_46.85px_#18a7b913] text-white text-base lg:text-[17px] font-medium [font-family:'Poppins',Helvetica] tracking-[-0.50px]">
                      Explore
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto px-8 py-4 h-auto rounded-[40px_5px_40px_5px] border-2 border-[#b48b2f] hover:bg-[#b48b2f] hover:text-white text-[#b48b2f] text-base lg:text-[17px] font-medium [font-family:'Poppins',Helvetica] tracking-[-0.50px] shadow-[0px_1.85px_3.15px_#38383806,0px_8.15px_6.52px_#3838380a,0px_20px_13px_#3838380d,0px_38.52px_25.48px_#38383810,0px_64.81px_46.85px_#38383813,0px_100px_80px_#3838381a]"
                    >
                      Contact Us
                    </Button>
                  </div>

                  {/* Statistics */}
                  <div className="pt-8 lg:pt-12">
                    <div className="grid grid-cols-3 gap-4 sm:gap-8 lg:gap-12">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center relative">
                          <img
                            className="w-6 h-6 sm:w-8 sm:h-8 lg:w-[34px] lg:h-[38px] mx-auto mb-2 opacity-60"
                            alt="Ellipse"
                            src="/figmaAssets/ellipse-741.svg"
                          />
                          <div className="text-xl sm:text-2xl lg:text-3xl xl:text-[40px] font-medium text-[#313131] [font-family:'Poppins',Helvetica] leading-tight">
                            {stat.value}
                          </div>
                          <div className="text-sm sm:text-base lg:text-xl text-[#6b6b6b] [font-family:'Poppins',Helvetica] leading-6">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side with image and decorative elements */}
                <div className="order-1 lg:order-2 relative h-64 sm:h-80 md:h-96 lg:h-[600px] xl:h-[700px]">
                  {/* Decorative elements */}
                  <div className="absolute top-4 sm:top-8 lg:top-[97px] left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[238px] lg:h-[213px] bg-[#c9e7ff] rounded-[106.5px_5px_5px_5px] opacity-40" />
                  <div className="absolute bottom-4 sm:bottom-8 lg:bottom-[50px] right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-[238px] lg:h-[213px] bg-[#c9e7ff] rounded-[106.5px_5px_5px_5px] opacity-40 rotate-180" />
                  
                  {/* Main building image */}
                  <div className="absolute inset-2 sm:inset-4 md:inset-6 lg:inset-12 flex items-center justify-center">
                    <img
                      className="w-full h-full object-contain"
                      alt="Modern building showcasing BuildMasters' construction expertise"
                      src="/figmaAssets/mask-group.png"
                    />
                  </div>
                </div>
              </div>

            </div>
          </header>

          {/* Partners section */}
          <section className="mt-16 lg:mt-24 mb-8" aria-label="Our trusted partners">
            <Card className="mx-auto bg-neutral-50 rounded-3xl sm:rounded-[60px] lg:rounded-[150px] border-none p-6 sm:p-8 lg:p-12">
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20 2xl:gap-[100px]">
                {partnerLogos.map((logo, index) => (
                  <div key={index} className="flex items-center justify-center h-6 sm:h-8 md:h-10 lg:h-12">
                    <img
                      className="max-h-full w-auto object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                      alt={`${logo.alt} - Trusted partner`}
                      src={logo.src}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
};
