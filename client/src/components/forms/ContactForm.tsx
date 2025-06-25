import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, Send } from "lucide-react";
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
  subtitle = "Share your requirements and we'll get back to you within 24 hours",
  className = "",
}) => {
  const { toast } = useToast();
  
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
      await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "contact",
          data: data,
        }),
      });
      
      toast({
        title: "Message Sent Successfully!",
        description: "Our team will contact you within 24 hours.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="[font-family:'Poppins',Helvetica]">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="residential">Residential Project</SelectItem>
                      <SelectItem value="apartments">Apartments</SelectItem>
                      <SelectItem value="villas">Independent Villas</SelectItem>
                      <SelectItem value="mini-apartments">Mini Apartments</SelectItem>
                      <SelectItem value="land">Land Development</SelectItem>
                      <SelectItem value="renovation">Renovation</SelectItem>
                    </SelectContent>
                  </Select>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="[font-family:'Poppins',Helvetica]">
                      <SelectValue placeholder="Select your budget range" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="below-25">Below ₹25 Lakhs</SelectItem>
                    <SelectItem value="25-50">₹25 - ₹50 Lakhs</SelectItem>
                    <SelectItem value="50-75">₹50 - ₹75 Lakhs</SelectItem>
                    <SelectItem value="75-100">₹75 Lakhs - ₹1 Crore</SelectItem>
                    <SelectItem value="100-150">₹1 - ₹1.5 Crores</SelectItem>
                    <SelectItem value="above-150">Above ₹1.5 Crores</SelectItem>
                  </SelectContent>
                </Select>
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
            className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white font-medium [font-family:'Poppins',Helvetica] rounded-[20px_2px_20px_2px] py-3 h-auto"
          >
            {form.formState.isSubmitting ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>

          <div className="flex items-center justify-center space-x-6 pt-4 text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-1 text-[#b48b2f]" />
              +91 98765 43210
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-1 text-[#b48b2f]" />
              info@smartbuilders.com
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};