import React, { useState, memo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SimpleSelect as Select, SimpleSelectContent as SelectContent, SimpleSelectItem as SelectItem, SimpleSelectTrigger as SelectTrigger, SimpleSelectValue as SelectValue } from "@/components/ui/simple-select";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Phone, Mail, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().min(1, "Please select your budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  title = "Get Free Consultation",
  subtitle = "Share your requirements and we'll get back to you soon",
  className = "",
}) => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      projectType: "",
      budget: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const validatedData = contactFormSchema.parse(data);
      
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          data: validatedData,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      await response.json();
      
      toast({
        title: "Message Sent Successfully!",
        description: "Our team will contact you soon.",
      });
      
      setIsSubmitted(true);
      form.reset();
      
      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Contact form error:", error);
      
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
        description: error instanceof Error ? error.message : "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-4 xs:p-6 sm:p-8 lg:p-10 ${className}`}>
        <div className="text-center py-6 xs:py-8 sm:py-10">
          <CheckCircle className="w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 text-green-600 mx-auto mb-3 xs:mb-4" />
          <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-[#313131] mb-2">
            Thank You!
          </h3>
          <p className="text-[#4a5568] mb-4 xs:mb-6 text-sm xs:text-base px-2">
            Your message has been sent successfully. Our team will contact you soon.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            className="bg-[#b48b2f] hover:bg-[#9d7829] text-white min-h-[44px] xs:min-h-[48px] px-6 xs:px-8 text-sm xs:text-base"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-3 xs:p-4 sm:p-6 lg:p-8 xl:p-10 ${className}`}>
      <div className="text-center mb-4 xs:mb-5 sm:mb-6 lg:mb-8">
        <h3 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-bold text-[#313131] mb-2">
          {title}
        </h3>
        <p className="text-[#4a5568] text-xs xs:text-sm sm:text-base px-2">
          {subtitle}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 xs:space-y-4 sm:space-y-5" noValidate>
          <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] font-medium text-xs xs:text-sm">
                    Full Name <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your full name"
                      {...field}
                      className="min-h-[44px] xs:min-h-[48px] text-sm xs:text-base transition-colors focus:ring-2 focus:ring-[#b48b2f]/20"
                      aria-describedby={form.formState.errors.name ? "name-error" : undefined}
                      aria-invalid={!!form.formState.errors.name}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] font-medium text-xs xs:text-sm [font-family:'Poppins',Helvetica]">
                    Email Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                      className="min-h-[44px] xs:min-h-[48px] text-sm xs:text-base [font-family:'Poppins',Helvetica] focus:ring-2 focus:ring-[#b48b2f]/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 xs:gap-4 sm:gap-5">
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

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                    Project Type *
                  </FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      value={field.value || ""} 
                      placeholder="Select project type"
                      className="[font-family:'Poppins',Helvetica]"
                    >
                      <SelectItem value="residential">Residential Project</SelectItem>
                      <SelectItem value="apartments">Apartments</SelectItem>
                      <SelectItem value="villas">Independent Villas</SelectItem>
                      <SelectItem value="mini-apartments">Mini Apartments</SelectItem>
                      <SelectItem value="land">Land Development</SelectItem>
                      <SelectItem value="renovation">Renovation</SelectItem>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                  Budget Range *
                </FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value || ""} 
                    placeholder="Select your budget range"
                    className="[font-family:'Poppins',Helvetica]"
                  >
                    <SelectItem value="below-25">Below ₹25 Lakhs</SelectItem>
                    <SelectItem value="25-50">₹25 - ₹50 Lakhs</SelectItem>
                    <SelectItem value="50-75">₹50 - ₹75 Lakhs</SelectItem>
                    <SelectItem value="75-100">₹75 Lakhs - ₹1 Crore</SelectItem>
                    <SelectItem value="100-150">₹1 - ₹1.5 Crores</SelectItem>
                    <SelectItem value="above-150">Above ₹1.5 Crores</SelectItem>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                  Project Details *
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your project requirements, location preferences, timeline, etc."
                    rows={4}
                    {...field}
                    className="[font-family:'Poppins',Helvetica]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white font-medium [font-family:'Poppins',Helvetica] rounded-[20px_2px_20px_2px] py-3 xs:py-4 h-auto min-h-[44px] xs:min-h-[48px] text-sm xs:text-base transition-all duration-300 hover:shadow-lg disabled:opacity-50"
          >
            {form.formState.isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>

          <div className="flex flex-col xs:flex-row items-center justify-center space-y-2 xs:space-y-0 xs:space-x-4 sm:space-x-6 pt-3 xs:pt-4 text-xs xs:text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
            <div className="flex items-center">
              <Phone className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1 text-[#b48b2f] flex-shrink-0" />
              <span className="whitespace-nowrap">+91 98765 43210</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-3.5 h-3.5 xs:w-4 xs:h-4 mr-1 text-[#b48b2f] flex-shrink-0" />
              <span className="whitespace-nowrap">info@smartbuilders.com</span>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};