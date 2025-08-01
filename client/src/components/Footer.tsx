import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Building,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Eye,
} from "lucide-react";
import { NewsletterForm } from "@/components/forms";
import { useVisitCounter } from "@/hooks/useVisitCounter";

export const Footer = (): JSX.Element => {
  const { counter, loading } = useVisitCounter(30000); // Refresh every 30 seconds

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
    { name: "Gallery", path: "/gallery" },
    { name: "Admin", path: "/admin" },
  ];

  const services = [
    "Construction Services",
    "Interior Design",
    "Project Management",
    "Legal Services",
    "Home Loans",
    "Property Investment",
  ];

  const locations = [
    "Ramnagar, Madurai",
    "KK Nagar, Madurai",
    "Samayanallur, Madurai",
    "Thiruparankundram, Madurai",
    "Bypass Road, Madurai",
    "SIPCOT Area, Madurai",
  ];

  return (
    <footer className="bg-[#313131] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-8 bg-white rounded-sm p-1 flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="Smart Builders Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                  Smart Builders
                </div>
                <div className="text-sm text-gray-300">& Developers</div>
              </div>
            </div>
            <p className="text-gray-300 text-sm [font-family:'Poppins',Helvetica] leading-6">
              Building dreams and creating lifestyles with 25+ years of
              excellence in construction and development across Madurai.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="w-4 h-4 mr-2 text-[#b48b2f]" />
                23/72, Ramnagar 3rd Street, S S Colony, Bypass Rd, Madurai -
                625016
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="w-4 h-4 mr-2 text-[#b48b2f]" />
                +91 96004 52274
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="w-4 h-4 mr-2 text-[#b48b2f]" />
                info@smartbuilders.com
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
                <li
                  key={index}
                  className="text-gray-300 text-sm [font-family:'Poppins',Helvetica]"
                >
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
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-8 h-8 p-0 text-gray-300 hover:text-[#b48b2f] hover:bg-[#b48b2f]/10"
                >
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
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-[#b48b2f]" />
              <span>
                Site Visits:{" "}
                {loading
                  ? "..."
                  : counter?.totalVisits?.toLocaleString("en-IN") || "0"}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Designed & Developed by{" "}
            <a
              href="https://www.godivatech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#b48b2f] hover:text-[#9d7829] transition-colors font-medium"
            >
              GodivaTeach
            </a>
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
            <Button
              onClick={() => window.open("tel:+1234567890", "_self")}
              className="bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[20px_2px_20px_2px] px-6 py-2 font-medium [font-family:'Poppins',Helvetica]"
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
            <Button
              onClick={() => (window.location.href = "/contact")}
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
