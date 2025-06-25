import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Clock, Building, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { NewsletterForm } from "@/components/forms";

export const Footer = (): JSX.Element => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Residential", path: "/residential" },
    { name: "Apartments", path: "/apartments" },
    { name: "Villas", path: "/villas" },
    { name: "Mini Apartments", path: "/mini-apartments" },
    { name: "Land Promotion", path: "/land-promotion" }
  ];

  const services = [
    "Construction Services",
    "Interior Design",
    "Project Management", 
    "Legal Services",
    "Home Loans",
    "Property Investment"
  ];

  const locations = [
    "Anna Nagar, Madurai",
    "KK Nagar, Madurai", 
    "Samayanallur, Madurai",
    "Thiruparankundram, Madurai",
    "Bypass Road, Madurai",
    "SIPCOT Area, Madurai"
  ];

  return (
    <footer className="bg-[#313131] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Building className="w-8 h-8 text-[#b48b2f]" />
              <div>
                <div className="text-xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                  Smart Builders
                </div>
                <div className="text-sm text-gray-300">& Developers</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm [font-family:'Poppins',Helvetica] leading-6">
              Building dreams and creating lifestyles with 25+ years of excellence in construction and development across Madurai.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-[#b48b2f]" />
                123 Main Road, Anna Nagar, Madurai - 625020
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-[#b48b2f]" />
                +91 98765 43210
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-[#b48b2f]" />
                info@buildmasters.com
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Clock className="w-4 h-4 mr-2 text-[#b48b2f]" />
                Mon-Sat: 9:00 AM - 6:00 PM
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-gray-300 hover:text-[#b48b2f] transition-colors text-sm [font-family:'Poppins',Helvetica]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
              Our Services
            </h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 text-sm [font-family:'Poppins',Helvetica]">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-4">
            <NewsletterForm 
              title="Stay Updated"
              subtitle="Get latest updates & offers"
              variant="inline"
              className="bg-gray-800 p-4 rounded-lg"
            />
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-3">
                Follow Us
              </h4>
              <div className="flex space-x-3">
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10">
                  <Linkedin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-600" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-300">
            <div>© 2025 Smart Builders & Developers. All rights reserved.</div>
            <div className="hidden md:block">|</div>
            <div>RERA Reg: TN/04/Building/0123/2023</div>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-300 hover:text-[#b48b2f] transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-[#b48b2f] transition-colors">Terms & Conditions</a>
            <a href="#" className="text-gray-300 hover:text-[#b48b2f] transition-colors">Sitemap</a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 bg-[#b48b2f]/10 rounded-lg p-6 text-center">
          <h3 className="text-xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica] mb-2">
            Ready to Build Your Dream Home?
          </h3>
          <p className="text-gray-300 text-sm [font-family:'Poppins',Helvetica] mb-4">
            Get in touch with our experts for a free consultation
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[20px_2px_20px_2px] px-6 py-2 font-medium [font-family:'Poppins',Helvetica]">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button 
              variant="outline" 
              className="border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white rounded-[20px_2px_20px_2px] px-6 py-2 font-medium [font-family:'Poppins',Helvetica]"
            >
              <Mail className="w-4 h-4 mr-2" />
              Get Quote
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};