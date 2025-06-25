import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const siteVisitSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Please enter a valid email address"),
  project: z.string().min(1, "Please select a project"),
  preferredDate: z.string().min(1, "Please select preferred date"),
  preferredTime: z.string().min(1, "Please select preferred time"),
  visitors: z.string().min(1, "Please specify number of visitors"),
});

type SiteVisitData = z.infer<typeof siteVisitSchema>;

interface SiteVisitFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
  projectName?: string;
}

export const SiteVisitForm: React.FC<SiteVisitFormProps> = ({
  title = "Schedule Site Visit",
  subtitle = "Book a free site visit with our expert team",
  className = "",
  projectName,
}) => {
  const { toast } = useToast();
  
  const form = useForm<SiteVisitData>({
    resolver: zodResolver(siteVisitSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      project: projectName || "",
      preferredDate: "",
      preferredTime: "",
      visitors: "",
    },
  });

  const onSubmit = async (data: SiteVisitData) => {
    try {
      const validatedData = siteVisitSchema.parse(data);
      
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "siteVisit",
          data: validatedData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      await response.json();
      
      toast({
        title: "Site Visit Scheduled!",
        description: "We'll confirm the appointment and send you the details.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Site visit form error:", error);
      
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: "Please check all required fields and try again.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to schedule visit. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Generate next 30 days for date selection
  const getNextDays = () => {
    const days = [];
    for (let i = 1; i <= 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-IN', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
      });
    }
    return days;
  };

  const timeSlots = [
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
  ];

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 lg:p-8 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
          {title}
        </h3>
        <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
          {subtitle}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    Full Name *
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="[font-family:'Poppins',Helvetica]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+91 98765 43210"
                      {...field}
                      className="[font-family:'Poppins',Helvetica]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    Email Address *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                      className="[font-family:'Poppins',Helvetica]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    Project *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="[font-family:'Poppins',Helvetica]">
                        <SelectValue placeholder="Select project to visit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="green-meadows">Green Meadows Residency</SelectItem>
                      <SelectItem value="royal-gardens">Royal Gardens</SelectItem>
                      <SelectItem value="sunrise-heights">Sunrise Heights</SelectItem>
                      <SelectItem value="golden-villas">Golden Villas</SelectItem>
                      <SelectItem value="smart-homes">Smart Homes Complex</SelectItem>
                      <SelectItem value="pearl-apartments">Pearl Apartments</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="preferredDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    Preferred Date *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="[font-family:'Poppins',Helvetica]">
                        <SelectValue placeholder="Select date" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getNextDays().map((day) => (
                        <SelectItem key={day.value} value={day.value}>
                          {day.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="preferredTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    Preferred Time *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="[font-family:'Poppins',Helvetica]">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {timeSlots.map((slot) => (
                        <SelectItem key={slot.value} value={slot.value}>
                          {slot.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="visitors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    No. of Visitors *
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value || ""}>
                    <FormControl>
                      <SelectTrigger className="[font-family:'Poppins',Helvetica]">
                        <SelectValue placeholder="How many?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">1 Person</SelectItem>
                      <SelectItem value="2">2 People</SelectItem>
                      <SelectItem value="3">3 People</SelectItem>
                      <SelectItem value="4">4 People</SelectItem>
                      <SelectItem value="5+">5+ People</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white font-medium [font-family:'Poppins',Helvetica] rounded-[20px_2px_20px_2px] py-3 h-auto"
          >
            {form.formState.isSubmitting ? (
              "Scheduling..."
            ) : (
              <>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Visit
              </>
            )}
          </Button>

          <div className="bg-[#b48b2f]/10 rounded-lg p-4 mt-4">
            <div className="flex items-start">
              <MapPin className="w-5 h-5 text-[#b48b2f] mr-2 mt-0.5" />
              <div className="text-sm text-[#313131] [font-family:'Poppins',Helvetica]">
                <p className="font-medium mb-1">Visit Guidelines:</p>
                <ul className="space-y-1 text-[#6b6b6b]">
                  <li>• Free transportation provided from our office</li>
                  <li>• Visit duration: 1-2 hours with detailed explanation</li>
                  <li>• Refreshments included</li>
                  <li>• Bring valid ID proof for all visitors</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};