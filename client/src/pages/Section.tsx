import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export const Section = (): JSX.Element => {
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
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white overflow-hidden w-[1440px] h-[990px]">
        <div className="relative w-[1390px] h-[1173px] top-[50px]">
          <img
            className="absolute w-[632px] h-[608px] top-[565px] left-0"
            alt="Vector"
            src="/figmaAssets/vector-11.svg"
          />

          <header className="absolute w-[1255px] h-[933px] top-0 left-[135px] bg-transparent">
            <div className="relative w-[1255px] h-[933px]">
              {/* Right side with image and decorative elements */}
              <div className="absolute w-[744px] h-[933px] top-0 left-[511px]">
                <div className="relative h-[933px]">
                  <div className="top-[97px] left-0 absolute w-[238px] h-[213px] bg-[#c9e7ff] rounded-[106.5px_5px_5px_5px] opacity-40" />
                  <div className="top-[720px] left-[480px] rotate-180 absolute w-[238px] h-[213px] bg-[#c9e7ff] rounded-[106.5px_5px_5px_5px] opacity-40" />
                  <img
                    className="absolute w-[647px] h-[850px] top-0 left-[97px]"
                    alt="Building"
                    src="/figmaAssets/mask-group.png"
                  />
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute w-[1170px] h-[38px] top-5 left-0">
                <NavigationMenu className="absolute w-[387px] h-[30px] top-1 left-[789px]">
                  <NavigationMenuList className="flex gap-8">
                    {navItems.map((item, index) => (
                      <NavigationMenuItem key={index}>
                        <NavigationMenuLink
                          className={`[font-family:'Poppins',Helvetica] text-lg text-[#313131] ${
                            item.active
                              ? "font-semibold relative after:absolute after:w-1 after:h-1 after:bg-[#313131] after:rounded-sm after:bottom-[-8px] after:left-[21px]"
                              : "font-normal"
                          }`}
                        >
                          {item.name}
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                </NavigationMenu>

                <div className="absolute w-[151px] h-[38px] top-0 left-0">
                  <div className="absolute top-0 left-0 [font-family:'Poppins',Helvetica] font-semibold text-[#17a6b8] text-[25px] tracking-[-1.50px] leading-[normal]">
                    BuildMasters
                  </div>
                </div>
              </div>

              {/* Main content section */}
              <div className="absolute w-[683px] h-[624px] top-44 left-5">
                {/* CTA Buttons */}
                <div className="absolute w-[443px] h-16 top-[367px] left-0 flex gap-[13px]">
                  <Button className="w-[214px] h-16 bg-[#17a6b8] rounded-[40px_5px_40px_5px] shadow-[0px_1.85px_3.15px_#18a7b906,0px_8.15px_6.52px_#18a7b90a,0px_20px_13px_#18a7b90d,0px_38.52px_25.48px_#18a7b910,0px_64.81px_46.85px_#18a7b913] [font-family:'Poppins',Helvetica] font-medium text-white text-[17px] tracking-[-0.50px]">
                    Explore
                  </Button>
                  <Button
                    variant="outline"
                    className="w-[214px] h-16 rounded-[40px_5px_40px_5px] border border-solid border-[#17a6b8] shadow-[0px_1.85px_3.15px_#38383806,0px_8.15px_6.52px_#3838380a,0px_20px_13px_#3838380d,0px_38.52px_25.48px_#38383810,0px_64.81px_46.85px_#38383813,0px_100px_80px_#3838381a] [font-family:'Poppins',Helvetica] font-medium text-[#17a6b8] text-[17px] tracking-[-0.50px]"
                  >
                    Contact Us
                  </Button>
                </div>

                {/* Description text */}
                <div className="absolute w-[541px] top-[271px] left-0 [font-family:'Poppins',Helvetica] font-normal text-[#6b6b6b] text-lg tracking-[0] leading-7">
                  Blessing welcomed ladyship she met humoured sir breeding her.
                  Six curiosity day assurance bed necessary.
                </div>

                {/* Heading */}
                <div className="absolute w-[683px] h-[231px] top-0 left-0">
                  <div className="absolute w-[681px] top-0 left-0 [font-family:'Poppins',Helvetica] font-normal text-transparent text-[64px] leading-[64px]">
                    <span className="font-bold text-[#17a6b8] tracking-[-1.64px] leading-[0.1px]">
                      Masters
                    </span>
                    <span className="font-bold text-[#313131] tracking-[-1.64px] leading-[0.1px]">
                      {" "}
                      of <br />
                      Consistency and <br />
                    </span>
                    <span className="font-bold text-[#17a6b8] tracking-[-1.64px] leading-[76.8px]">
                      Quality
                    </span>
                    <span className="font-bold text-[#313131] tracking-[-1.64px] leading-[0.1px]">
                      .
                    </span>
                  </div>
                </div>

                {/* Statistics */}
                <div className="absolute w-[562px] h-[103px] top-[521px] left-0">
                  <div className="relative h-[103px]">
                    <div className="absolute w-[447px] h-[60px] top-0 left-0">
                      {stats.map((stat, index) => (
                        <img
                          key={index}
                          className="absolute w-[34px] h-[38px] top-[9px] left-[9px]"
                          alt="Ellipse"
                          src="/figmaAssets/ellipse-741.svg"
                          style={{
                            left: `${9 + index * (index === 1 ? 186 : 200)}px`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="absolute w-[554px] h-[81px] top-[22px] left-2 flex gap-[48px]">
                      {stats.map((stat, index) => (
                        <Card
                          key={index}
                          className="border-none shadow-none bg-transparent w-auto"
                        >
                          <div
                            className={`w-[${index === 0 ? "141" : index === 1 ? "152" : "168"}px] h-[81px] flex flex-col items-center`}
                          >
                            <div className="[font-family:'Poppins',Helvetica] font-medium text-[#313131] text-[40px] text-center tracking-[0] leading-10 whitespace-nowrap">
                              {stat.value}
                            </div>
                            <div className="[font-family:'Poppins',Helvetica] font-normal text-[#6b6b6b] text-xl text-center tracking-[0] leading-[26px] whitespace-nowrap">
                              {stat.label}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Partners section */}
          <Card className="absolute w-[1170px] h-[180px] top-[947px] left-[135px] bg-neutral-50 rounded-[150px] border-none">
            <div className="relative w-[1007px] h-8 top-[74px] left-[82px]">
              <div className="inline-flex items-center justify-center gap-[100px] relative">
                {/* Partner logos */}
                <div className="relative w-[137px] h-[25.46px]">
                  <div className="relative w-[104px] h-[25px] top-[-1074px] left-[-2317px]">
                    <img
                      className="absolute w-[25px] h-[25px] top-0 left-0"
                      alt="Logo"
                      src="/figmaAssets/logo-2.png"
                    />
                    <img
                      className="absolute w-[104px] h-[19px] top-0 left-0"
                      alt="Type"
                      src="/figmaAssets/type.png"
                    />
                  </div>
                </div>

                <div className="relative w-[122px] h-[24.08px]">
                  <div className="relative w-[90px] h-6 top-[-1075px] left-[-2554px]">
                    <img
                      className="absolute w-[26px] h-6 top-0 left-0"
                      alt="Dots wrapper"
                      src="/figmaAssets/dots-wrapper.png"
                    />
                    <img
                      className="w-[90px] h-[17px] left-0 absolute top-0"
                      alt="Text"
                      src="/figmaAssets/text.png"
                    />
                  </div>
                </div>

                <img
                  className="relative w-[120px] h-[19.85px] mt-[-1071.00px] ml-[-2317.00px]"
                  alt="Logo"
                  src="/figmaAssets/logo.png"
                />

                <img
                  className="relative w-[95px] h-8 mt-[-1071.00px] ml-[-2317.00px]"
                  alt="Logo"
                  src="/figmaAssets/logo-1.png"
                />

                <div className="relative w-[132.8px] h-[32.13px] mt-[-1071.00px] ml-[-2317.00px] bg-[url(/figmaAssets/group.png)] bg-[100%_100%]" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
